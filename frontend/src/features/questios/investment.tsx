"use client";
import { useRouter } from "next/navigation"; // Usa next/navigation en lugar de next/router
import { useEffect } from "react";
import { useQuestions } from "@/stores/useQuestions"; // Importa el store de Zustand renombrado

export default function InvestmentProfileHandler() {
    const router = useRouter();
    const { answers, riskPercentage } = useQuestions.getState();

    useEffect(() => {
        // Verifica si el usuario está autenticado y si su risk_percentage es null
        if (riskPercentage === null || answers.length === 0) {
            // Redirige al usuario a la página de preguntas y respuestas
            router.push("/dashboard/questions"); // Cambia "/dashboard/questions" por la ruta de tu página de preguntas
        }
    }, [answers, riskPercentage, router]);

    // Si no es necesario redirigir, no renderiza nada
    return null;
}