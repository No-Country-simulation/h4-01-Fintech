'use client'
import { useQuestions } from "@/stores/useQuestions";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Box, Card, Text } from "@radix-ui/themes";

interface Props {
  id: number;
  name: string;
  category: string;
  riskLevel: number;
  price: number;
}

const RiskAssets = () => {
  const riskLevel = useQuestions((state) => state.riskPercentage);
  const [data, setData] = useState<Props[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (riskLevel === null) {
      setError("No se ha calculado el nivel de riesgo.");
      setLoading(false);
      return;
    }

    const fetchRiskAssets = async () => {
      try {
        const response = await fetch(`/api/assets/risk?riskLevel=${riskLevel}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Error al obtener activos");
        }

        const result: Props[] = await response.json();

        if (result.length === 0) {
          setError("No hay recomendaciones por el momento. Ajusta tus preferencias.");
        } else {
          setData(result);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRiskAssets();
  }, [riskLevel]);

  if (loading) return <p>Cargando activos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {riskLevel === null && (
        <Dialog.Root open>
          <Dialog.Trigger asChild>
            <button style={{ display: "none" }}></button>
          </Dialog.Trigger>
          <Dialog.Overlay
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          <Dialog.Content
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Dialog.Title style={{ fontSize: "18px", fontWeight: "bold" }}>
              ¡Nivel de riesgo no calculado!
            </Dialog.Title>
            <Dialog.Description style={{ marginBottom: "20px" }}>
              Parece que no has completado la encuesta para determinar tu nivel
              de riesgo. Por favor, completa la encuesta para ver los activos
              correspondientes.
            </Dialog.Description>
            <Link href="/encuesta" passHref>
              <button
                style={{
                  backgroundColor: "#0070f3",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                Ir a la encuesta
              </button>
            </Link>
          </Dialog.Content>
        </Dialog.Root>
      )}

      <div>
      <h2>Activos Recomendados</h2>
      <Box>
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((asset) => (
              <Card
                key={asset.id}
                className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200"
              >
                <Link href={`/dashboard/activos/${asset.id}/page`} passHref>
                    <Text size="4" weight="bold" className="text-indigo-600">
                      {asset.name}
                    </Text>
                    <Text size="3" className="text-gray-500">
                      Categoría: {asset.category}
                    </Text>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <p>No hay recomendaciones por el momento. Ajusta tus preferencias.</p>
        )}
      </Box>
    </div>
    </div>
  );
};

export default RiskAssets;
