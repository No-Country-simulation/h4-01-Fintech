'use client';

import { useEffect, useState } from "react";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { CardBody, CardContainer, CardItem } from "../aceternity/3d-card";
import { Skeleton } from "@radix-ui/themes";
import { useDepositStore } from "@/stores/depositStore";

interface BalanceData {
    id: string;
    userId: string;
    amount: number;
    last_updated: string;
    cvu: string;
}

interface BalanceCardProps {
    refresh: boolean;
}

export default function BalanceCard({ refresh }: BalanceCardProps) {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const [balance, setBalance] = useState<BalanceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const depositSuccess = useDepositStore((state) => state.depositSuccess);

    useEffect(() => {
    if (!userId || status !== "authenticated") return;

    const fetchBalance = async () => {
        setLoading(true);
      try {
        const response = await fetch('/api/balance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) throw new Error("No se encontró el balance");

        const data = await response.json();
        setBalance({
          id: data.id,
          userId: data.userId,
          amount: Number(data.balance),
          last_updated: new Date(data.last_updated).toISOString(),
          cvu: data.cvu,
        });
      } catch (err) {
        setError("Error al obtener el balance");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [userId, status, refresh]);

    if (loading) return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );

    if (error) return <p className="text-red-500">{error}</p>;
    if (!balance) return <p>No se encontró balance para este usuario.</p>;

    return (
        <CardContainer containerClassName="max-w-md ga-2">
            <CardBody className="relative bg-gray-900 text-white p-6 rounded-xl shadow-xl overflow-hidden">
                {/* Logo de IUpi */}
                <CardItem className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none">
    <Image
        src="/logo/logo-transparente.png"
        alt="IUpi Logo"
        width={200}
        height={200}
    />
</CardItem>

                {/* Imagen de perfil */}
                <CardItem translateZ={30} className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                    <Image
                        src={session?.user.image || '/default-image.png'}
                        alt={session?.user.name || 'User'}
                        width={64}
                        height={64}
                        className="object-cover"
                    />
                </CardItem>

                {/* Información del usuario */}
                <CardItem translateZ={20} className="mt-4">
                    <h2 className="text-lg font-bold">{session?.user.name}</h2>
                </CardItem>

                {/* Saldo disponible */}
                <CardItem translateZ={20} className="mt-2">
                    <p className="text-xl font-semibold">
                        ${balance.amount.toFixed(2)} <span className="text-sm">Pesos</span>
                    </p>
                </CardItem>

                {/* CVU */}
                <CardItem translateZ={10} className="mt-2 text-sm opacity-80">
                    <p><strong>CVU :</strong> {balance.cvu}</p>
                </CardItem>

                {/* Última actualización */}
                <CardItem translateZ={5} className="mt-2 text-xs opacity-70">
                    <p>Última actualización: {new Date(balance.last_updated).toLocaleString()}</p>
                </CardItem>
            </CardBody>

            
        </CardContainer>
    );
}