import React from 'react';

interface GoalCardProps {
    goal: {
        id: string;
        name: string;
        targetAmount: number;
        progress: number;
    };
    onEdit: (goal: any) => void;
}

export function GoalCard({ goal, onEdit }: GoalCardProps) {
    const progressPercentage = (goal.progress / goal.targetAmount) * 100;

    return (
        <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">{goal.name}</h3>
            <p className="text-sm text-gray-600">
                <strong>Monto objetivo:</strong> ${goal.targetAmount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
                <strong>Progreso:</strong> ${goal.progress.toFixed(2)} ({progressPercentage.toFixed(1)}%)
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <button
                onClick={() => onEdit(goal)}
                className="mt-3 text-sm text-green-600 hover:text-green-700 transition"
            >
                Editar
            </button>
        </div>
    );
}