import React from 'react';

interface CardProps {
    title: string;
    description: string;
    iconPath: string; // Ruta del ícono en la carpeta public
}

const CardPlaness: React.FC<CardProps> = ({ title, description, iconPath }) => {
    return (
        <div className="w-96 h-[189px] px-6 py-3 bg-[#dddddd] rounded-lg flex-col justify-start items-start gap-4 inline-flex">
            <div className="w-6 h-6 relative overflow-hidden">
                <img src={iconPath} alt={`${title} icon`} className="w-full h-full" />
            </div>
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="text-[#002a4d] text-lg font-bold font-['Inter']">{title}</div>
                <div className="text-[#002a4d] text-base font-normal font-['Inter']">{description}</div>
            </div>
        </div>
    );
};

export default CardPlaness;
