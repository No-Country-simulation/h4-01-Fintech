'use client';

import { AuroraBackground } from '@/components/aceternity/aurora';
import { Button, Flex, Text, Heading } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Section1() {
    const { data: session } = useSession();
    const router = useRouter();

    // Condicional para mostrar el componente
    if (session?.user.role === 'USER' || session?.user.risk_percentage === null || !session?.user) {
        return (
            <AuroraBackground>
                <div className="relative min-h-screen flex items-center justify-center p-4">
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        gap="6"
                        className="w-full max-w-4xl mx-auto text-center"
                    >
                        {/* Fondo semi-transparente detrás del contenido */}
                        <div className="bg-black/50 p-8 rounded-lg backdrop-blur-sm">
                            {/* Título principal */}
                            <Heading
                                size={{ initial: '9', md: '8' }}
                                weight="bold"
                                className="text-shadow-intense text-black mb-2"
                            >
                                En IUpi Facilitamos tu ahorro e inversión
                            </Heading>

                            {/* Descripción */}
                            <Text
                                size={{ initial: '3', md: '4' }}
                                className="text-gray-200 max-w-2xl text-shadow-intense"
                            >
                                Define tus metas financieras y comienza a invertir hoy mismo, sin complicaciones.
                            </Text>
                            <br/>
                            <br/>
                            {/* Subtítulo */}
                            <Text
                                size={{ initial: '4', md: '5' }}
                                weight="bold"
                                className="text-black mt-4 text-shadow-intense"
                            >
                                Haz crecer tu dinero con estrategias personalizadas
                            </Text>

                            {/* Botones */}
                            <Flex
                                direction={{ initial: 'column', sm: 'row' }}
                                gap="3"
                                className="mt-6"
                            >
                                <Button onClick={() => router.push('/dashboard/invertir')}  size="3" variant="solid" className="w-full sm:w-auto">
                                    Comenzar a invertir
                                </Button>
                                <Button onClick={() => router.push('/dashboard/questions')}  size="3" variant="outline" className="w-full sm:w-auto">
                                    Crear mi perfil de inversionista
                                </Button>
                            </Flex>
                        </div>
                    </Flex>
                </div>
            </AuroraBackground>
        );
    }

    return null;
}