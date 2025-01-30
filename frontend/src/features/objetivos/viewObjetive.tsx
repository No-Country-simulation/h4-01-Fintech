'use client';

import { useState, useEffect } from 'react';
import { ScrollArea } from '@radix-ui/themes'; 
import { GoalCard } from './objetivo';
// Interfaz para el tipo de dato "Goal"
interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    progress: number;
}


export function GoalList({ userId }: { userId?: string }) {
    const [goals, setGoals] = useState<Goal[]>([]);

    // Función para obtener los objetivos desde la API
    const fetchGoals = async () => {
        try {
            const response = await fetch('/api/goals');
            if (response.ok) {
                const data = await response.json();
                setGoals(data);
            } 
        } catch (error) {
            return null
        }
    };

    // Actualizar la lista de objetivos cuando el componente se monta
    useEffect(() => {
        fetchGoals();
    }, []);

    // Función para manejar la edición de un objetivo
    const onEdit = (goal: Goal) => {
        console.log('Editar objetivo:', goal);
        // Aquí puedes abrir un modal o redirigir a una página de edición
    };

    return (
        <ScrollArea type="auto" className="h-[400px] w-full"> {/* ScrollArea de Radix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {goals.length > 0 ? (
                    goals.map((goal) => (
                        <GoalCard key={goal.id} goal={goal} onEdit={onEdit} />
                    ))
                ) : (
                    <p className="text-sm text-gray-500 text-center col-span-full">
                        No tienes objetivos creados.
                    </p>
                )}
            </div>
        </ScrollArea>
    );
}