'use client';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState } from 'react';

const accessToken = process.env.NEXT_PUBLIC_MERCADO_KEY as string;
initMercadoPago(accessToken);

export default function PaymentPage() {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const createPayment = async () => {
    try {
      const response = await fetch('/api/payme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction_amount: 100.50, // Monto de la transacción
          token: 'token_generado_por_mercado_pago', // Token generado por Mercado Pago
          description: 'Recarga de saldo', // Descripción del pago
          installments: 1, // Número de cuotas
          paymentMethodId: 'visa', // Método de pago (ej: 'visa', 'master')
          issuer: '123', // ID del emisor (opcional)
          email: 'usuario@example.com', // Email del pagador
          identificationType: 'DNI', // Tipo de identificación
          number: '12345678', // Número de identificación
        }),
      });

      const data = await response.json();
      if (data.success) {
        setPreferenceId(data.data.id); // Guardar el preferenceId en el estado
      } else {
        console.error('Error al crear el pago:', data.error);
      }
    } catch (error) {
      console.error('Error al crear el pago:', error);
    }
  };

  const handleOnReady = () => {
    console.log('Wallet is ready');
  };

  return (
    <section className="grid gap-8 p-6">
      <div id="wallet_container"></div>
      <Wallet
        initialization={{ redirectMode: 'self' }}
        onReady={handleOnReady}
        onSubmit={createPayment}
        customization={{ texts: { valueProp: 'smart_option' } }}
      />
    </section>
  );
}