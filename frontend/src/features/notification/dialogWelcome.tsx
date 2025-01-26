'use client';

import { AlertDialog, Button, Flex, Text, Heading } from "@radix-ui/themes";
import styled from '@emotion/styled';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";

// Definir el componente estilizado fuera del componente principal
const StyledAlertDialogContent = styled(AlertDialog.Content)`
    max-width: 400px;
    width: 90%;
    margin: 1rem;
    background: #d9d9d9;
    color: black;
    border-radius: 20px;
    border-color: #ff6f3c;
    padding: 2rem;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    @media (max-width: 768px) {
        padding: 1rem; // Padding reducido en móviles
        margin: 0.5rem; // Margen reducido en móviles
    }
`;

export default function DialogWelcome() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(true);

    useEffect(() => {
        if (isDialogOpen) {
            document.body.style.overflow = 'hidden'; // Deshabilita el scroll
        } else {
            document.body.style.overflow = 'auto'; // Restaura el scroll
        }
        return () => {
            document.body.style.overflow = 'auto'; // Restaura el scroll al desmontar
        };
    }, [isDialogOpen]);

    // Mostrar solo cuando la sesión esté cargada y no haya usuario
    if (status === "loading") return null;
    if (session?.user) return null;

    // Función para redireccionar al usuario
    const handleCreateProfile = () => {
        router.push("/dashboard/questions");
    };

    // Función para cerrar el diálogo
    const handleCloseDialog = () => {
        setIsDialogOpen(false); // Cierra el diálogo
    };
        
    if(session?.user.role === 'USER'){
        return (
            <AlertDialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <StyledAlertDialogContent>
                    <AlertDialog.Title>  </AlertDialog.Title>
                    <Heading size="5" mb="4" weight="bold">
                        <div className="w-[174px] h-[23px] text-center text-[#002a4d] text- font-extrabold capitalize">
                            <Text size={{ initial: '4', sm: '5' }}>¡Bienvenido a IUPI! 🎉</Text><br />
                        </div>
                    </Heading>

                    <Text as="div" size={{ initial: '3', sm: '4' }} mb="4">
                        <p className="mb-3 font-semibold">
                            Para que podamos ayudarte a alcanzar tus metas financieras de la mejor manera,
                            necesitamos conocerte un poco más.
                        </p>
                        <br />

                        <p className="mb-3 font-semibold">
                            Al completar tu perfil de inversionista, te ofreceremos recomendaciones y
                            estrategias 100% personalizadas, adaptadas a tus necesidades y objetivos.
                        </p>
                        <br />

                        <p className="font-semibold">
                            ¿Listo para empezar tu camino hacia el éxito financiero?
                        </p>
                        <br />
                    </Text>

                    <Flex justify="center" mt="4" gap="3" direction={{ initial: 'column', sm: 'row' }}>
                        {/* Botón para crear perfil */}
                        <AlertDialog.Action>
                            <Button
                                variant="classic"
                                size={{ initial: '2', sm: '3' }}
                                onClick={handleCreateProfile} // Redirecciona al usuario
                            >
                                Crear mi perfil de inversionista
                            </Button>
                        </AlertDialog.Action>

                        {/* Botón para cerrar el diálogo */}
                        <AlertDialog.Cancel>
                            <Button
                                variant="soft"
                                color="gray"
                                size={{ initial: '2', sm: '3' }}
                                onClick={handleCloseDialog} // Cierra el diálogo
                            >
                                Cerrar
                            </Button>
                        </AlertDialog.Cancel>
                    </Flex>
                </StyledAlertDialogContent>
            </AlertDialog.Root>
        );
    }
    return null;
}