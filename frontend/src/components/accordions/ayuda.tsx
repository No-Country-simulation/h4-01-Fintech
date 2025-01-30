'use client'
import { ScrollArea } from "@radix-ui/themes";
// components/FinancialAdviceFilter.tsx
import { useState } from "react";

interface Advice {
    title: string;
    advice: string;
}

const adviceData = [
  {
    title: "Define tus objetivos financieros",
    advice: "Antes de invertir, piensa en tus metas: ¿Quieres ahorrar para un auto, una casa o para tu jubilación? Definir un objetivo claro te ayudará a elegir el mejor camino de inversión."
  },
  {
    title: "Conoce tu perfil de riesgo",
    advice: "Saber si eres conservador, moderado o arriesgado te permitirá construir una cartera que se ajuste a tu tolerancia al riesgo y te haga sentir cómodo."
  },
  {
    title: "Diversifica tus inversiones",
    advice: "Nunca pongas todos los huevos en una misma canasta. Combina acciones, bonos y fondos puede reducir riesgos y mejorar rendimientos."
  },
  {
    title: "Invierte con un horizonte temporal",
    advice: "Define cuánto tiempo puedes mantener tu dinero invertido. Para objetivos a largo plazo, las acciones suelen ser una mejor opción; para el corto plazo, los bonos pueden ser más adecuados."
  },
  {
    title: "Reinvierta los rendimientos",
    advice: "Aprovecha el poder del interés compuesto reinvirtiendo los intereses o dividendos que obtengas. ¡Verás crecer tu dinero más rápido!"
  },
  {
    title: "Evita decisiones emocionales",
    advice: "Los mercados fluctúan. Mantén la calma durante periodos de volatilidad y evita vender impulsivamente cuando veas caídas."
  },
  {
    title: "Comienza con poco, pero comienza",
    advice: "No necesitas una gran cantidad de dinero para invertir. Da el primer paso, aunque sea pequeño, para que tu dinero empiece a trabajar para ti."
  },
  {
    title: "Estudia antes de invertir en acciones",
    advice: "Investiga sobre las empresas en las que planeas invertir: ¿Son rentables? ¿Tienen un buen historial? ¿Qué dicen los analistas?"
  },
  {
    title: "Considera los bonos para estabilidad",
    advice: "Los bonos suelen ser menos riesgosos que las acciones. Son una buena opción para proteger parte de tu cartera."
  },
  {
    title: "Aprovecha los CEDEARs",
    advice: "Los CEDEARs te permiten invertir en empresas y ETFs internacionales desde Argentina. ¡Una gran opción para diversificar globalmente!"
  },
  {
    title: "Infórmate sobre comisiones",
    advice: "Antes de invertir, revisa las comisiones que cobrarán los brokers o las plataformas. Estas pueden impactar en tus rendimientos."
  },
  {
    title: "Monitorea tus inversiones regularmente",
    advice: "Mantente al tanto de cómo evolucionan tus inversiones, pero evita revisarlas obsesivamente. Una vez al mes puede ser suficiente."
  },
  {
    title: "Usa simuladores antes de invertir",
    advice: "Antes de arriesgar tu dinero, usa simuladores para ver cómo funcionarían diferentes escenarios de inversión."
  },
  {
    title: "Consulta sobre fondos mutuos",
    advice: "Los fondos mutuos son gestionados por profesionales y te permiten acceder a carteras diversificadas sin necesidad de experiencia previa."
  },
  {
    title: "Aprende sobre ETFs (fondos indexados)",
    advice: "Los ETFs suelen ser más baratos y tienen buen rendimiento a largo plazo al replicar índices como el S&P 500 o el Nasdaq-100."
  },
  {
    title: "Ten un fondo de emergencia aparte",
    advice: "Antes de invertir, asegúrate de tener un fondo de emergencia con 3-6 meses de gastos para imprevistos."
  },
  {
    title: "Evita endeudarte para invertir",
    advice: "Nunca uses préstamos o tarjetas de crédito para comprar activos financieros. Podrías terminar pagando más intereses que los rendimientos obtenidos."
  },
  {
    title: "Mantén tus costos bajos",
    advice: "Minimizar comisiones, impuestos y otros costos asociados a las inversiones es clave para maximizar tus retornos."
  },
  {
    title: "Revisa los riesgos de cada inversión",
    advice: "Comprender los riesgos de acciones, bonos y fondos te permitirá tomar decisiones informadas y evitar sorpresas desagradables."
  },
  {
    title: "La paciencia es clave",
    advice: "Las inversiones a largo plazo tienden a superar los rendimientos a corto plazo. ¡Sé constante y deja que el tiempo haga su magia!"
  }
];


const FinancialAdviceFilter = () => {
    const [search, setSearch] = useState<string>("");
    const [filteredAdvice, setFilteredAdvice] = useState<Advice[]>(adviceData);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearch(query);

        // Filtramos los títulos y consejos sin importar mayúsculas, minúsculas ni acentos
        const filtered = adviceData.filter(({ title, advice }) => {
            const lowercasedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return (
                title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(lowercasedQuery) ||
                advice.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(lowercasedQuery)
            );
        });

        setFilteredAdvice(filtered);
    };

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Buscar consejos financieros..."
                className="border p-2 mb-4 w-full"
            />
            <ScrollArea type="always" scrollbars="vertical" style={{ height: 400 , width: 900 }}>
                <div>
                    {filteredAdvice.map((item, index) => (
                        <div key={index} className="mb-4">
                            <h2 className="font-bold">{item.title}</h2>
                            <span>{item.advice}</span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

export default FinancialAdviceFilter;