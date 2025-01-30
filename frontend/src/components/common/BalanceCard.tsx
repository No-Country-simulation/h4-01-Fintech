'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getBalance } from "@/services/balanceService";
import { WobbleCard } from "../aceternity/WobbleCard";

interface BalanceData {
    id: string;
    userId: string;
    balance: number;
    last_updated: string; // Cambiado a string porque JSON.parse devuelve string
    cvu: string;
}

export default function BalanceCard() {
    const { data: session, status } = useSession();
    const userId = session?.user.id;

    const [balance, setBalance] = useState<BalanceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId || status !== "authenticated") return; // Evitar ejecutar si no está autenticado

        const fetchBalance = async () => {
            try {
                const response = await getBalance(userId);
                if (response && response.ok) {
                    const data = await response.json();
                    setBalance({
                        id: data.id,
                        userId: data.userId,
                        balance: Number(data.balance),
                        last_updated: new Date(data.last_updated).toISOString(),
                        cvu: data.cvu,
                    });
                } else {
                    setBalance(null);
                }
            } catch (err) {
                setError("Error al obtener el balance");
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, [userId, status]);

    if (loading) return <p>Cargando balance...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!balance) return <p>No se encontró balance para este usuario.</p>;

    return (
        <WobbleCard containerClassName="mt-4 mb-4" className="p-4">
            <h2 className="text-xl font-bold mb-2">Información del Balance</h2>
            <p><strong>{session?.user.name}</strong></p>
            <p><strong>Tu Saldo:</strong> ${balance.balance.toFixed(2)} Pesos</p>
            <p><strong>CVU en IUpi:</strong> {balance.cvu}</p>
            <p><strong>Última actualización:</strong> {new Date(balance.last_updated).toLocaleString()}</p>
        </WobbleCard>
    );
}
