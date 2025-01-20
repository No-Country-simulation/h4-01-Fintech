'use client'
import { useSession } from "next-auth/react";
// import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";


export default function AvatarUser() {
    const { data: session } = useSession()

    if (!session?.user?.image) return null
    return (
        <Avatar>
            <AvatarImage src={session.user.image} />
            <AvatarFallback>{session.user.name} || &apos;Iupi&apos;</AvatarFallback>
        </Avatar>
    )
}