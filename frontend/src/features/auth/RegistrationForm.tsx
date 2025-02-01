'use client'

import * as Form from "@radix-ui/react-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registrationSchema } from "@/app/validations/schemas";
import { z } from "zod";
import { registerService } from '@/services/authService';
import Link from 'next/link';
import LeftSection  from "@/components/layout/leftSection";
import { Button } from "@radix-ui/themes";
import SignIn from "./signin";
import { useToast } from "@/hooks/usetoast";


type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
    const { showToast, ToastComponent } = useToast()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormValues>({
        resolver: zodResolver(registrationSchema),
    });

    const onSubmit = async (data: RegistrationFormValues) => {
        if (data.password !== data.confirmPassword) {
            showToast({
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
            const result = await registerService.post(userData);

            if (result.success) {
                showToast({
                    title: "Registro exitoso",
                    description: result.message,
                    duration: 5000,
                });
                window.open('/auth/welcome', '_blank');
            } else {
                showToast({
                    title: "Error en el registro",
                    description: result.message,
                    duration: 5000,
                });
            }
        } catch (error) {
            showToast({
                title: "Error en el registro",
                description: "Ocurrió un error inesperado. Inténtalo de nuevo.",
                duration: 5000,
            });
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Section */}
            <LeftSection />

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

                    <Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Form.Field name="email">
                            <Form.Label className="text-sm text-gray-600">Mail</Form.Label>
                            <Form.Control asChild>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Mail"
                                    {...register("email")}
                                />
                            </Form.Control>
                            <Form.Message>{errors.email?.message}</Form.Message>
                        </Form.Field>

                        <Form.Field name="fullName">
                            <Form.Label className="text-sm text-gray-600">Nombre completo</Form.Label>
                            <Form.Control asChild>
                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Nombre completo"
                                    {...register("fullName")}
                                />
                            </Form.Control>
                            <Form.Message>{errors.fullName?.message}</Form.Message>
                        </Form.Field>

                        <Form.Field name="dni">
                            <Form.Label className="text-sm text-gray-600">DNI o Cedula</Form.Label>
                            <Form.Control asChild>
                                <input
                                    id="dni"
                                    type="text"
                                    placeholder="00.000.000"
                                    {...register("dni")}
                                />
                            </Form.Control>
                            <Form.Message>{errors.dni?.message}</Form.Message>
                        </Form.Field>

                        <Form.Field name="password">
                            <Form.Label className="text-sm text-gray-600">Contraseña</Form.Label>
                            <Form.Control asChild>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Contraseña"
                                    {...register("password")}
                                />
                            </Form.Control>
                            <Form.Message>{errors.password?.message}</Form.Message>
                        </Form.Field>

                        <Form.Field name="confirmPassword">
                            <Form.Label className="text-sm text-gray-600">Repetir contraseña</Form.Label>
                            <Form.Control asChild>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Repetir contraseña"
                                    {...register("confirmPassword")}
                                />
                            </Form.Control>
                            <Form.Message>{errors.confirmPassword?.message}</Form.Message>
                        </Form.Field>

                        <Button
                            type="submit"
                            className="w-full bg-[#0052CC] hover:bg-[#0052CC]/90 text-white"
                        >
                            Registrate
                        </Button>
                        <div className='flex justify-center'>
                            <SignIn />
                        </div>
                    </Form.Root>
                </div>
            </div>
        </div>
    );
}
