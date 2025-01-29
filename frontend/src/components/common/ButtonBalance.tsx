'use client';

import { Button } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { CheckIcon, PlusIcon } from '@radix-ui/react-icons';
import { createNotification } from '@/services/notificationService';

export const ButtonBalance = ({ userId }: { userId: string }) => {
    const [loading, setLoading] = useState(false);
    const [balanceExists, setBalanceExists] = useState(false);


    const handleCreateBalance = async () => {
  setLoading(true)
  try {
    const response = await fetch('/api/balance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Error al crear balance:', result.error)
      throw new Error(result.error)
    }

    if (result.message === 'El balance ya existe para este usuario') {
      await createNotification(userId, 'El balance ya existe para este usuario. Ahora puede realizar transferencias e invertir en IUpi!')
      setBalanceExists(true)
    }

    setLoading(false)
    return result
  } catch (error) {
    console.error('Error en handleCreateBalance:', error)
    setLoading(false)
  }
}

    return (
        <div>
            <Button
                onClick={handleCreateBalance}
                disabled={loading || balanceExists}
            >
                {loading ? (
                    'Creando balance...'
                ) : balanceExists ? (
                    <>
                        <CheckIcon /> Balance existente
                    </>
                ) : (
                    <>
                        <PlusIcon /> Crear Balance
                    </>
                )}
            </Button>
        </div>
    );
};