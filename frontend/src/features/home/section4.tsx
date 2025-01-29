'use client'
import React from 'react';
import Image from 'next/image';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

export default function Section4() {
  const router = useRouter();
  return (
    <div id='educacion-financiera' className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6">
      {/* Columna de imagen */}
      <div className="relative w-full h-64 md:h-auto flex justify-center">
        <Image
          src='/images/image1.png'
          alt='imagen'
          width={700}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Columna de texto */}
      <div className='w-full max-w-lg m-4 p-2 flex flex-col items-center md:items-start'>
        <div className="text-[#002a4d] text-4xl md:text-5xl font-bold capitalize text-center md:text-left">
          Educación Financiera
        </div>
        <div className="text-[#002a4d] text-lg font-semibold text-center md:text-left mt-4">
          Aprende a gestionar y hacer crecer tu dinero con IUPI.
        </div>
        <p className="text-[#002a4d] text-lg font-normal text-center md:text-left mt-4">
          Sabemos que el conocimiento es la clave para tomar decisiones financieras inteligentes.
          Por eso, en IUPI ofrecemos recursos educativos diseñados para todos los niveles de experiencia:
        </p>
        <ul className="text-[#002a4d] text-lg font-normal mt-4 list-disc pl-6">
          <li>Glosario financiero: Encuentra explicaciones claras de términos complejos.</li>
          <li>Blog de actualidad: Mantente informado con análisis y consejos sobre las tendencias económicas.</li>
        </ul>
        <p className="text-[#002a4d] text-lg font-normal text-center md:text-left mt-4">
          Con nuestros recursos educativos, podrás desarrollar habilidades para gestionar tu dinero y alcanzar tus metas con confianza.
        </p>
        <Button onClick={() => router.push('/auth/register')} className="mt-6">Aprender</Button>
      </div>
    </div>
  )
}
