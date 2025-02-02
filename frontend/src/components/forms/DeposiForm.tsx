'use client'

import { useState } from 'react'
import { depositMoney } from '@/services/transactionService'
import { useSession } from 'next-auth/react'

export default function DepositForm() {
    const {data:session} = useSession()
    const userId = session?.user.id as string
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleDeposit = async () => {
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await depositMoney(amount, userId)
      setSuccess(true)
    } catch (err) {
      setError('Hubo un problema con la transacción')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Depositar Dinero</h2>

      <input
        type="number"
        placeholder="Ingrese el monto"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-2 border rounded-md"
      />

      <button
        onClick={handleDeposit}
        disabled={loading || amount <= 0}
        className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md disabled:bg-gray-300"
      >
        {loading ? 'Procesando...' : 'Depositar'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Depósito exitoso</p>}
    </div>
  )
}
