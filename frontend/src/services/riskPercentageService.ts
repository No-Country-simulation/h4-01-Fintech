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

    const data = await response.json()
    return data 
  } catch (error) {
    console.error('Error en la solicitud:', error)
    throw error 
  }
}
