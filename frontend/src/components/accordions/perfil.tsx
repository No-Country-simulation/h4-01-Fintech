'use client';

import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Accordion from "@radix-ui/react-accordion";
import { useSession } from "next-auth/react";
import { getUSer, UserData } from "@/services/userService";
import { useEffect } from "react";
import { Mailbox } from "../message/mailbox";

const AccordionProfile = () => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [dni, setDni] = React.useState<string | null>(null);
    const [riskPercentage, setRiskPercentage] = React.useState<number | null>(null);

    useEffect(() => {
        const fetchDataUser = async (userId: string) => {
            try {
                const resp: UserData = await getUSer(userId);
                if (resp) {
                    setRiskPercentage(resp.risk_percentage);
                    setDni(resp.dni);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userId) {
            fetchDataUser(userId);
        }
    }, [userId]);

    return (
        <Accordion.Root
            className="w-full max-w-lg mx-auto rounded-xl bg-slate-100 shadow-lg border border-slate-300 p-2"
            type="single"
            defaultValue="item-1"
            collapsible
        >
            <AccordionItem value="item-1" title="Datos">
                <div className="text-slate-700">
                    <p><strong>Nombre:</strong> {session?.user?.name || "No disponible"}</p>
                    <p><strong>DNI:</strong> {dni || "Ingresaste con Google. Debes actualizar tus datos."}</p>
                    <p><strong>Email:</strong> {session?.user?.email}</p>
                </div>
            </AccordionItem>

            <AccordionItem value="item-2" title="Inversiones">
                <p className="text-slate-700">Aquí verás tus inversiones.</p>
            </AccordionItem>

            <AccordionItem value="item-3" title="Notificaciones">
                {userId && <Mailbox userId={userId} />}
            </AccordionItem>
        </Accordion.Root>
    );
};

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof Accordion.Item> {
    title: string;
    children: React.ReactNode;
}

const AccordionItem = React.forwardRef<React.ComponentRef<typeof Accordion.Item>, AccordionItemProps>(
    ({ title, children, ...props }, forwardedRef) => (
        <Accordion.Item
            ref={forwardedRef}
            className="mt-1 overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm focus-within:relative focus-within:z-10"
            {...props}
        >
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>{children}</AccordionContent>
        </Accordion.Item>
    ),
);

const AccordionTrigger = React.forwardRef<
    React.ComponentRef<typeof Accordion.Trigger>,
    React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
        <Accordion.Trigger
            ref={forwardedRef}
            className="group flex w-full items-center justify-between px-4 py-3 text-lg font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-md transition"
            {...props}
        >
            {children}
            <ChevronDownIcon
                className="text-slate-500 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180"
                aria-hidden
            />
        </Accordion.Trigger>
    </Accordion.Header>
));

const AccordionContent = React.forwardRef<
    React.ComponentRef<typeof Accordion.Content>,
    React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, ...props }, forwardedRef) => (
    <Accordion.Content
        ref={forwardedRef}
        className="overflow-hidden bg-slate-50 text-slate-600 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown"
        {...props}
    >
        <div className="px-4 py-3">{children}</div>
    </Accordion.Content>
));

export default AccordionProfile;
