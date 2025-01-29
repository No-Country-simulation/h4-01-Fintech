'use client';

import { BackgroundGradient } from '@/components/aceternity/background-gradient';
import AnimatedCounter from '@/components/motion/increments';
import AnimatedNumber from '@/components/motion/increments';
import { Grid, Text, Heading, Flex } from '@radix-ui/themes';

export default function Section2() {
    return (
        <section id="quienes-somos" className="bg-gradient-to-b from-[#005bbb] via-[#0c56bf] to-[#3281f0] p-6 md:p-12 rounded-md w-full min-h-screen flex items-center justify-center ">
            <div className="container mx-auto px-4">
                <Grid
                    columns={{ initial: '1', md: '2' }}
                    gap="8"
                    align="center"
                >
                    <Flex direction="column" gap="6" className="text-center md:text-left">
                        <Heading size="8" className="text-gray-50 font-bold">
                            ¿Quiénes Somos?
                        </Heading>
                        <Text size="4" className="text-white">
                            En <strong className="text-slate-200">UPI</strong>, somos una plataforma financiera innovadora dedicada a transformar la forma en que los <strong className="text-slate-200">argentinos ahorran e invierten</strong>. Nuestra misión es hacer que la gestión de tus finanzas sea simple, accesible y eficaz; ayudándote a cumplir tus objetivos.
                        </Text>
                        <Text size="4" className="text-white">
                            Creemos que todos, independientemente de su nivel de experiencia, deberían tener acceso a <strong className="text-slate-200">estrategias</strong> de inversión <strong className="text-slate-200">diseñadas a medida</strong>. Por eso, en <strong className="text-slate-200">UPI</strong> ponemos a tu disposición tecnología avanzada, <strong className="text-slate-200">análisis continuo de mercado y educación financiera</strong> para que cada paso que des esté respaldado por información clara y confiable.
                        </Text>
                        <Text className="text-white mt-2 text-lg font-bold">
                            Amplia trayectoria.
                        </Text>
                    </Flex>
                    <Flex direction="column" gap="6" className="text-center">
                        <BackgroundGradient>
                            <div className="bg-blue-950 p-6 rounded-lg">
                                <Heading size="8" className="text-slate-200 font-bold mb-2">
                                    <p>10 Años</p>
                                </Heading>
                                <Text size="4" className="text-slate-50">
                                    Ayudando a optimizar el patrimonio de nuestros usuarios.
                                </Text>
                            </div>
                        </BackgroundGradient>
                        <BackgroundGradient>
                            <div className="bg-blue-950 p-6 rounded-lg">
                                <Heading size="8" className="text-slate-200 font-bold mb-2">
                                    <AnimatedNumber counts={500000} duration={100} />
                                </Heading>
                                <Text size="4" className="text-slate-50">
                                    Usuarios activos en toda Argentina.
                                </Text>
                            </div>
                        </BackgroundGradient>
                        <BackgroundGradient>
                            <div className="bg-blue-950 p-6 rounded-lg">
                                <Heading size="8" className="text-slate-200 font-bold mb-2">
                                    +<p>300</p>
                                </Heading>
                                <Text size="4" className="text-slate-50">
                                    Millones invertidos en proyectos.
                                </Text>
                            </div>
                        </BackgroundGradient>
                    </Flex>
                </Grid>
            </div>
        </section>
    );
}