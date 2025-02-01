'use client';

import { useState, useEffect } from 'react';
import { ScrollArea } from '@radix-ui/themes'; 
import { GoalCard } from './objetivo';
interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    progress: number;
}
export function GoalList({ userId }: { userId?: string }) {
    const [goals, setGoals] = useState<Goal[]>([]);

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

    useEffect(() => {
        fetchGoals();
    }, []);

    const onEdit = (goal: Goal) => {
        console.log('Editar objetivo:', goal);
    };

    return (
        <ScrollArea type="auto" className="h-[400px] w-full"> 
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