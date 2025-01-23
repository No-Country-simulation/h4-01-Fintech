'use client';

import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button, Flex } from '@radix-ui/themes';

const WelcomeDialog = () => {
    return (
        <AlertDialog.Root defaultOpen>
            <AlertDialog.Trigger asChild>
                <></> {/* No queremos que aparezca el botón trigger porque será automático */}
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: '450px', padding: '20px' }}>
                <AlertDialog.Title>¡Bienvenido!</AlertDialog.Title>
                <AlertDialog.Description style={{ fontSize: '16px', margin: '10px 0' }}>
                    Nos gustaría conocer más sobre ti. Por favor, responde estas preguntas para personalizar tu perfil.
                </AlertDialog.Description>

                {/* Aquí agregaremos preguntas más adelante */}
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Action>
                        <Button variant="solid" color="blue">
                            Comenzar
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default WelcomeDialog;
