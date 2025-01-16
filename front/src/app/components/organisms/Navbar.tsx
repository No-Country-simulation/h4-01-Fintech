'use client'
import { signOut, useSession } from "next-auth/react"
import styles from '@/app/ui/cards.module.css'
import { UserCard } from "../molecules/UserCard"
import SignIn from "../atoms/signin"

export function Navbar() {
    const { data: session } = useSession()

    if (!session?.user) return (<>
        <SignIn />
    </>)

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <>
                    <UserCard />
                    <button onClick={() => signOut()} className={styles.signOutButton}>
                        Sign Out
                    </button>
                </>
            </div>
        </nav>
    )
}
