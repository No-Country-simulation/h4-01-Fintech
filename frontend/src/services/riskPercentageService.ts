export const fetchRiskPercentage = async (
  userId: string,
  riskPercentage: number
): Promise<any> => {
  try {
    const response = await fetch('/api/users/update-risk-percentage', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        riskPercentage: riskPercentage,
      }),
    })

    if (!response.ok) {
      console.log(JSON.stringify(response))
    }

    // Asegúrate de manejar la respuesta correctamente
    const data = await response.json()
    return data // Retorna la respuesta parseada
  } catch (error) {
    console.error('Error en la solicitud:', error)
    throw error // Lanza el error para manejarlo en el frontend
  }
}
