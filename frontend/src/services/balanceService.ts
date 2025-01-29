import { MyEnv } from '@/lib/envs'

export async function getBalance(userId: string) {
  try {
    const response = await fetch(`${MyEnv.APP_URL}/api/balance/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })

    if (!response.ok) {
      console.log('No se pudo obtener el balance')
    }

    return response
  } catch (error) {
    console.error('Error en getBalance:', error)
    return null
  }
}
