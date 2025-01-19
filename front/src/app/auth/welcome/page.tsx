import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const VerifyEmailPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 sm:p-12 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Verifica tu Correo</h2>
                <p className="text-lg text-gray-600 text-center mb-4">
                    Para completar tu registro, por favor verifica tu correo electrónico.
                </p>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Revisa tu bandeja de entrada para el enlace de verificación. Si no lo encuentras, revisa en la carpeta de spam o vuelve a intentar.
                </p>

                <div className="flex justify-center">
                    <Link href="/auth/resend-verification">
                        <Button className="bg-[#0052CC] hover:bg-[#0052CC]/90 text-white">
                            Enviar nuevamente el correo
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
