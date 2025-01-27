'use client'
import * as React from "react";
import classNames from "classnames";
import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";


const AccordionProfile = () => {
    const { data: session } = useSession();
    return (
        <Accordion.Root
            className="w-[600px] rounded-md bg-mauve6 shadow-[0_2px_10px] shadow-black/5"
            type="single"
            defaultValue="item-1"
            collapsible
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Datos</AccordionTrigger>
                <AccordionContent>
                    <div>
                        Nombre: {session?.user.name}
                        <br />
                        Email: {session?.user.email}
                        <br />
                        Porcentaje de Riesgo: {session?.user.risk_percentage}
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>Inversiones</AccordionTrigger>
                <AccordionContent>
                    Inversiones
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>Notificaciones</AccordionTrigger>
                <AccordionContent>
                    Notificaciones
                </AccordionContent>
            </AccordionItem>
        </Accordion.Root>
    );
};

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof Accordion.Item> {
    children: React.ReactNode;
        className?: string;
    }

const AccordionItem = React.forwardRef<React.ElementRef<typeof Accordion.Item>, AccordionItemProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Item
            className={classNames(
                "mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px] focus-within:shadow-mauve12",
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
                    "group flex h-[45px] flex-1 cursor-default items-center justify-between bg-mauve1 px-5 text-[15px] leading-none text-violet11 shadow-[0_1px_0] shadow-mauve6 outline-none hover:bg-mauve2",
                    className,
                )}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <ChevronDownIcon
                    className="text-violet10 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
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
                "overflow-hidden bg-gray-900 text-[15px] text-slate-300 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
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
