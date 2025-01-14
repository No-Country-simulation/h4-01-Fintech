'use client'
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function UserAvatar() {
    const { data: session } = useSession()

    if (!session?.user?.image) return null

    return (
        <div>
            <Image src={session.user.image} alt="User Avatar" width={80} height={80}/>
        </div>
    )
}