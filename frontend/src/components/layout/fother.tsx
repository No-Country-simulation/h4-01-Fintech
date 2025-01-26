import { Button, Flex, Link } from '@radix-ui/themes';
import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <Flex direction="column" className="bg-gray-900 text-white p-6">
            {/* Sección superior */}
            <Flex justify="between" align="center" className="pb-6 border-b border-gray-700">
                <Flex direction="column" gap="2">
                    <div className="text-xl font-semibold text-[#f5f5f6]">IUPI</div>
                    <div className="text-base font-normal text-[#f5f5f6]">La app que conecta tus metas con resultados y Facilitamos tu ahorro e inversión</div>
                </Flex>
                <Button variant='classic' size={"3"} className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600">
                    Comenzar a invertir
                </Button>
            </Flex>

            {/* Sección media */}
            <Flex justify="between" className="py-6 border-b border-gray-700">
                <Flex direction="column" gap="4">
                    <Image src='/logo/logo.png' alt='logo' width={120} height={120}/>
                </Flex>
                <Flex gap="8">
                    <Flex direction="column" gap="4">
                        <Link href='' className="text-sm font-normal text-[#f5f5f6]">Producto</Link>
                        <Flex direction="column" gap="3">
                            <Link href='/' className="text-base font-medium text-[#f5f5f6]">Inicio</Link>
                            <Link href='' className="text-base font-medium text-[#f5f5f6]">Simular inversión</Link>
                            <Link href='' className="text-base font-medium text-[#f5f5f6]">Educación financiera</Link>
                            <Link href='' className="text-base font-medium text-[#f5f5f6]">Términos y condiciones</Link>
                        </Flex>
                    </Flex>
                    <Flex direction="column" gap="4">
                        <Link href='' className="text-sm font-normal text-[#f5f5f6]">Legales</Link>
                        <Flex direction="column" gap="3">
                            <Link href='' className="text-base font-medium text-[#f5f5f6]">Términos</Link>
                            <Link href='' className="text-base font-medium text-[#f5f5f6]">Privacidad</Link>
                            <Link href='' className="text-base font-medium text-[#f5f5f6]">Cookies</Link>
                            <Link href='' className="text-base font-medium text-[#f5f5f6]">Licencias</Link>
                            <Link href='' className="text-base font-medium text-[#f5f5f6]">Ajustes</Link>
                            <Link href='' className="text-base font-medium text-[#f5f5f6]">Contacto</Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            {/* Sección inferior */}
            <Flex justify="between" align="center" className="pt-6">
                <div className="text-base font-normal text-[#f5f5f6]">© 2025 iUpi - Todos los derechos reservados.</div>
                <Flex gap="6">
                    {/* Aquí puedes agregar tus íconos */}
                    <Image src="/icons/instegram.svg" alt="Instegra" width={16} height={16} />
                    <Image src="/icons/linkedin.svg" alt="Linkedin" width={16} height={16} />
                    <Image src="/icons/facebook.svg" alt="Facebbok" width={16} height={16} />
                    <Image src="/icons/aroba.svg" alt="@" width={16} height={16} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Footer;