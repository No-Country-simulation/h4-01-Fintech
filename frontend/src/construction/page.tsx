import Image from 'next/image';

const UnderConstruction = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
            <Image
                src="/logo/logo.png"
                alt="En construcción"
                width={200}
                height={200}
                className="mb-8"
            />
            <h1 className="text-3xl font-bold text-gray-700">Estamos trabajando en esto</h1>
            <p className="mt-4 text-lg text-gray-600">¡Vuelve pronto para más actualizaciones!</p>
        </div>
    );
};

export default UnderConstruction;
