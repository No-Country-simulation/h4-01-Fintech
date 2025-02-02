import DepositForm from '@/components/forms/DeposiForm'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Flex, Section, Card, Text, IconButton, Heading} from '@radix-ui/themes'
import React from 'react'

export default function page() {
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6">
                {/* Columna de Opciones de Pago */}
                <div className='gap-2 mb-4'>
                  <Card className="max-w-md mx-auto p-6 shadow-lg border border-gray-100">
                        <Flex direction="column" gap="4" align="center">
                            <Flex align="center" gap="3">
                                <IconButton variant="soft" radius="full" className="bg-indigo-50">
                                    <InfoCircledIcon className="text-indigo-500" width="20" height="20" />
                                </IconButton>
                                <Heading size="5" weight="bold" className="text-indigo-600">
                                    Actualmente estamos trabajando en las diferentes opciones para que puedas comenzar a invertir y comprar activos
                                </Heading>
                            </Flex>
                            <Text size="3" color="gray" align="center" className="text-gray-600">
                                En este emulador, solo ingresa la cantidad que deseas sumar a tu balance. ¡Nosotros nos encargaremos de lo demás!
                            </Text>
                        </Flex>
                    </Card>
                    <div className='mt-4'>
                      <DepositForm />
                    </div>
                </div>
    
                {/* Balance */}
                <div className="relative w-full h-64 md:h-auto">
                    
                </div>
            </div>
    </Section>
  )
}
