export async function depositMoney(
  amount: number,
  userId: string,
  transactionType: string
) {
  try {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      price: amount,
      transaction_type: transactionType,
      userId,
      timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      console.log('Error en la transacción')
    }

    return await response.json()
  } catch (error) {
    console.log('Error:', error)
    throw error
  }
}
