'use client';
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "../dialogs/questions"; // Importa las preguntas
import { useQuestions } from "@/stores/useQuestions"; // Importa el store de Zustand

export default function InvestorProfileWizard() {
    const { data: session } = useSession();
    const router = useRouter();
    const { answers, setAnswer, calculateRiskPercentage, riskPercentage } = useQuestions.getState()
    const [currentQuestion, setCurrentQuestion] = useState(0);


    // Maneja la selección de una opción
    const handleAnswer = (option: string) => {
        const value = parseInt(option.split(":")[0], 10); // Extrae el valor numérico de la opción
        setAnswer(currentQuestion, value); // Guarda la respuesta en el store

        // Avanzar a la siguiente pregunta o finalizar el cuestionario
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateRiskPercentage(); // Calcula el porcentaje de riesgo
            router.push("/dashboard"); // Redirige al dashboard después de completar el cuestionario
        }
    };

    // Si no hay sesión, muestra un mensaje o redirige al login
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
        <Box width="100vw" height="100vh" p="4">
            <Card>
                <Flex direction="column" gap="3">
                    {/* Muestra la pregunta actual */}
                    <Text size="5" weight="bold">{questions[currentQuestion].text}</Text>

                    {/* Muestra las opciones de respuesta */}
                    {questions[currentQuestion].options.map((option, index) => (
                        <Button key={index} onClick={() => handleAnswer(option)}>
                            {option}
                        </Button>
                    ))}
                </Flex>
            </Card>
        </Box>
    );
}