'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Button } from "@radix-ui/themes";
import { createNotification } from "@/services/notificationService";
import { useToast } from "@/hooks/use-toast";

interface Data {
    name: string;
    targetAmount: number;
    userId?: string;
}

// Esquema de validación con Zod
const goalSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    targetAmount: z.coerce.number().min(0.01, "El monto debe ser mayor a 0"),
    userId: z.string().optional(),
});

export function GoalForm({ userId }: { userId?: string }) {
    const { showToast, ToastComponent } = useToast(); // Asegúrate de que useToast devuelva showToast y ToastComponent
    const { register, handleSubmit, formState: { errors } } = useForm<Data>({
        resolver: zodResolver(goalSchema),
        defaultValues: { name: "", targetAmount: 0, userId },
    });

    const [apiError, setApiError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (data: Data) => {
        try {
            setApiError(null); // Reiniciar error previo

            const response = await fetch('/api/goals', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setApiError(result.error || "Error desconocido");
                return;
            }

            // Si la respuesta es exitosa y userId está definido, muestra el toast
            if (result && userId) {
                showToast({
                    title: 'Aviso',
                    description: `Hola, tu objetivo fue creado con éxito. Próximamente tendrás recomendaciones y recordatorios basados en tus ganancias. Se registró bajo el nombre de ${data.name} y un monto de ${data.targetAmount}.`,
                    duration: 5000,
                });

                // Crear notificación
                await createNotification(
                    userId,
                    `Hola, tu objetivo fue creado con éxito. Próximamente tendrás recomendaciones y recordatorios basados en tus ganancias. Se registró bajo el nombre de ${data.name} y un monto de ${data.targetAmount}.`
                );
            }

            // Redirigir al dashboard después de crear el objetivo
            router.push('/dashboard');
        } catch (error) {
            setApiError('Error al enviar el formulario');
            console.log('Error:', error);
        }
    };

    return (
        <div className="p-4 border rounded max-w-md mx-auto bg-white shadow-lg">
            {/* Texto explicativo */}
            <div className="mb-6 text-center">
                <h2 className="text-xl font-semibold mb-2">¿Qué es un objetivo?</h2>
                <p className="text-sm text-gray-600">
                    Un objetivo es una meta financiera que te propones alcanzar, como comprar una moto, un carro o cualquier otro bien.
                    Con esta herramienta, podrás definir tu meta, monitorear tu progreso y recibir notificaciones cuando estés cerca de alcanzarla.
                    ¡Empieza a ahorrar hoy mismo y alcanza tus sueños!
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Nombre del objetivo"
                        {...register("name")}
                    />
                    {errors.name?.message && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <input
                        className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Meta"
                        type="number"
                        step="0.01"
                        {...register("targetAmount")}
                    />
                    {errors.targetAmount?.message && <p className="text-red-500 text-sm mt-1">{errors.targetAmount.message}</p>}
                </div>
                {userId && <input type="hidden" {...register("userId")} />}

                {/* Mostrar errores de la API */}
                {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}

                <Button type="submit" className="w-full">
                    Crear Objetivo
                </Button>
            </form>

            {/* Renderizar el componente de Toast */}
            <ToastComponent />
        </div>
    );
}