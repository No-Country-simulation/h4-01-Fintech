"use client";

import { Timeline2 } from "@/components/aceternity/timeline2";
import { Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Cross2Icon,
    PersonIcon,
    QuestionMarkCircledIcon,
    BackpackIcon,
    StarIcon,
    RocketIcon,
} from "@radix-ui/react-icons";
import { HelpCircleIcon, BanknoteIcon, ShoppingCartIcon, CreditCardIcon } from "lucide-react";

const data = [
    {
        title: "Ingresa a Iupi",
        content: "Regístrate o inicia sesión para comenzar a personalizar tu experiencia.",
        icon: <PersonIcon className="text-blue-500 w-5 h-5" />,
        link: "/auth/login",
    },
    {
        title: "Permite conocerte",
        content: "Completa un breve cuestionario para que podamos recomendarte las mejores opciones de inversión.",
        icon: <QuestionMarkCircledIcon className="text-purple-500 w-5 h-5" />,
        link: "/dashboard/questions",
    },
    {
        title: "Apertura tu Balance",
        content: "Conoce tu balance inicial y establece tus objetivos de ahorro.",
        icon: <CreditCardIcon className="text-green-500 w-5 h-5" />,
        link: "/dashboard/questions",
    },
    {
        title: "Conoce nuestros Planes",
        content: "Explora las diferentes opciones de inversión y selecciona la que mejor se adapte a ti.",
        icon: <BackpackIcon className="text-orange-500 w-5 h-5" />,
        link: "/plans",
    },
    {
        title: "¿Necesitas ayuda?",
        content: "Accede a nuestro centro de soporte o consulta nuestras preguntas frecuentes.",
        icon: <QuestionMarkCircledIcon className="text-red-500 w-5 h-5" />,
        link: "/help",
    },
    {
        title: "Visualiza tus recomendaciones",
        content: "Basado en tu perfil, te mostraremos las mejores estrategias para optimizar tus inversiones.",
        icon: <StarIcon className="text-yellow-500 w-5 h-5" />,
        link: "/recommendations",
    },
    {
        title: "Realiza tu primera transferencia",
        content: "Fondea tu cuenta y comienza a invertir de manera segura.",
        icon: <BanknoteIcon className="text-green-600 w-5 h-5" />,
        link: "/transactions/deposit",
    },
    {
        title: "Realiza tu plazo fijo",
        content: "Descubre cómo generar rendimientos con inversiones a plazo fijo.",
        icon: <RocketIcon className="text-indigo-500 w-5 h-5" />,
        link: "/fixed-deposits",
    },
    {
        title: "Compra Activos",
        content: "Accede a la oportunidad de comprar activos financieros y diversifica tu portafolio de inversión.",
        icon: <ShoppingCartIcon className="text-teal-500 w-5 h-5" />,
        link: "/market",
    },
];

export default function HelpButton() {
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const router = useRouter();

    const toggleHelp = () => {
        setIsHelpOpen((prev) => !prev);
    };

    return (
        <Flex direction={"column"} className="relative">
            {/* Botón de ayuda flotante */}
            <button
                onClick={toggleHelp}
                className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
            >
                <HelpCircleIcon width={24} height={24} />
            </button>

            {/* Modal con scroll y responsive */}
            {isHelpOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto relative">
                        {/* Botón de cerrar */}
                        <button
                            onClick={toggleHelp}
                            className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800"
                        >
                            <Cross2Icon width={24} height={24} />
                        </button>

                        {/* Contenido scrollable */}
                        <div className="overflow-y-auto max-h-[70vh] p-2">
                            {data.map((step, index) => (
                                <div key={index} className="flex items-center space-x-4 p-3 border-b border-gray-300">
                                    {step.icon}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{step.title}</h3>
                                        <p className="text-gray-600">{step.content}</p>
                                        <Link href={step.link} className="text-blue-500 hover:underline">
                                            Ir al paso
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Flex>
    );
}
