'use client';

import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button, Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const WelcomeDialog = () => {
    const {data:session} = useSession();
    const router = useRouter();

    if(!session || session?.user.risk_percentage === null)
    return (
        <AlertDialog.Root defaultOpen>
            <AlertDialog.Trigger asChild>
                <Button>Ser Inversionista</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: '450px', padding: '20px' }}>
                <AlertDialog.Title>¡Bienvenido!</AlertDialog.Title>
                <AlertDialog.Description style={{ fontSize: '16px', margin: '10px 0' }}>
                    Nos gustaría conocer más sobre ti. Por favor, responde estas preguntas para personalizar tu perfil.
                </AlertDialog.Description>

                {/* Aquí agregaremos preguntas más adelante */}
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Action>
                        <Button onClick={() => router.push('/')}  variant="solid" color="blue">
                            Comenzar
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );

    return null
};

export default WelcomeDialog;
