
'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SignIn from '../../../app/components/atoms/signin';
import { registrationSchema } from "@/validations/schemas";
import { z } from "zod";
import { RegisterService } from '@/services/authService';
// import { useRouter } from 'next/navigation'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {LeftSection} from '@/app/components/organisms/LeftSection';
import { useToast } from "@/hooks/use-toast";

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const { toast } = useToast();
  // const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  //
  const onSubmit = async (data: RegistrationFormValues) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Error en las contraseñas",
        description: "Las contraseñas no coinciden. Por favor, inténtalo de nuevo.",
        duration: 5000,
      });
      return;
    }

    const userData = {
      email: data.email,
      name: data.fullName,
      dni: data.dni,
      password: data.password,
    };

    try {
      const result = await RegisterService.post(userData);

      if (result.success) {
        toast({
          title: "Registro exitoso",
          description: result.message,
          duration: 5000,
        });
        window.open('/auth/welcome', '_blank');
      } else {
        toast({
          title: "Error en el registro",
          description: result.message,
          duration: 5000,
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error en el registro",
        description: "Ocurrió un error inesperado. Inténtalo de nuevo.",
        duration: 5000,
      });
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <LeftSection/>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col">
        <div className="flex justify-end mb-8">
          <div className="text-sm text-gray-600">
            Ya tienes una cuenta?{' '}
            <Link href="/auth/login" className="text-[#0052CC] hover:underline">
              Inicia sesión
            </Link>
          </div>
        </div>

        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Registrate</h2>

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
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm text-gray-600">
                Nombre completo
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Nombre completo"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="dni" className="text-sm text-gray-600">
                DNI o Cedula
              </label>
              <Input
                id="dni"
                type="text"
                placeholder="00.000.000"
                {...register("dni")}
              />
              {errors.dni && (
                <p className="text-red-500 text-sm">{errors.dni.message}</p>
              )}
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
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm text-gray-600">
                Repetir contraseña
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repetir contraseña"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0052CC] hover:bg-[#0052CC]/90 text-white"
            >
              Registrate
            </Button>
            <div className='flex justify-center'>
              <SignIn></SignIn>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
