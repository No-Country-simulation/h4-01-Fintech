import { Timeline } from '@/components/aceternity/timeline'
import { Flex } from '@radix-ui/themes';
import {
  Cross2Icon,
  PersonIcon,
  QuestionMarkCircledIcon,
  BackpackIcon,
  StarIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { HelpCircleIcon, BanknoteIcon, ShoppingCartIcon, CreditCardIcon } from "lucide-react";

import React from 'react'

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

export default function page() {
  return (
    <Flex direction={"column"}>
      <Timeline data={data} />
    </Flex>
  )
}
