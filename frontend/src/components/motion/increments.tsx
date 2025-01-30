"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

interface Props {
    counts: number; 
    duration: number; 
}

export default function AnimatedNumber({ counts, duration }: Props) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (value) => Math.round(value));

    useEffect(() => {
        const controls = animate(count, counts, { duration }); 
        return () => controls.stop(); 
    }, [counts, duration]); 

    return <motion.pre>{rounded}</motion.pre>; 
}
