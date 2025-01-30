'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DialogWelcome() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(true);

    useEffect(() => {
        if (isDialogOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isDialogOpen]);

    if (status === "loading") return <div>Cargando...</div>

    const handleCreateProfile = () => {
        // Lógica para crear el perfil de inversionista
        console.log("Perfil de inversionista creado");
        // Si quieres redirigir a otra página, puedes hacerlo aquí
        // router.push('/ruta-del-perfil');
        setIsDialogOpen(false); // Cerrar el diálogo después de crear el perfil
    };

    if (session?.user?.role=='USER') {
        return (
            <div className={`fixed inset-5 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isDialogOpen ? 'block' : 'hidden'}`}>
                <div className="bg-gray-300 text-black rounded-2xl border-2 border-orange-500 p-8 max-w-sm w-11/12 text-center shadow-lg relative">
                    <h2 className="text-xl font-bold text-blue-900">¡Bienvenido a IUPI! 🎉</h2>
                    <p className="mt-4 font-semibold">
                        Para que podamos ayudarte a alcanzar tus metas financieras de la mejor manera,
                        necesitamos conocerte un poco más.
                    </p>
                    <p className="mt-3 font-semibold">
                        Al completar tu perfil de inversionista, te ofreceremos recomendaciones y estrategias
                        100% personalizadas, adaptadas a tus necesidades y objetivos.
                    </p>
                    <p className="mt-3 font-semibold">¿Listo para empezar tu camino hacia el éxito financiero?</p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600"
                            onClick={handleCreateProfile}
                        >
                            Crear mi perfil de inversionista
                        </button>
                        <button
                            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600"
                            onClick={() => router.push("/dashboard/questions")}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}
