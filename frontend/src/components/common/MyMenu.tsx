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
    HomeIcon
} from '@radix-ui/react-icons';
import { MyAvatar } from './myAvatar';
import { DropdownMenu } from "radix-ui";
import { getUnreadCount } from '@/services/notifications';

export default function MyMenu() {
    const { data: session } = useSession();
    const router = useRouter();
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const userId = session?.user.id as string

    useEffect(() => {
        const fetchCount = async () => {
            const count = await getUnreadCount(userId);
            setUnreadCount(count);
        };

        fetchCount();
    }, [userId]);

    async function fetchUnreadCount(userId: string): Promise<{ unreadCount: number }> {
        // Replace this with your actual API call
        return { unreadCount: 5 }; // Example response
    }

    if (session?.user) {
        return (
            <DropdownMenu.Root>
                {/* Trigger: Avatar con notificación */}
                <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer relative">
                        {session?.user?.image ? (
                            <>
                                <MyAvatar />
                                {/* Notificación de mensaje */}
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

                {/* Contenido del menú */}
                <DropdownMenuContent className="min-w-[220px] bg-white rounded-md shadow-lg z-50">
                    {/* Opciones del menú */}
                    <DropdownMenuItem
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                        <HomeIcon href='/' />
                        Inicio
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                        <PersonIcon href='/dashboard' />
                        Ir a Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                        <QuestionMarkCircledIcon href='/ayuda'/>
                        Ayuda
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                        <GearIcon href='/soporte' />
                        Soporte Técnico
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                        <RocketIcon href='/planes'/>
                        Planes y Ahora
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                        <EnvelopeClosedIcon href='/dashboard/mensajes'/>
                        Mensajes
                        {unreadCount > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                {unreadCount}
                            </span>
                        )}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                        <FileTextIcon href='/dashboard/blog'/>
                        Educación Financiera
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />

                    {/* Submenú para más opciones */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                            <ChatBubbleIcon />
                            Proximamente
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="min-w-[220px] bg-white rounded-md shadow-lg z-50">
                            <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer">
                                Noticias
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer">
                                Bonus
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />

                    {/* Cerrar sesión */}
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
    return null;
}