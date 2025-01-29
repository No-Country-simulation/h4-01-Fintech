'use client';
import { Box, Button, Card, Flex, Text, Slider } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "../dialogs/questions";
import { useQuestions } from "@/stores/useQuestions";
import Loading from "@/app/loanding";
import { fetchRiskPercentage } from "@/services/riskPercentageService";
import { createNotification } from "@/services/notificationService";

export default function InvestorProfileWizard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { answers, setAnswer, calculateRiskPercentage, riskPercentage } = useQuestions.getState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [sliderValue, setSliderValue] = useState(1);
    const [loading, setLoading] = useState(false);

    // Maneja la selección de una opción
    const handleAnswer = async () => {
        setAnswer(currentQuestion, sliderValue);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSliderValue(1); // Resetear el valor del slider para la siguiente pregunta
        } else {
            // Calcula el porcentaje de riesgo
            calculateRiskPercentage();

            try {
                setLoading(true); // Mostrar indicador de carga
                // Llama al endpoint para guardar el porcentaje de riesgo
                if (session?.user?.id) {
                    if (riskPercentage !== null) {
                        // Redondear el porcentaje de riesgo antes de enviarlo
                        const normalizedRiskPercentage = Math.min(10, Math.max(0, (riskPercentage / 100) * 10));
                        const roundedRiskPercentage = Math.round(normalizedRiskPercentage);
                        await fetchRiskPercentage(session.user.id, roundedRiskPercentage);
                        console.log('Promedio redondeado:', roundedRiskPercentage);
                        // Crear una notificación
                        const notificationMessage = `Has actualizado tu perfil inversor con un promedio de riesgo del ${roundedRiskPercentage}%.`;
                        await createNotification(session.user.id, notificationMessage);
                    } else {
                        return null
                        
                    }
                }
                router.push("/dashboard");
            } catch (error) {
                console.error("Error al actualizar el porcentaje de riesgo:", error);
            } finally {
                setLoading(false); // Finaliza la carga
            }
        }
    };

    if (status === 'loading') {
        return <Loading />;
    }

    if (!session) {
        return (
            <Box width="100vw" height="100vh" p="4">
                <Card>
                    <Text size="5" weight="bold">Por favor, inicia sesión para completar tu perfil.</Text>
                </Card>
            </Box>
        );
    }

    return (
        <Box width="95vw" height="100vh" p="4" className='p-8 justify-center justify-items-center mt-10'>
            <Card>
                <Flex direction="column" gap="3">
                    {/* Tarjeta de explicación */}
                    <Card>
                        <Text size="4" weight="medium" color="gray">
                            Bienvenido a tu asistente de perfil inversor.
                            Aquí podrás ajustar el control deslizante para responder cada pregunta,
                            seleccionando el nivel que mejor representa tu situación o preferencia.
                            El porcentaje promedio de riesgo se calculará automáticamente al finalizar.
                        </Text>
                    </Card>

                    {/* Pregunta actual */}
                    <Text size="5" weight="bold">{questions[currentQuestion].text}</Text>

                    {/* Opciones del slider */}
                    <Flex justify="between" align="center">
                        <Text size="3" color="gray">{questions[currentQuestion].options[0]}</Text>
                        <Text size="3" color="gray">{questions[currentQuestion].options[1]}</Text>
                    </Flex>

                    {/* Slider */}
                    <Slider
                        value={[sliderValue]}
                        onValueChange={(value) => setSliderValue(value[0])}
                        min={1}
                        max={10}
                        step={1}
                    />

                    {/* Escala numérica */}
                    <Flex justify="between" align="center">
                        {Array.from({ length: 10 }, (_, i) => (
                            <Text key={i + 1} size="2" color="gray">
                                {i + 1}
                            </Text>
                        ))}
                    </Flex>

                    {/* Valor seleccionado */}
                    <Text size="2" align="center" color="blue">
                        Valor seleccionado: {sliderValue}
                    </Text>

                    {/* Botón para avanzar */}
                    <Button onClick={handleAnswer}>Siguiente</Button>
                </Flex>
            </Card>
        </Box>
    );
}