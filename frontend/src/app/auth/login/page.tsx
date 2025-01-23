"use client";

import Link from "next/link";
import { Button } from "@/components/common/button";
import { LeftSection } from "@/components/layout/leftSection";
import { Input } from "@/components/common/input";
import { signIn } from "next-auth/react"; // Importación correcta de NextAuth
import { FormEvent, useState } from "react";
import SignIn from "@/features/auth/signin";
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const credentialsAction = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log("Inicio de sesión exitoso:", result);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#005bbb] hover:bg-[#005bbb]/90 text-white rounded-lg"
            >
              Iniciar sesión
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
