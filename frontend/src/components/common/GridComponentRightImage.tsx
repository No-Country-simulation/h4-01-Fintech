import Image from "next/image";

interface GridComponentProps {
    title: string;
    paragraphs: string[];
    imageSrc: string;
    imageAlt: string;
}

export default function GridComponentRightImage({ title, paragraphs, imageSrc, imageAlt }: GridComponentProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6">
            {/* Columna de texto */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
                {paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-gray-600 mb-2">
                        {paragraph}
                    </p>
                ))}
            </div>

            {/* Columna de imagen */}
            <div className="relative w-full h-64 md:h-auto">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
}