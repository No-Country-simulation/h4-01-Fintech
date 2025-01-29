'use client'
import React from 'react';
import Image from 'next/image';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

export default function Section3() {
    const router = useRouter();
    return (
        <div id='planes-ahorro' className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6">
            {/* Columna de texto */}
            <div className='justify-center justify-items-center w-[500px]'>
                <div className="w-[487px] text-[#002a4d] text-5xl font-bold  capitalize">Panel Para Inversores</div>
                <br/>
                <div>
                    <span className="text-[#002a4d] text-lg font-extrabold ">Tu progreso, siempre a la vista<br />
                    </span>
                    <span className="text-[#002a4d] text-lg font-normal ">Consulta y analiza el rendimiento de tus inversiones en tiempo real:<br/>
                    <br/></span>
                    <span className="text-[#002a4d] text-lg font-normal ">- Total invertido.<br /></span>
                    <span className="text-[#002a4d] text-lg font-normal "><br /></span>
                    <span className="text-[#002a4d] text-lg font-normal ">- Proyectos activos y ROI estimado.<br /></span>
                    <span className="text-[#002a4d] text-lg font-normal "><br /></span>
                    <span className="text-[#002a4d] text-lg font-normal ">- Histórico de rendimientos en pesos y dólares.<br /></span>
                    <span className="text-[#002a4d] text-lg font-normal "><br />- Visualiza tus logros y recibe recomendaciones personalizadas para optimizar tu portafolio.</span></div>
                <Button onClick={() => router.push('/dashboard/questions')}  mt={'6'} size={'4'} variant='soft'>Crear mi perfil de inversionista</Button>
            </div>

            {/* Columna de imagen */}
            <div className="relative w-full row-end-1">
                <Image
                    src='/images/Browsers.png'
                    alt='imagen'
                    width={900}
                    height={600}
                    className="rounded-lg shadow-lg content-end"
                />
            </div>
        </div>
    )
}
