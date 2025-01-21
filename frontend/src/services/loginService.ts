import { MyEnv } from "@/utils/envs"

// No tocar el nombre de las propiedades
interface PropsBody {
  email: string
  password: string
}

export const loginService = {
  async post(data: PropsBody) {
    try {
      const response = await fetch(`${MyEnv.API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      // Asegúrate de que la respuesta sea exitosa
      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.message || 'Error desconocido')
      }

      const result = await response.json()

      // Manejo de la respuesta con el nuevo formato
      if (result.status) {
        // Si el status es true, la creación fue exitosa
        return {
          success: true,
          message: result.message || 'Usuario registrado con éxito',
          data: result.data, // Los datos del usuario creado
        }
      } else {
        // Si el status es false, se muestra el mensaje de error
        return {
          success: false,
          message: result.message || 'Ocurrió un error inesperado',
        }
      }
    } catch (error: unknown) {
      // Verificación del tipo de error y acceso a message
      if (error instanceof Error) {
        return {
          success: false,
          message:
            error.message || 'Ocurrió un error inesperado. Inténtalo de nuevo.',
        }
      } else {
        return {
          success: false,
          message: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
        }
      }
    }
  },
}
