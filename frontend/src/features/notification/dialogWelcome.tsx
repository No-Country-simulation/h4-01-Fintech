'use client';

import { AlertDialog, Button, Flex, Text, Heading } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Para redireccionar al usuario

export default function DialogWelcome() {
    const { data: session, status } = useSession();
    const router = useRouter(); // Hook para redireccionar

    // Mostrar solo cuando la sesión esté cargada y no haya usuario
    if (status === "loading") return null;
    if (session?.user) return null;

    // Función para redireccionar al usuario
    const handleCreateProfile = () => {
        router.push("/auth/register");
    };

    // Función para cerrar la pestaña
    const handleClose = () => {
        window.close(); // Cierra la pestaña actual
    };

    return (
        <AlertDialog.Root defaultOpen>
            <AlertDialog.Content
                style={{
                    maxWidth: '400px',
                    background: '#d9d9d9',
                    color: 'black',
                    borderRadius: '20px',
                    borderColor: '#ff6f3c',
                    padding: '2rem',
                    textAlign: 'center',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <AlertDialog.Title>  </AlertDialog.Title>
                <Heading size="5" mb="4" weight="bold">
                    <div className="w-[174px] h-[23px] text-center text-[#002a4d] text- font-extrabold capitalize">
                        <Text size={'5'}>¡Bienvenido a IUPI! 🎉</Text><br />
                    </div>
                </Heading>

                <Text as="div" size="4" mb="4">
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

                <Flex justify="center" mt="4" gap="3">
                    {/* Botón para crear perfil */}
                    <AlertDialog.Action>
                        <Button
                            variant="classic"
                            onClick={handleCreateProfile} // Redirecciona al usuario
                        >
                            Crear mi perfil de inversionista
                        </Button>
                    </AlertDialog.Action>

                    {/* Botón para cerrar la pestaña */}
                    <AlertDialog.Cancel>
                        <Button
                            variant="soft"
                            color="gray"
                            onClick={handleClose} // Cierra la pestaña
                        >
                            Cerrar
                        </Button>
                    </AlertDialog.Cancel>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}