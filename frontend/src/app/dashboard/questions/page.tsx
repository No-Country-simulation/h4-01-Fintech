// pages/profile.tsx
'use client'
import Loading from "@/app/loanding";
import InvestorProfileWizard from "@/components/questions/InvestorProfileWizard";
import { Button } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const { data: session , status} = useSession();
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
    }, [status, router]);

    if (status === 'loading'){
        return (<>
          <Loading/>
        </>)
    }

    if (session?.user) {
        return (<InvestorProfileWizard />);
    }

    if (!session?.user) {
        <div className="w-full min-h-screen flex flex-col justify-center items-center p-8 m-8">
            <div className="text-center text-2xl font-bold mb-5">
                No has iniciado sesión
            </div>
            <div className="flex gap-4">
                <Button
                    className="px-5 py-3 rounded-lg  hover:shadow-lg transition-shadow"
                    onClick={() => router.push('/auth/login')}
                >
                    Iniciar sesión
                </Button>
                <Button
                    className="px-5 py-3 rounded-lg  hover:shadow-lg transition-shadow"
                    onClick={() => router.push('/')}
                >
                    Ir al inicio
                </Button>
            </div>
        </div>;
    }

    
}