import React from 'react';
import Link from 'next/link';
import { Button } from '@radix-ui/themes';

const VerifyEmailPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                {/* Título principal */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
                    ¡Cuenta creada con éxito!
                </h2>

                {/* Descripción */}
                <p className="text-base sm:text-lg text-gray-600 text-center mb-6">
                    Para completar tu registro, por favor verifica tu correo electrónico.
                    Te hemos enviado un correo de confirmación a tu dirección de email.
                    Revisa tu bandeja de entrada y sigue el enlace para activar tu cuenta.
                    <br />
                    Si no ves el correo, revisa tu carpeta de spam o correo no deseado.
                </p>

                {/* Botón */}
                <div className="flex justify-center">
                    <Link href="/auth/resend-verification">
                        <Button className="w-full sm:w-auto bg-[#0052CC] hover:bg-[#0052CC]/90 text-white px-6 py-3 text-sm sm:text-base font-medium rounded-lg">
                            Volver a la página principal
                        </Button>
                    </Link>
                </div>

                {/* Nota */}
                <p className="text-xs text-gray-500 text-center mt-4">
                    ¿No recibiste el correo? Verifica tu carpeta de spam o
                    <Link href="/auth/resend-verification" className="text-[#0052CC] hover:underline ml-1">
                        haz clic aquí para reenviar.
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
