"use client";
import { Box, Button, Card, Flex, Text, Slider, IconButton, Heading } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { questions } from "../dialogs/questions";
import { useQuestions } from "@/stores/useQuestions";
import Loading from "@/app/loanding";
import { fetchRiskPercentage } from "@/services/riskPercentageService";
import { createNotification } from "@/services/notificationService";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function InvestorProfileWizard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { answers, setAnswer, calculateRiskPercentage, riskPercentage } = useQuestions.getState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [sliderValue, setSliderValue] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false); // Estado para controlar el confeti

    const handleAnswer = async () => {
        setAnswer(currentQuestion, sliderValue);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSliderValue(1);
        } else {
            calculateRiskPercentage();
            try {
                setLoading(true);

                if (session?.user?.id && riskPercentage !== null) {
                    const roundedRiskPercentage = Math.round(riskPercentage);
                    const save = await fetchRiskPercentage(session.user.id, roundedRiskPercentage);
                    if(save){
                        await createNotification(session.user.id, `Has actualizado tu perfil inversor con un promedio de riesgo del ${roundedRiskPercentage}%.`);
                        // Mostrar confeti antes de redirigir
                        setShowConfetti(true);

                        // Esperar 3 segundos antes de redirigir
                        setTimeout(() => {
                            setShowConfetti(false); // Ocultar confeti antes de la redirección
                            router.push("/dashboard");
                        }, 9000);
                    }
                }
            } catch (error) {
                console.error("Error al actualizar el porcentaje de riesgo:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (status === "loading") {
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
            {showConfetti && <Confetti />} {/* Mostrar el confeti */}
            <Card>
                <Flex direction="column" gap="3">
                    <Card className="max-w-md mx-auto p-6 shadow-lg border border-gray-100">
                        <Flex direction="column" gap="4" align="center">
                            <Flex align="center" gap="3">
                                <IconButton variant="soft" radius="full" className="bg-indigo-50">
                                    <InfoCircledIcon className="text-indigo-500" width="20" height="20" />
                                </IconButton>
                                <Heading size="5" weight="bold" className="text-indigo-600">
                                    Asistente de Perfil Inversor
                                </Heading>
                            </Flex>
                            <Text size="3" color="gray" align="center" className="text-gray-600">
                                Bienvenido a tu asistente de perfil inversor. Aquí podrás ajustar el control deslizante para responder cada pregunta, seleccionando el nivel que mejor representa tu situación o preferencia. El porcentaje promedio de riesgo se calculará automáticamente al finalizar.
                            </Text>
                        </Flex>
                    </Card>

                    <Text size="5" weight="bold">{questions[currentQuestion].text}</Text>

                    <Flex justify="between" align="center">
                        <Text size="3" color="gray">{questions[currentQuestion].options[0]}</Text>
                        <Text size="3" color="gray">{questions[currentQuestion].options[1]}</Text>
                    </Flex>

                    <Slider
                        value={[sliderValue]}
                        onValueChange={(value) => setSliderValue(value[0])}
                        min={1}
                        max={10}
                        step={1}
                    />

                    <Flex justify="between" align="center">
                        {Array.from({ length: 10 }, (_, i) => (
                            <Text key={i + 1} size="2" color="gray">
                                {i + 1}
                            </Text>
                        ))}
                    </Flex>

                    <Text size="2" align="center" color="blue">
                        Valor seleccionado: {sliderValue}
                    </Text>

                    <Button onClick={handleAnswer}>Siguiente</Button>
                </Flex>
            </Card>
        </Box>
    );
}
