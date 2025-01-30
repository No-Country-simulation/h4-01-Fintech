'use client';

import { Box, Button, Card, Flex, Heading, Text } from '@radix-ui/themes';
import React, { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AccordionProfile from '@/components/accordions/perfil';
import BalanceCard from '@/components/common/BalanceCard';
import Loading from '../loanding';
import { determinarPerfil, obtenerMensaje } from '@/lib/perfiles';
import { useQuestions } from '@/stores/useQuestions';
import { createNotification } from '@/services/notificationService';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const userId = session?.user?.id as string | undefined;
  const riskPercentage = useQuestions().riskPercentage ?? null;
  const perfil = useMemo(() => determinarPerfil(riskPercentage), [riskPercentage]);
  const mensaje = useMemo(() => obtenerMensaje(perfil), [perfil]);


  const handleRequestInfo = async (): Promise<void> => {
    if (userId) {
      await createNotification(
        userId,
        `Hola, ${session?.user?.name}. El CVU (Clave Virtual Uniforme) es un identificador único asociado a tu cuenta digital, que permite enviar y recibir dinero de manera rápida y segura, sin necesidad de contar con una cuenta bancaria tradicional.`
      );
    }
  };

  if (status === 'loading') return <Loading />;


  if (!session?.user) {
    return (
      <Flex className="w-full min-h-screen flex-col justify-center items-center p-5">
        <Heading as="h1" align="center" size="7" className="mb-5">
          No has iniciado sesión
        </Heading>
        <Flex gap="4">
          <Button onClick={() => router.push('/auth/login')}>Iniciar sesión</Button>
          <Button onClick={() => router.push('/')}>Ir al inicio</Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex direction="column" className="min-h-screen p-5 bg-gray-50 justify-center items-center">
      <div className="max-w-3xl w-full mx-auto">
        <Heading as="h1" align="center" size="7" className="mb-8 text-gray-900">
          {session.user.name}
        </Heading>


        <Card className="mb-8 p-6 bg-slate-200 rounded-lg shadow-sm mx-auto w-full">
          <Flex justify="between" align="center" className="mb-6">
            <Button variant="solid">Editar</Button>
          </Flex>

          <Flex direction={{ initial: 'column', md: 'row' }} align="center" gap="4" className='justify-items-center items-center'>
            <Image
              src={session.user.image || '/logo/logo.png'}
              alt="Profile"
              width={160}
              height={160}
              className="w-32 h-32 md:w-48 md:h-48 rounded-lg border-2 border-gray-600 object-cover aspect-square"
            />
          </Flex>
        </Card>
        <Card className="mb-8 p-6 bg-white rounded-lg text-center mx-auto w-full">
          <Heading as="h2" size="5" className="mb-5 text-gray-600">
            Este es tu perfil de {session.user.role?.toLowerCase() ?? 'usuario'}
          </Heading>
          <Text as="p" size="4" className="text-gray-600">
            {mensaje}
          </Text>

          <Flex justify="center" className="m-2 gap-2">
            <Button variant="ghost" onClick={() => router.push('/dashboard/questions')}>
              Actualizar Mis Respuestas
            </Button>
            <Button variant="ghost" onClick={handleRequestInfo}>
              ¿Qué es el CVU?
            </Button>
          </Flex>
        </Card>
        <Card className='justify-center items-center justify-items-center'>
          <AccordionProfile />
        </Card>

        <Card className="justify-center justify-items-center items-center mb-8 p-6 bg-white rounded-lg text-center mx-auto w-full">
          <BalanceCard />
        </Card>

        <Card className="justify-center justify-items-center items-center mb-8 p-6 bg-white rounded-lg text-center mx-auto w-full">
          <p>Activos Recomendados Proximanete</p>
        </Card>

        <Card className="justify-center justify-items-center items-center mb-8 p-6 bg-white rounded-lg text-center mx-auto w-full">
          <p>Objetivos Proximanete</p>
        </Card>
        
      </div>
    </Flex>
  );
}
