"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';

let interval: any;

type Card = {
    id: number;
    name: string;
    designation: string;
    iconPath: string;
};

export const CardStack = ({
    items,
    offset,
    scaleFactor,
    reverse = false, // Nueva prop para invertir la dirección
}: {
    items: Card[];
    offset?: number;
    scaleFactor?: number;
    reverse?: boolean; // Prop para controlar la dirección
}) => {
    const CARD_OFFSET = offset || 10;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState<Card[]>(reverse ? [...items].reverse() : items); // Invertir el orden si es necesario

    useEffect(() => {
        startFlipping();

        return () => clearInterval(interval);
    }, []);

    const startFlipping = () => {
        interval = setInterval(() => {
            setCards((prevCards: Card[]) => {
                const newArray = [...prevCards];
                if (reverse) {
                    newArray.push(newArray.shift()!); // Mover la primera tarjeta al final (descendente)
                } else {
                    newArray.unshift(newArray.pop()!); // Mover la última tarjeta al inicio (ascendente)
                }
                return newArray;
            });
        }, 5000);
    };

    return (
        <div className="flex justify-center items-center w-full">
            <div className="relative h-[400px] w-[250px] sm:h-[600px] sm:w-[300px] md:h-[500px] md:w-[400px]">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        className="absolute bg-white h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[300px] rounded-3xl p-4 shadow-xl border border-neutral-200 flex flex-col justify-between"
                        style={{
                            transformOrigin: "top center",
                        }}
                        animate={{
                            top: index * -CARD_OFFSET, // Aplicar el offset
                            scale: 1 - index * SCALE_FACTOR,
                            zIndex: cards.length - index,
                        }}
                    >
                        {/* Imagen arriba */}
                        <div className="flex justify-center">
                            {card.iconPath ? (
                                <Image
                                    src={card.iconPath}
                                    width={180}
                                    height={180}
                                    alt={card.name}
                                    // className="w-52 h-52 sm:w-18 sm:h-18 mb-6"
                                />
                            ) : (
                                <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span>No Image</span>
                                </div>
                            )}
                        </div>

                        {/* Nombre y Designación */}
                        <div className="text-center">
                            <p className="text-neutral-500 font-black text-sm sm:text-base">
                                {card.name}
                            </p>
                            <p className="text-neutral-400 font-extrabold text-xs sm:text-sm">
                                {card.designation}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};