'use client';

import React, { useState, useEffect } from 'react';
import { Button, Flex, Slider, Text, Box } from '@radix-ui/themes';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useInvestmentStore } from '@/stores/useInvestmentStore';

const questions = [
    "¿Qué tan importante es para ti mantener tus ahorros seguros en lugar de buscar altos rendimientos?",
    "¿Cuánto tiempo estás dispuesto a esperar para alcanzar tus objetivos de inversión?",
    "¿Cuál es tu nivel de experiencia en inversiones?",
    "¿Qué tan cómodo te sientes asumiendo pérdidas en tus inversiones?",
    "¿Qué tan diversificada prefieres que esté tu cartera de inversiones?",
    "¿Qué nivel de riesgo estás dispuesto a aceptar para alcanzar mayores rendimientos?",
    "¿Qué tan importante es para ti que tus inversiones sean sostenibles o responsables?",
];

export default function InvestmentProfile() {
    const [showWelcome, setShowWelcome] = useState(true);
    const { answers, currentQuestion, setAnswers, setCurrentQuestion } = useInvestmentStore();

    const handleSliderChange = (value: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = value;
        setAnswers(updatedAnswers);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const finish = async () => {
        console.log("Respuestas:", answers);
        try {
            const response = await fetch('/api/save-investment-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers }),
            });
            if (response.ok) {
                alert('Perfil guardado exitosamente');
            } else {
                alert('Error al guardar el perfil');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar los datos');
        }
    };

    return (
        <AlertDialog.Root defaultOpen>
            <AlertDialog.Trigger></AlertDialog.Trigger>
            <AlertDialog.Content
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%', // Ancho relativo para dispositivos móviles
                    maxWidth: '600px', // Máximo ancho para pantallas grandes
                    height: 'auto', // Altura automática
                    maxHeight: '90vh', // Máxima altura para evitar desbordamiento
                    overflowY: 'auto', // Scroll si el contenido es muy largo
                    padding: '2rem',
                    background: 'linear-gradient(to bottom, #005bbb, #0c56bf, #3281f0)',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <AlertDialog.Title>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        Crear mi perfil de inversionista
                    </div>
                </AlertDialog.Title>
                <AlertDialog.Description>
                    <>
                        <div
                            style={{
                                padding: '1rem',
                                color: 'white',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            {showWelcome ? (
                                <>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                        ¡Gracias por dar este importante paso con nosotros!
                                    </div>
                                    <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                        Para ofrecerte las mejores recomendaciones y estrategias, necesitamos entender tus preferencias y objetivos financieros. Estas preguntas nos ayudarán a conocer tu perfil como inversionista, lo que permitirá que todas las sugerencias y opciones que encuentres en IUPI estén completamente alineadas con tus necesidades y expectativas.
                                    </div>
                                    <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                        <span style={{ fontWeight: 'bold' }}>Tu tiempo y honestidad son clave para diseñar un plan que realmente funcione para ti.</span>
                                        <br />
                                        <span>Esto solo tomará unos minutos, pero marcará la diferencia en tu experiencia como inversionista.</span>
                                    </div>
                                    <Flex mt="4" justify="center">
                                        <Button onClick={() => setShowWelcome(false)} color="blue">
                                            Comenzar
                                        </Button>
                                    </Flex>
                                </>
                            ) : (
                                <>
                                    <Text size="3" weight="bold">
                                        {currentQuestion < questions.length
                                            ? "Crear Mi Perfil De Inversionista"
                                            : "¡Felicitaciones! 🎉 Has Completado Tu Perfil De Inversionista"}
                                    </Text>
                                    {currentQuestion < questions.length ? (
                                        <>
                                            <Text mt="3">{questions[currentQuestion]}</Text>
                                            <Flex mt="4" align="center" direction="column">
                                                <Slider
                                                    value={[answers[currentQuestion]]}
                                                    onValueChange={(value) => handleSliderChange(value[0])}
                                                    min={1}
                                                    max={10}
                                                    step={1}
                                                />
                                                <Text mt="2">Respuesta: {answers[currentQuestion]}</Text>
                                            </Flex>
                                            <Flex mt="4" gap="3" justify="between">
                                                <Button onClick={previousQuestion} disabled={currentQuestion === 0}>
                                                    Volver
                                                </Button>
                                                {currentQuestion === questions.length - 1 ? (
                                                    <Button onClick={finish} color="green">
                                                        Finalizar
                                                    </Button>
                                                ) : (
                                                    <Button onClick={nextQuestion} color="blue">
                                                        Continuar
                                                    </Button>
                                                )}
                                            </Flex>
                                        </>
                                    ) : (
                                        <Text mt="4">
                                            Gracias por responder las preguntas. Ahora podrás explorar las recomendaciones personalizadas.
                                        </Text>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                </AlertDialog.Description>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}