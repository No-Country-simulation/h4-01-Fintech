'use client';

import React, { useEffect, useState } from 'react';
import { Button, Flex, Slider, Text } from '@radix-ui/themes';
import { setCookie } from 'nookies';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useInvestmentStore } from '@/stores/useInvestmentStore';

// Función para obtener una cookie
function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

// Clave para almacenar respuestas en localStorage
const STORAGE_KEY = 'investmentProfileAnswers';
const COOKIE_EXPIRATION_DAYS = 7;

const questions = [
    {
        id: 1,
        text: "¿Qué tan importante es para ti mantener tus ahorros seguros en lugar de buscar altos rendimientos?",
        options: ["1: Prefiero asumir riesgos para obtener mejores ganancias.", "10: La seguridad de mis ahorros es lo más importante."],
    },
    {
        id: 2,
        text: "¿Cuál es tu objetivo principal al invertir?",
        options: ["1: Alto crecimiento a largo plazo (máxima ganancia).", "10: Generar ingresos estables y seguros (mínimo riesgo)."],
    },
    {
        id: 3,
        text: "¿Qué tan probable es que necesites el dinero que vas a invertir en los próximos 12 meses?",
        options: ["1: Muy poco probable.", "10: Muy probable, es dinero que puedo necesitar pronto."],
    },
    {
        id: 4,
        text: "¿Cómo reaccionarías si tu inversión pierde el 20% de su valor en poco tiempo?",
        options: ["1: Mantendría la inversión o compraría más (confío en la recuperación a largo plazo).", "10: Retiraría todo mi dinero para evitar más pérdidas."],
    },
    {
        id: 5,
        text: "¿Qué tanto tiempo estás dispuesto a esperar para ver resultados en tus inversiones?",
        options: ["1: Puedo esperar más de 10 años (horizonte a largo plazo).", "10: Necesito resultados en menos de 1 año."],
    },
    {
        id: 6,
        text: "¿Qué tanto conocimiento tienes sobre inversiones y el mercado financiero?",
        options: ["1: Soy completamente nuevo en esto.", "10: Tengo un nivel avanzado de conocimiento."],
    },
    {
        id: 7,
        text: "¿Qué porcentaje de tus ahorros totales planeas invertir?",
        options: ["1: Menos del 10% (prefiero diversificar).", "10: Más del 50% (quiero arriesgar una porción mayor)."],
    },
];

