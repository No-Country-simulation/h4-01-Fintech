


export async function depositMoney(amount: number, userId: string) {
  try {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: amount,
        transaction_type: 'deposit',
        timestamp: new Date().toISOString(),
        userId,
        quantity: 1,
        location: 'Online',
      }),
    })

    if (!response.ok) {
      throw new Error('Error en la transacción')
    }

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
