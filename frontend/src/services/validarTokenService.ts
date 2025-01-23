import { MyEnv } from '@/utils/envs'

export const emailVerificationService = async (token: string) => {
    try {
      const response = await fetch(
        `${MyEnv.API_URL}/api/auth/validate/${token}`,
        {
          method: 'GET',
        }
      )

      if (!response.ok) {
        throw new Error('Error al verificar el correo')
      }

      const data = await response.json()

      if (data.success) {
        return {
          success: true,
          message: 'Correo verificado exitosamente',
        }
      } else {
        return {
          success: false,
          message: 'No se pudo verificar el correo',
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message || 'Error inesperado al verificar el correo',
        }
      } else {
        return {
          success: false,
          message: 'Error inesperado al verificar el correo',
        }
      }
    }
  }
