"use client";

import { useSession } from "next-auth/react";
import InvestmentProfile from "./InvestmentProfile";

export default function InvestmentProfileHandler() {
    const { data: session, status } = useSession();

    // Muestra un estado de carga mientras se obtiene la sesión
    if (status === "loading") {
        return null; // O un spinner si prefieres
    }

    // Si no hay sesión, evita mostrar el componente
    if (!session?.user) {
        return null;
    }

    // Si el perfil está incompleto, muestra el componente de perfil
    if (session.user.risk_percentage === null) {
        return <div className='fixed justify-center justify-items-center'>
            <InvestmentProfile />
        </div>;
    }

    // Si no cumple las condiciones, no muestra nada
    return null;
}
