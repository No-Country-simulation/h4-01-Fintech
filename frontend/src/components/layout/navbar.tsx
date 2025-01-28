'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '@radix-ui/themes';
import MyMenu from '@/components/common/MyMenu';
import { Container, Flex, Skeleton } from '@radix-ui/themes'

export default function Navbar() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Container size="2">
            <Flex direction="column" height={"3"}>
                <Skeleton/>
            </Flex>
        </Container>;
    }

    return (
        <div className="w-full h-auto md:h-20 px-4 md:px-8 lg:px-12 py-4 md:py-[18px] bg-white flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="w-full max-w-7xl mx-auto justify-between items-center flex">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-8 transition-transform duration-200 hover:scale-105">
                    <span className="text-[#0049b0] text-4xl md:text-5xl lg:text-6xl font-bold">iUpi</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1 items-center justify-between ml-12">
                    <ul className="flex justify-start items-center gap-11">
                        {['#invertir', '#quienes-somos', '#planes-ahorro', '#educacion-financiera'].map((href, index) => (
                            <li key={index}>
                                <Link
                                    href={href}
                                    className="text-[#002a4d] text-base font-medium transition-all duration-200 hover:text-[#0049b0] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#0049b0] after:left-0 after:-bottom-1 after:transition-all after:duration-200 hover:after:w-full"
                                >
                                    {href.replace('#', '').replace('-', ' ').toUpperCase()}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {session?.user ? (
                        <div className="flex items-center gap-3">
                            <MyMenu />
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                                <Link href="/auth/login" prefetch={false}  className="px-5 py-3 bg-white rounded-lg hover:bg-gray-50 shadow">
                                Inicia sesión
                            </Link>
                            <Link href="/auth/register" className="px-5 py-3 bg-[#0049b0] text-white rounded-lg hover:bg-[#003d8f] shadow">
                                Regístrate
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='ghost'>
                                <MyMenu />
                                <span className="sr-only">Abrir menú</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg">
                            <DialogTitle></DialogTitle>

                            <div className="flex flex-col p-4">
                                <div className="flex flex-col gap-4 mt-8">
                                    {session?.user ? (
                                        <button onClick={() => signOut()} className="w-full px-5 py-3 bg-red-500 text-white rounded-lg">
                                            Cerrar sesión
                                        </button>
                                    ) : (
                                        <>
                                            <Link href="/auth/login" className="w-full px-5 py-3 bg-white border border-[#0049b0] rounded-lg hover:bg-gray-50">
                                                Inicia sesión
                                            </Link>
                                            <Link href="/auth/register" className="w-full px-5 py-3 bg-[#0049b0] text-white rounded-lg hover:bg-[#003d8f]">
                                                Regístrate
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}