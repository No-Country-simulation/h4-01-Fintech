import { env } from "@/constants/envs";

export const VerifyEmailService = {
  async get(token: string) {
    try {
      const response = await fetch(
        `${env.API_URL}/api/auth/validate/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error desconocido");
      }
      return result; // Devuelve el resultado para manejarlo en el frontend
    } catch (error: unknown) {
      console.error("Error en la validación del token:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado",
      };
    }
  },
};