export default function InvestmentProfile() {
    const [showWelcome, setShowWelcome] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(true); // Estado para controlar el diálogo
    const { answers, currentQuestion, setAnswers, setCurrentQuestion } = useInvestmentStore();
    // Cargar progreso al montar el componente
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
    //
    useEffect(() => {
        const savedProgress = getCookie(STORAGE_KEY);
        if (savedProgress) {
            const { storedAnswers, storedQuestion } = JSON.parse(savedProgress.toString());
            setAnswers(storedAnswers);
            setCurrentQuestion(storedQuestion);
            setShowWelcome(false);
        }
    }, []);

    // Guardar progreso en cookies cada vez que cambia
    const saveProgress = (updatedAnswers: number[], currentStep: number) => {
        setCookie(null, STORAGE_KEY, JSON.stringify({
            storedAnswers: updatedAnswers,
            storedQuestion: currentStep
        }), {
            maxAge: COOKIE_EXPIRATION_DAYS * 24 * 60 * 60,
            path: '/',
        });
    };

    const handleSliderChange = (value: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = value;
        setAnswers(updatedAnswers);
        saveProgress(updatedAnswers, currentQuestion);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            const newQuestion = currentQuestion + 1;
            setCurrentQuestion(newQuestion);
            saveProgress(answers, newQuestion);
        }
    };

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            const newQuestion = currentQuestion - 1;
            setCurrentQuestion(newQuestion);
            saveProgress(answers, newQuestion);
        }
    };

    const finish = async () => {
        try {
            const response = await fetch('/api/save-investment-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers }),
            });

            if (response.ok) {
                setIsFinished(true);
                // Limpiar cookies al finalizar
                setCookie(null, STORAGE_KEY, '', { maxAge: -1, path: '/' });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const closeDialog = () => {
        setIsDialogOpen(false); // Cierra el diálogo
    };

    const closeWindow = () => {
        window.close(); // Cierra la ventana actual
    };

    return (
        <AlertDialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialog.Trigger></AlertDialog.Trigger>
            <AlertDialog.Content
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: '500px',
                    height: 'auto',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    padding: '2rem',
                    background: 'linear-gradient(to bottom, #005bbb, #0c56bf, #3281f0)',
                    borderRadius: '12px',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <AlertDialog.Title>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        <Text size={'5'}>Crear mi perfil de inversionista</Text>
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
                                        <br />
                                        <span>Esto solo tomará unos minutos, pero marcará la diferencia en tu experiencia como inversionista.</span>
                                    </div>
                                    <Flex mt="4" justify="center">
                                        <Button onClick={() => setShowWelcome(false)} variant='solid'>
                                            ¿Comenzamos?
                                        </Button>
                                    </Flex>
                                </>
                            ) : isFinished ? (
                                <div className="w-[235px] h-[330px] py-5 flex-col justify-between items-center inline-flex">
                                    <div className="self-stretch h-14 text-center text-[#002a4d] text-base font-bold font-['Inter'] capitalize">
                                        ¡Felicitaciones! 🎉 <br />has completado tu perfil<br />de inversionista
                                    </div>
                                    <div className="self-stretch h-[154px] text-[#002a4d] text-xs font-medium font-['Inter']">
                                        Gracias por responder las preguntas y ayudarnos a conocerte mejor. Ahora, con la información que nos brindaste, hemos diseñado recomendaciones personalizadas que se ajustan a tus objetivos y preferencias financieras.<br /><br />A partir de este momento, podrás explorar todas las oportunidades de inversión que IUPI tiene para ofrecerte.
                                    </div>
                                    <div className="self-stretch h-[15px] text-center text-[#002a4d] text-xs font-black font-['Inter']">
                                        ¡Comencemos a invertir!
                                    </div>
                                    <Flex mt="4" justify="center">
                                        <Button onClick={closeWindow} variant="solid">
                                            Cerrar
                                        </Button>
                                    </Flex>
                                </div>
                            ) : (
                                <>
                                    <Text size="3" weight="bold">
                                        {currentQuestion < questions.length
                                            ? "Crear Mi Perfil De Inversionista"
                                            : "¡Felicitaciones! 🎉 Has Completado Tu Perfil De Inversionista"}
                                    </Text>
                                    {currentQuestion < questions.length ? (
                                        <>
                                            <Text mt="3">{questions[currentQuestion].text}</Text>
                                            <Flex mt="4" align="center" direction="column">
                                                <Slider
                                                    value={[answers[currentQuestion] || 1]}
                                                    onValueChange={(value) => handleSliderChange(value[0])}
                                                    min={1}
                                                    max={10}
                                                    step={1}
                                                />
                                                <Text mt="2">Respuesta: {answers[currentQuestion] || 1}</Text>
                                            </Flex>
                                            <Flex mt="4" gap="3" justify="between">
                                                <Button onClick={previousQuestion} disabled={currentQuestion === 0}>
                                                    Volver
                                                </Button>
                                                {currentQuestion === questions.length - 1 ? (
                                                    <Button onClick={finish} variant='surface'>
                                                        Finalizar
                                                    </Button>
                                                ) : (
                                                    <Button onClick={nextQuestion} variant='surface'>
                                                        Continuar
                                                    </Button>
                                                )}
                                            </Flex>
                                        </>
                                    ) : null}
                                </>
                            )}
                        </div>
                    </>
                </AlertDialog.Description>
                {/* Botón para cerrar el diálogo */}
                <AlertDialog.Action asChild>
                    <Button
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                        onClick={closeDialog}
                    >
                        X
                    </Button>
                </AlertDialog.Action>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}