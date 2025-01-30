import React from 'react';
import { Text } from '@radix-ui/themes';
import { CardStack } from '@/components/aceternity/card-stack';

const cardsDataForStack = [
    {
        id: 1,
        name: 'Proceso 100% online',
        designation: 'Registra tus metas y comienza a invertir desde cualquier dispositivo, sin papeleos ni filas.',
        iconPath: '/icons/online.svg',
    },
    {
        id: 2,
        name: 'Protegemos tu información',
        designation: 'Cumplimos con los más altos estándares de seguridad y privacidad.',
        iconPath: '/icons/llave.svg',
    },
    {
        id: 3,
        name: 'Transparencia total',
        designation: 'Sin costos ocultos ni sorpresas; sabrás exactamente dónde está tu dinero.',
        iconPath: '/icons/Frame.svg',
    },
    {
        id: 4,
        name: 'Rendimientos personalizados',
        designation: 'Ajustamos las estrategias según tus necesidades y tolerancia al riesgo.',
        iconPath: '/icons/trueno.svg',
    },
    {
        id: 5,
        name: 'Beneficios destacados',
        designation: 'Análisis continuo de mercado adaptado a tus metas.',
        iconPath: '/icons/files.svg',
    },
    {
        id: 6,
        name: 'Notificaciones motivacionales',
        designation: 'Recibe recordatorios para mantener el enfoque.',
        iconPath: '/icons/pc.svg',
    },
];

const CardsPLanes: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 gap-8">
            <div className="p-4 m-4 justify-center text-justify">
                <Text size="9" weight="bold" className="text-center text-[#002a4d] capitalize mb-10">
                    Planes de ahorro e Inversión
                </Text>
            </div>
            <div className="flex justify-center justify-items-center m-6">
                <CardStack items={cardsDataForStack} reverse={true} />
            </div>
        </div>
    );
};

export default CardsPLanes;