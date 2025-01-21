"use client"

import { Button } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";


export default function SignIn() {
    return <div className="px-6 sm:px-0 max-w-sm justify-center justify-items-center">
        <Button
            onClick={() => signIn("google", { redirecto: "/" })}
            type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"> <FcGoogle />
            Iniciar seccion con Google <div></div></Button>
    </div>
}