'use client'
import { useState } from 'react';
import BalanceCard from '@/components/common/BalanceCard';
import DepositForm from '@/components/forms/DeposiForm';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Flex, Section, Card, Text, IconButton, Heading } from '@radix-ui/themes';

export default function Page() {
  const [refreshBalance, setRefreshBalance] = useState(false);

  // Función para refrescar el balance
  const handleRefreshBalance = () => {
    setRefreshBalance(!refreshBalance);
  };

  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6">
        {/* Columna de Opciones de Pago */}
        <div className='gap-2 mb-4'>
          <Card className="max-w-md mx-auto p-6 shadow-lg border border-gray-100">
            <Flex direction="column" gap="4" align="center">
              <Flex align="center" gap="3">
                <IconButton variant="soft" radius="full" className="bg-indigo-50">
                  <InfoCircledIcon className="text-indigo-500" width="20" height="20" />
                </IconButton>
                <Heading size="5" weight="bold" className="text-indigo-600">
                  Actualmente estamos trabajando en las diferentes opciones para que puedas comenzar a invertir y comprar activos
                </Heading>
              </Flex>
              <Text size="3" color="gray" align="center" className="text-gray-600">
                En este emulador, solo ingresa la cantidad que deseas sumar a tu balance. ¡Nosotros nos encargaremos de lo demás!
              </Text>
            </Flex>
          </Card>
          <div className='w-[1/4] mt-8 mr-8 ml-8'>
            <DepositForm onSuccess={handleRefreshBalance} /> {/* Pasamos la función para refrescar el balance */}
          </div>
        </div>

        {/* Balance */}
        <div className="mt-10 mb-4 w-full h-64 md:h-auto flex justify-center items-center">
          <BalanceCard refresh={refreshBalance} /> {/* Pasamos el estado para refrescar */}
        </div>
      </div>
    </Section>
  );
}
