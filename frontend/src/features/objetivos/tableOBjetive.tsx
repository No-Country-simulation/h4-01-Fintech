'use client'
import React, { useState } from 'react';
import styles from './table.module.css';
import { GoalForm } from './createObjetivo';
import { GoalList } from './viewObjetive';
import { Tabs } from '@radix-ui/themes';

interface Goal {
    name: string;
    targetAmount: number;
    progress: number;
}

export default function TableObjetive({ userId }: { userId: string }) {
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

    return (
        <div>
            <Tabs.Root className={styles.Root} defaultValue="create">
                <Tabs.List className={styles.List} aria-label="Manage your account">
                    <Tabs.Trigger className={styles.Trigger} value="create">
                        Crear Objetivo
                    </Tabs.Trigger>
                    <Tabs.Trigger className={styles.Trigger} value="objetives">
                        Mis Objetivos
                    </Tabs.Trigger>
                </Tabs.List>

                {/* Contenido de la pestaña "Crear Objetivo" */}
                <Tabs.Content className={styles.Content} value="create">
                    <GoalForm userId={userId} />
                </Tabs.Content>

                {/* Contenido de la pestaña "Mis Objetivos" */}
                <Tabs.Content className={styles.Content} value="objetives">
                    <GoalList userId={userId} />
                </Tabs.Content>
            </Tabs.Root>

            {/* Mostrar el objetivo seleccionado en pantalla completa */}
            {selectedGoal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
                        <h2 className="text-xl font-semibold mb-4">{selectedGoal.name}</h2>
                        <p><strong>Monto objetivo:</strong> ${selectedGoal.targetAmount.toFixed(2)}</p>
                        <p><strong>Progreso:</strong> ${selectedGoal.progress.toFixed(2)}</p>
                        <button
                            onClick={() => setSelectedGoal(null)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}