'use client';
import * as React from "react";
import classNames from "classnames";
import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { getUSer, UserData } from "@/services/userService";
import { useEffect } from "react";
import { Mailbox } from "../message/mailbox";

const AccordionProfile = () => {
    const { data: session } = useSession();
    const userId = session?.user.id;
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
            className="w-[600px] rounded-md bg-gray-700 shadow-lg border border-gray-700"
            type="single"
            defaultValue="item-1"
            collapsible
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h3 className="text-blue-400">Datos</h3>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="text-white">
                        Nombre: {session?.user.name}
                        <br />
                        DNI: {dni || "No disponible"}
                        <br />
                        Email: {session?.user.email}
                        <br />
                        Porcentaje de Riesgo: {riskPercentage ?? "No calculado"}
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>
                    <h3 className="text-blue-400">Inversiones</h3>
                </AccordionTrigger>
                <AccordionContent>
                    <p className="text-white">Inversiones</p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>
                    <h3 className="text-blue-400">Notificaciones</h3>
                </AccordionTrigger>
                <AccordionContent>
                    {userId && <Mailbox userId={userId} />}
                </AccordionContent>
            </AccordionItem>
        </Accordion.Root>
    );
};

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof Accordion.Item> {
    children: React.ReactNode;
    className?: string;
}

const AccordionItem = React.forwardRef<React.ComponentRef<typeof Accordion.Item>, AccordionItemProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Item
            className={classNames(
                "mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 border-b border-gray-700",
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </Accordion.Item>
    ),
);

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof Accordion.Trigger> {
    children: React.ReactNode;
    className?: string;
}

const AccordionTrigger = React.forwardRef<React.ComponentRef<typeof Accordion.Trigger>, AccordionTriggerProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Header className="flex">
            <Accordion.Trigger
                className={classNames(
                    "group flex h-[45px] flex-1 cursor-pointer items-center justify-between bg-gray-700 px-5 text-[15px] leading-none text-blue-400 hover:bg-gray-700",
                    className,
                )}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <ChevronDownIcon
                    className="text-blue-400 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180"
                    aria-hidden
                />
            </Accordion.Trigger>
        </Accordion.Header>
    ),
);

interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof Accordion.Content> {
    children: React.ReactNode;
    className?: string;
}

const AccordionContent = React.forwardRef<React.ComponentRef<typeof Accordion.Content>, AccordionContentProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Content
            className={classNames(
                "overflow-hidden bg-gray-600 text-[15px] text-white data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            <div className="px-5 py-[15px]">{children}</div>
        </Accordion.Content>
    ),
);

export default AccordionProfile;
