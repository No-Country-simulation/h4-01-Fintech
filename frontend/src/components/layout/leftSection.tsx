import { Flex } from "@radix-ui/themes";


export const LeftSection = () => {
    return (
        <Flex
            direction="column"
            justify="center"
            align="start"
            className="bg-gradient-to-b from-[#005bbb] via-[#0c56bf] to-[#3281f0] text-white w-full h-full px-8 lg:px-12"
        >
            {/* Contenido principal */}
            <Flex direction="column" gap="4" className="max-w-md">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                    Facilitamos Tu
                    <br /> Ahorro E <br />
                    Inversión
                </h1>
                <h2 className="text-lg lg:text-xl">
                    Haz crecer tu dinero con estrategias personalizadas
                </h2>
                <p className="text-sm lg:text-lg opacity-90">
                    Define tus metas financieras y comienza a invertir hoy mismo, sin complicaciones.
                </p>
            </Flex>

            {/* Texto adicional */}
            <Flex justify="start" className="mt-8">
                <span className="text-xl lg:text-2xl font-bold">iUpi</span>
            </Flex>
        </Flex>
    );
};
