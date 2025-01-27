'use client';

import { Skeleton } from '@radix-ui/themes';
import Image from 'next/image';

export default function Loading() {
    return (
        <div className="container mx-auto p-4 space-y-4">
            {/* Logotipo centrado */}
            <div className="flex justify-center mb-8">
                <Image
                    src="/logo/logo.png" // Ruta de tu logotipo en la carpeta public
                    alt="Logotipo de Mi Sitio Web"
                    width={150} // Ancho del logotipo
                    height={150} // Alto del logotipo
                    className="animate-pulse" // Agrega una animación de pulsación
                />
            </div>

            {/* Sección superior: Avatar y texto */}
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>

            {/* Sección de tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="space-y-3">
                        <Skeleton className="h-[200px] w-full rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="space-y-3">
                        <Skeleton className="h-[200px] w-full rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="space-y-3">
                        <Skeleton className="h-[200px] w-full rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    );
}