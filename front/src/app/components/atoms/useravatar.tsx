'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
// import Image from "next/image";


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