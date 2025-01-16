'use client'
import Image from "next/image"
import styles from '@/app/ui/cards.module.css'
import { SignOut } from "../atoms/signout"
import { useSession } from "next-auth/react"

export  function UserCard() {
    const { data: session } = useSession()

    if (!session?.user) {
        return <div>No user is logged in</div>  // Si no hay sesión, mostramos un mensaje
    }

    return (
        <div className={styles.userCard}>
            <div className={styles.avatar}>
                {/* Mostrar el avatar, si está disponible */}
                {session.user.image ? (
                    <Image
                        src={session.user.image}
                        alt="User Avatar"
                        width={80}
                        height={80}
                    />
                ) : (
                    <div className={styles.placeholderAvatar}>No Avatar</div>  // Avatar de respaldo
                )}
            </div>
            <div className={styles.userInfo}>
                <p>Id : {session.user.id}</p>
                <p>Access_token : {session.user.access_token}</p>
                <p>Provider : {session.user.provider}</p>
                <p>Token : {session.user.token}</p>
                <h3>Nombre: {session.user.name}</h3>
                <p>Email : {session.user.email}</p>
            </div>
            <SignOut/>
        </div>
    )
}