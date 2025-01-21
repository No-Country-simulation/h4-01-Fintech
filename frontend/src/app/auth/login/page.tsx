"use client";

import Link from "next/link";
import { Button } from "@/components/common/button";
import { LeftSection } from "@/components/layout/leftSection";
import { Input } from "@/components/common/input";
import { signIn } from "next-auth/react"; // Importación correcta de NextAuth
import { FormEvent, useState } from "react";

export default function Login() {
  // Estado para capturar email y contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Función que maneja el envío del formulario
  const credentialsAction = async (e: FormEvent) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Cambia esto si necesitas redirigir automáticamente
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <LeftSection />
      <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col">
        <div className="flex justify-end mb-8">
          <div className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="text-[#0052CC] hover:underline">
              Inicia sesión
            </Link>
          </div>
        </div>
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Inicia Sesión</h2>
          <form onSubmit={credentialsAction} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-600">
                Mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Maneja el cambio de estado
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-600">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Maneja el cambio de estado
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#0052CC] hover:bg-[#0052CC]/90 text-white"
            >
              Login
            </Button>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="group relative">
                <Link href="/auth/renoverpassword">Olvidé mi contraseña</Link>
                <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-slate-600 transition-all duration-300 group-hover:w-full"></div>
              </div>
              <div className="justify-center pt-4">
                {/* Aquí puedes integrar SignIn si es necesario */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
