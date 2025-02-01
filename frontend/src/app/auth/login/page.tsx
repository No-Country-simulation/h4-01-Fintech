"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from "next/link";
import { LeftSection } from "@/components/layout/leftSection";
import { Input } from "@/components/common/input";
import { signIn } from "next-auth/react";
import { useState } from "react";
import SignIn from "@/features/auth/signin";
import Image from 'next/image';
import { Button } from "@radix-ui/themes";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/app/validations/schemas';

type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { showToast, ToastComponent } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginValues) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if(result){
        router.push('/dashboard')
        showToast({
        title: 'Bienvenido!',
        description:'Login Exitoso',
        duration: 5000,
      });
      }
      if (result?.error) {
        showToast({
        title: 'Error al iniciar sesión',
        description:'Ocurrió un error. Inténtalo de nuevo.',
        duration: 5000,
      });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      showToast({
        title: 'Error al iniciar sesión',
        description:'Ocurrió un error. Inténtalo de nuevo.',
        duration: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Izquierda */}
      <div className="lg:flex-1 hidden lg:flex items-center justify-center">
        <LeftSection />
      </div>

      {/* Derecha */}
      <div className="lg:flex-1 p-8 sm:p-12 flex flex-col items-center justify-center">
        <Image
          className="w-[154px] h-[77px] mx-auto mb-6 lg:hidden"
          src="/logo/logo.png"
          alt="Logo"
          width={150}
          height={760}
        />

        <div className="max-w-md w-full mx-auto">
          <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-[#002a4d]">
            Inicia Sesión
          </h2>
          <div className="mt-4 mb-4">
            <SignIn />
          </div>
          {/* Social Login */}
          <div className="mt-auto lg:hidden">
            <div className="border-t border-gray-300 py-4 text-center">
              <p className="text-sm text-gray-600">O mejor incluso...</p>
              
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-600">
                Mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Mail"
                {...register("email")}
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-600">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
                {...register("password")}
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#005bbb] hover:bg-[#005bbb]/90 text-white rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </Button>

            <div className="text-sm text-center mt-4">
              <Link href="/auth/forgot-password" className="underline">
                Olvidé mi contraseña
              </Link>
            </div>
          </form>

          <div className="text-center mt-8 text-sm text-[#002a4d]">
            ¿No tienes cuenta?{" "}
            <Link href="/auth/register" className="underline">
              Regístrate
            </Link>
          </div>
        </div>

        {/* Pie (solo móvil) */}
        <div className="mt-auto lg:hidden">
          <div className="border-t border-gray-300 py-4 text-center">
          </div>
        </div>
      </div>
    </div>
  );
}
