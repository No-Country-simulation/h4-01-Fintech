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
      <div className="relative w-full h-64 md:h-auto">
        <Image
          src='/images/image1.png'
          alt='imagen'
          width={700}
          height={500}
          className="rounded-lg shadow-lg content-end"
        />
      </div>

      {/* Columna de texto */}
      <div className='justify-center justify-items-center w-[500px]'>
        <div className="text-[#002a4d] text-5xl font-bold  capitalize">Educación Financiera</div>
        <div>
          <br />
          <br />
          <div>
            <span className="text-[#002a4d] text-lg font-semibold">Aprende a gestionar y hacer crecer tu dinero con IUPI.</span>
            <br />
            <br/>

            <p className="text-[#002a4d] text-lg font-normal">
              Sabemos que el conocimiento es la clave para tomar decisiones financieras inteligentes. Por eso, en IUPI ofrecemos recursos educativos diseñados para todos los niveles de experiencia:

            </p>
            <br/>
            <p className="text-[#002a4d] text-lg font-normal">- Glosario financiero: Encuentra explicaciones claras de términos complejos para facilitar tu experiencia.
            </p>
            <br />
            <p className="text-[#002a4d] text-lg font-normal">- Blog de actualidad: Mantente informado con análisis y consejos sobre las últimas tendencias económicas y financieras.
            </p>
            <br/>
            <p className="text-[#002a4d] text-lg font-normal">Con nuestros recursos educativos, podrás desarrollar habilidades para gestionar tu dinero y alcanzar tus metas con confianza.
            </p>          
            <br/>
            <Button onClick={() => router.push('/auth/register')}  >Aprender</Button>
            </div>
        </div>
      </div>
      
    </div>
  )
}
