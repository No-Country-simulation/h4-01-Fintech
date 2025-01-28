'use client';

import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import {
    PersonIcon,
    QuestionMarkCircledIcon,
    GearIcon,
    EnvelopeClosedIcon,
    FileTextIcon,
    ExitIcon,
    RocketIcon,
    ChatBubbleIcon,
    HomeIcon,
    HamburgerMenuIcon,
    LockClosedIcon,
    Pencil1Icon

} from '@radix-ui/react-icons';
import { MyAvatar } from './myAvatar';
import { DropdownMenu } from "radix-ui";
import { getUnreadCount } from '@/services/notifications';
import Login from '../../app/auth/login/page';

export default function MyMenu() {
    const { data: session } = useSession();
    const router = useRouter();
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const userId = session?.user?.id as string;

    useEffect(() => {
        if (!userId) return;

        const fetchCount = async () => {
            try {
                const count = await getUnreadCount(userId);
                setUnreadCount(count);
            } catch (error) {
                console.error('Error fetching unread count:', error);
            }
        };

        fetchCount();
    }, [userId]);

    // Si el usuario NO está autenticado
    if (!session?.user) {
        return (
            <DropdownMenu.Root>
                <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer">
                        <HamburgerMenuIcon className="w-6 h-6" />
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="min-w-[220px] bg-white rounded-md shadow-lg z-50">
                    <DropdownMenuItem
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                        onClick={() => router.push('/')}
                    >
                        <HomeIcon />
                        Inicio
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                        onClick={() => router.push('/auth/login')}
                    >
                        <LockClosedIcon/>
                        Iniciar Sesión
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                        onClick={() => router.push('/auth/register')}
                    >
                        <Pencil1Icon/>
                        Registrarse
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                        onClick={() => router.push('/planes')}
                    >
                        <RocketIcon />
                        Planes
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                        onClick={() => router.push('/ayuda')}
                    >
                        <QuestionMarkCircledIcon />
                        Ayuda
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu.Root>
        );
    }

    // Si el usuario ESTÁ autenticado
    return (
        <DropdownMenu.Root>
            <DropdownMenuTrigger asChild>
                <div className="cursor-pointer relative">
                    {session?.user?.image ? (
                        <>
                            <MyAvatar />
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </>
                    ) : (
                        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">
                            {session?.user?.name?.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-[220px] bg-white rounded-md shadow-lg z-50">
                <DropdownMenuItem
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={() => router.push('/')}
                >
                    <HomeIcon />
                    Inicio
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={() => router.push('/dashboard')}
                >
                    <PersonIcon />
                    Ir a Perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={() => router.push('/ayuda')}
                >
                    <QuestionMarkCircledIcon />
                    Ayuda
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={() => router.push('/soporte')}
                >
                    <GearIcon />
                    Soporte Técnico
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={() => router.push('/planes')}
                >
                    <RocketIcon />
                    Planes y Ahora
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={() => router.push('/dashboard/mensajes')}
                >
                    <EnvelopeClosedIcon />
                    Mensajes
                    {unreadCount > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                            {unreadCount}
                        </span>
                    )}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={() => router.push('/dashboard/blog')}
                >
                    <FileTextIcon />
                    Educación Financiera
                </DropdownMenuItem>

                <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />

                <DropdownMenuItem
                    className="p-2 text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                    onClick={() => signOut()}
                >
                    <ExitIcon />
                    Cerrar sesión
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu.Root>
    );
}
