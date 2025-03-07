'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registrationSchema } from '@/app/validations/schemas';
import { z } from 'zod';
import { registerService } from '@/services/authService';
import Link from 'next/link';
import { Button } from '@radix-ui/themes';
import SignIn from '@/features/auth/signin';
import { useToast } from '@/hooks/usetoast';
import Image from 'next/image';
import LeftSection from '@/components/layout/leftSection';

type RegisterValues = z.infer<typeof registrationSchema>;

export default function Register() {
  const { showToast, ToastComponent } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegisterValues) => {
    if (data.password !== data.confirmPassword) {
      showToast({
        title: 'Error en las contraseñas',
        description: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.',
        duration: 5000,
      });
      return;
    }

    try {
      const userData = {
        email: data.email,
        name: data.fullName,
        dni: data.dni,
        password: data.password,
      };

      const result = await registerService.post(userData);

      if (result.success) {
        showToast({
          title: 'Registro exitoso',
          description: result.message,
          duration: 5000,
        });
        window.open('/auth/welcome', '_self');
      } else {
        showToast({
          title: 'Error en el registro',
          description: result.message,
          duration: 5000,
        });
      }
    } catch {
      showToast({
        title: 'Error en el registro',
        description: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
        duration: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="lg:flex-1 hidden lg:flex items-center justify-center">
        <LeftSection />
      </div>

      {/* Right Section */}
      <div className="lg:flex-1 p-8 sm:p-12 flex flex-col items-center justify-center">
        <Image
          className="w-[154px] h-[77px] mx-auto mb-6 lg:hidden"
          src="/logo/logo.png"
          alt="Logo"
          width={150}
          height={77}
        />

        <div className="max-w-md w-full mx-auto">
          <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-[#002a4d]">Regístrate</h2>
          <div className="mt-4 mb-4">
            <SignIn />
          </div>
          {/* Social Login */}
          <div className="mt-auto lg:hidden">
            <div className="border-t border-gray-300 py-4 text-center">
              <p className="text-sm text-gray-600">O mejor incluso...</p>

            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              {/* <label htmlFor="email" className="text-sm text-gray-600">Email</label> */}
              <input
                id="email"
                type="email"
                placeholder="Tu email"
                {...register('email')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              {/* <label htmlFor="fullName" className="text-sm text-gray-600">Nombre Completo</label> */}
              <input
                id="fullName"
                type="text"
                placeholder="Tu nombre completo"
                {...register('fullName')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>

            {/* DNI */}
            <div className="space-y-2">
              {/* <label htmlFor="dni" className="text-sm text-gray-600">DNI o Cédula</label> */}
              <input
                id="dni"
                type="text"
                placeholder="00.000.000"
                {...register('dni')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.dni && <p className="text-red-500 text-sm">{errors.dni.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              {/* <label htmlFor="password" className="text-sm text-gray-600">Contraseña</label> */}
              <input
                id="password"
                type="password"
                placeholder="Tu contraseña"
                {...register('password')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              {/* <label htmlFor="confirmPassword" className="text-sm text-gray-600">Repetir Contraseña</label> */}
              <input
                id="confirmPassword"
                type="password"
                placeholder="Repite tu contraseña"
                {...register('confirmPassword')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <Button
                type="submit"
                className="w-full text-white rounded-lg"
              >
                Continuar
              </Button>
            </div>

            <div className="text-sm text-center mt-4">
              <Link href="/auth/forgot-password" className="underline">¿Olvidaste tu contraseña?</Link>
            </div>
          </form>

          <div className="text-center mt-8 text-sm text-[#002a4d]">
            ¿Ya tienes cuenta? <Link href="/auth/login" className="underline">Inicia sesión</Link>
          </div>
        </div>
      </div>

      {/* Toast Component */}
      <ToastComponent />
    </div>
  );
}
