import { z } from "zod";

export const registrationSchema = z
  .object({
    email: z.string().email("Debe ser un correo electrónico válido."),
    fullName: z.string().min(1, "El nombre completo es obligatorio."),
    dni: z
      .string()
      .min(8, "El DNI debe tener al menos 8 caracteres.")
      .max(11, "El DNI debe tener como máximo 11 caracteres.")
      .regex(/^(?!0{2,})[0-9]+$/, "El DNI debe ser un número válido."),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .max(30, "La contraseña no puede tener más de 30 caracteres.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_])[^\s]+$/,
        "La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial."
      ),
    confirmPassword: z
      .string()
      .min(8, "La confirmación de contraseña es obligatoria."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"], // Apunta al campo problemático
  });
