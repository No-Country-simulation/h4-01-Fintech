'use client'
import { useSession } from "next-auth/react";
// import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function UserAvatar() {
    const { data: session } = useSession()

    if (!session?.user?.image) return null
    return (
        <Avatar>
            <AvatarImage src={session.user.image} />
            <AvatarFallback>{session.user.name} || &apos;Iupi&apos;</AvatarFallback>
        </Avatar>
    )

    // return (
    //     <div>
    //         <Image src={session.user.image} alt="User Avatar" width={80} height={80}/>
    //     </div>
    // )
}