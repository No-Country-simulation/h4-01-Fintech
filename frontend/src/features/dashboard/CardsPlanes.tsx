import React from 'react';
import CardPlaness from '@/components/common/CardPlanes';
import { Grid,  Text } from '@radix-ui/themes';

const cardsData = [
    {
        title: 'Proceso 100% online:',
        description: 'Registra tus metas y comienza a invertir desde cualquier dispositivo, sin papeleos ni filas.',
        iconPath: '/icons/online.svg',
    },
    {
        title: 'Protegemos tu información:',
        description: 'Cumplimos con los más altos estándares de seguridad y privacidad.',
        iconPath: '/icons/llave.svg',
    },
    {
        title: 'Transparencia total:',
        description: 'Sin costos ocultos ni sorpresas; sabrás exactamente dónde está tu dinero.',
        iconPath: '/icons/Frame.svg',
    },
    {
        title: 'Rendimientos personalizados:',
        description: 'Ajustamos las estrategias según tus necesidades y tolerancia al riesgo.',
        iconPath: '/icons/trueno.svg',
    },
    {
        title: 'Beneficios destacados:',
        description: 'Análisis continuo de mercado adaptado a tus metas.',
        iconPath: '/icons/files.svg',
    },
    {
        title: 'Notificaciones motivacionales:',
        description: 'Recibe recordatorios para mantener el enfoque.',
        iconPath: '/icons/pc.svg',
    },
];

const CardsPLanes: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center gap-8 mx-auto px-4 sm:px-6 lg:px-8">
            <Text size="9" weight="bold" className="text-center text-[#002a4d] capitalize">
                Planes de ahorro e Inversión
            </Text>
            <Grid
                className="w-full grid justify-items-center"
                columns={{
                    xs: '1', // 1 columna en pantallas pequeñas
                    sm: '2', // 2 columnas en pantallas medianas
                    lg: '3', // 3 columnas en pantallas grandes
                }}
                gap="6"
            >
                {cardsData.map((card, index) => (
                    <CardPlaness
                        key={index}
                        title={card.title}
                        description={card.description}
                        iconPath={card.iconPath}
                    />
                ))}
            </Grid>
        </div>
    );
};

export default CardsPLanes;
