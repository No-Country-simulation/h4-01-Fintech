'use client';

import { Button } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function SignIn() {
    return (
        <div className="px-6 sm:px-0 max-w-sm flex flex-col space-y-4 justify-center items-center">
            {/* Botón de Google */}
            <Button
                color="gray" variant="soft"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                type="button"
                className="w-full text-black hover:bg-[#dedddd]/90 focus:ring-4 focus:outline-none focus:ring-[#dedddd]/50 font-medium rounded-lg text-sm sm:text-base px-4 py-2 sm:py-3 flex items-center justify-center space-x-2"
            >
                <FcGoogle className="text-lg sm:text-xl" />
                <span>Iniciar sesión con Google</span>
            </Button>

            {/* Botón de Apple */}
            <Button
                color="gray" variant="soft"
                onClick={() => signIn("apple", { callbackUrl: "/" })}
                type="button"
                disabled={true}
                className="w-full text-black hover:bg-[#dedddd]/90 focus:ring-4 focus:outline-none focus:ring-[#dedddd]/50 font-medium rounded-lg text-sm sm:text-base px-4 py-2 sm:py-3 flex items-center justify-center space-x-2"
            >
                <FaApple className="text-lg sm:text-xl" />
                <span>Iniciar sesión con Apple</span>
            </Button>
        </div>
    );
}
