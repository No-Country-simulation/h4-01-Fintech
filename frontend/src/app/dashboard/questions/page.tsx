// pages/profile.tsx
'use client'
import InvestorProfileWizard from "@/components/questions/InvestorProfileWizard";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const { data: session } = useSession();

    // Si el usuario no está autenticado, muestra un mensaje o redirige
    if (!session) {
        return <div>Por favor, inicia sesión para completar tu perfil.</div>;
    }

    return <InvestorProfileWizard />;
}