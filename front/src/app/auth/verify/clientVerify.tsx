'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { VerifyEmailService } from '@/services/validatorEmail';
import { EmailVerificationSkeleton } from '@/app/components/skeletons/emailVerificationSkeleton';


export default function VerifyEmail() {
    const [verifyStatus, setVerifyStatus] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Obtén el token de los parámetros de búsqueda
    const token = searchParams.get('token');

    useEffect(() => {
        if (token && verifyStatus === null) {
            console.log('Iniciando verificación del token:', token);

            setVerifyStatus('loading');

            // Usamos el método get para verificar el token
            VerifyEmailService.get(token)
                .then((data) => {
                    if (data?.success) {
                        setVerifyStatus('success');
                        setTimeout(() => {
                            router.push('/auth/login'); // Redirige al login después de la verificación
                        }, 2000);
                    } else {
                        setVerifyStatus('error');
                    }
                })
                .catch((error) => {
                    console.error('Error en la verificación del token:', error);
                    setVerifyStatus('error');
                });
        }
    }, [token, verifyStatus, router]);

    return (
        <>
            {/* Muestra el Skeleton mientras se está cargando */}
            {verifyStatus === 'loading' && <EmailVerificationSkeleton />}

            {/* Caja de verificación de token cuando hay un error */}
            {verifyStatus === 'error' && (
                <div className="max-w-md mx-auto mt-8 px-6 py-4 bg-white shadow-md rounded-lg border border-gray-200 sm:max-w-lg md:max-w-xl">
                    <div className="bg-[#608fb9] text-white font-bold p-4 rounded-t-lg text-center">
                        Verificación Fallida
                    </div>
                    <div className="p-4 bg-white rounded-b-lg">
                        <p className="text-red-500 text-lg font-medium mb-2 text-center">
                            La verificación del token ha fallado.
                        </p>
                        <p className="text-gray-700 text-center">
                            Por favor, inténtelo de nuevo. Si el problema persiste, contacte al soporte técnico para obtener ayuda.
                        </p>
                        <div className="flex justify-center mt-4">
                            <button
                                className="px-4 py-2 bg-[#608fb9] text-white font-semibold rounded hover:bg-[#507fa1] transition-colors"
                                onClick={() => router.push('/auth/register')} // Botón para intentar de nuevo
                            >
                                Volver al registro
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mensaje de éxito de verificación */}
            {verifyStatus === 'success' && (
                <div className="text-center text-green-500">
                    La verificación del token fue exitosa. Redirigiendo al login...
                </div>
            )}

            {/* Mensaje si no se proporciona token */}
            {verifyStatus === null && !token && (
                <div className="text-center text-red-500">Token no proporcionado.</div>
            )}
        </>
    );
}
