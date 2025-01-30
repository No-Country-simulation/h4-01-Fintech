'use client';
import { Box, Button, Card, Flex, Heading, Text } from '@radix-ui/themes';
import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AccordionProfile from '@/components/accordions/perfil';
import { determinarPerfil, obtenerMensaje } from '@/lib/perfiles';
import Loading from '../loanding';
import { useQuestions } from '@/stores/useQuestions';
import { ButtonBalance } from '@/components/common/ButtonBalance';
import BalanceCard from '@/components/common/BalanceCard';
import { Avatar } from '@radix-ui/react-avatar';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user?.id as string | undefined;
  let riskPercentage = useQuestions().setRiskPercentage as unknown as number || null;

  if (status === 'loading') {
    return <Loading />;
  }

  if (session?.user) {
    const perfil = determinarPerfil(riskPercentage);
    const mensaje = obtenerMensaje(perfil);
    return (
      <Flex direction="column" className="min-h-screen p-5 bg-gray-50 justify-center justify-items-center">
        <div className="max-w-7xl justify-center justify-items-center">
          {/* Encabezado */}
          <Heading as="h1" align="center" size="7" className="mb-8 text-gray-900">
            {session?.user?.name}
          </Heading>

          {/* Sección de editar y avatar */}
          <Card className="mb-8 p-6 bg-slate-200 rounded-lg shadow-sm">
            <Flex justify="between" align="center" className="mb-6">
              <Button variant="solid">Editar</Button>
            </Flex>

            {/* Avatar y detalles */}
            <Flex direction={{ initial: 'column', md: 'row' }} align="center" gap="5">
              <Image
                src={session?.user?.image || '/logo/logo.png'}
                alt="Profile"
                width={192}
                height={192}
                className="w-32 h-32 md:w-48 md:h-48 rounded-lg border-2 border-gray-600"
              />
              <Box className="flex-1 w-full">
                <AccordionProfile />
              </Box>
            </Flex>
            <BalanceCard />
          </Card>

          {/* Sección de descripción del perfil */}
          <Card className="mb-8 p-6 bg-white rounded-lg text-center">
            <Heading as="h2" size="5" className="mb-5 text-gray-600">
              Este es tu perfil de {session?.user?.role?.toLowerCase() === 'user' ? 'usuario' : 'administrador'}
            </Heading>
            <Text as="p" size="4" className="text-gray-600">
              {mensaje}
            </Text>
            <Flex justify="center" className="m-2">
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard/questions')}
            >
              Actualizar Mis respuestas
            </Button>
          </Flex>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
            {userId && <ButtonBalance userId={userId} />}
          </div>
        </div>
      </Flex>
    );
  }

  if (!session) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center p-5">
        <div className="text-center text-2xl font-bold mb-5">No has iniciado sesión</div>
        <div className="flex gap-4">
          <Button className="px-5 py-3 rounded-lg hover:shadow-lg" onClick={() => router.push('/auth/login')}>
            Iniciar sesión
          </Button>
          <Button className="px-5 py-3 rounded-lg hover:shadow-lg" onClick={() => router.push('/')}
          >
            Ir al inicio
          </Button>
        </div>
      </div>
    );
  }
}
