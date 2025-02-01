'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registrationSchema } from "@/app/validations/schemas";
import { z } from "zod";
import { Button } from "@radix-ui/themes";

type RegisterFormProps = {
    onSubmit: (data: RegisterValues) => void;
};

type RegisterValues = z.infer<typeof registrationSchema>;

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterValues>({
        resolver: zodResolver(registrationSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-600">Mail</label>
                <input id="email" type="email" placeholder="Mail" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Full Name */}
            <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm text-gray-600">Nombre completo</label>
                <input id="fullName" type="text" placeholder="Nombre completo" {...register("fullName")} />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>

            {/* DNI */}
            <div className="space-y-2">
                <label htmlFor="dni" className="text-sm text-gray-600">DNI o Cedula</label>
                <input id="dni" type="text" placeholder="00.000.000" {...register("dni")} />
                {errors.dni && <p className="text-red-500 text-sm">{errors.dni.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-gray-600">Contraseña</label>
                <input id="password" type="password" placeholder="Contraseña" {...register("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm text-gray-600">Repetir contraseña</label>
                <input id="confirmPassword" type="password" placeholder="Repetir contraseña" {...register("confirmPassword")} />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-[#0052CC] hover:bg-[#0052CC]/90 text-white">Registrate</Button>
        </form>
    );
};
