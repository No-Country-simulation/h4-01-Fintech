'use client';
import { Button, Flex } from '@radix-ui/themes';
import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AccordionProfile from '@/components/accordions/perfil';
import { determinarPerfil, obtenerMensaje } from '@/lib/perfiles';
import Loading from '../loanding';
import {useQuestions} from "@/stores/useQuestions";

export default function Page() {
  const { data: session , status} = useSession();
  const router = useRouter();
  let riskPercentage = useQuestions().setRiskPercentage as unknown as number || null;
  //
  if (status === 'loading'){
    return (<>
      <Loading/>
    </>)
  }

  if (session?.user) {
    const perfil = determinarPerfil(riskPercentage);
    const mensaje = obtenerMensaje(perfil);
    return (
      <Flex direction="column" className="min-h-screen p-5">
        <div className="max-w-7xl mx-auto w-full">
          {/* Encabezado */}
          <div className="text-center text-2xl font-bold mb-5">
            {session.user.name}
          </div>


          <div className="mb-8">
            <div className="flex justify-between items-center mb-5">
              <button className="p-2 rounded-lg ">
                <Image src="/icons/edit.svg" alt="editar" width={18} height={18} />
              </button>
            </div>

            {/* Avatar y detalles */}
            <div className="flex flex-col md:flex-row items-center gap-5">
              <img
                className="w-48 h-48 rounded-lg "
                src={session.user.image}
                alt="Profile"
              />
              <div className='m-4 p-4'>
                <AccordionProfile/>
              </div>
            </div>
          </div>

          <div className="rounded-lg shadow-lg p-5">
            <h2 className="text-2xl text-center mb-5">
              Este es tu perfil de {session.user.role.toLowerCase() === 'user' ? 'usuario' : ''}
            </h2>
            <p className="text-lg mb-5">
              {mensaje} {/* Aquí se muestra el mensaje según el perfil */}
            </p>
          </div>
          <div className='m-2'>
            <Button variant='classic' onClick={() => router.push('/dashboard/questions')}  className='p2 m-2'>Actualizar Recomendaciones</Button>
          </div>
        </div>
      </Flex>
    );
  }

  if (!session) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center p-5">
        <div className="text-center text-2xl font-bold mb-5">
          No has iniciado sesión
        </div>
        <div className="flex gap-4">
          <Button
            className="px-5 py-3 rounded-lg  hover:shadow-lg transition-shadow"
            onClick={() => router.push('/auth/login')}
          >
            Iniciar sesión
          </Button>
          <Button
            className="px-5 py-3 rounded-lg  hover:shadow-lg transition-shadow"
            onClick={() => router.push('/')}
          >
            Ir al inicio
          </Button>
        </div>
      </div>
    );
  }
}