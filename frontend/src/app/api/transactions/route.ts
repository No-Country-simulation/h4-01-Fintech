import { prisma } from '@/db/ConnectPrisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {
      price,
      transaction_type,
      timestamp,
      userId,
    } = await req.json()

    if (!price || !transaction_type || !userId) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
    }

    const validTransactionTypes = [
      'ACCOUNT_FUNDING',
      'WITHDRAWAL',
      'INVESTMENT',
      'INVESTMENT_WITHDRAWAL',
    ] as const

    if (!validTransactionTypes.includes(transaction_type)) {
      return NextResponse.json(
        { error: `transaction_type inválido: ${transaction_type}` },
        { status: 400 }
      )
    }

    // Crear la transacción
    const transaction = await prisma.transaction.create({
      data: {
        price,
        transaction_type,
        timestamp,
        userId,
        quantity: 1, // or any appropriate value
        location: 'default' // or any appropriate value
      },
    })

    const existingBalance = await prisma.balance.findFirst({
      where: { userId:userId }
    })

    if (!existingBalance) {
      return NextResponse.json(
        { error: "No se encontró el balance del usuario" },
        { status: 400 }
      )}

    if (!existingBalance) {
      return NextResponse.json(
        { error: 'No se encontró el balance del usuario' },
        { status: 400 }
      )
    }

    // Si existe, actualizar el monto
    const updatedBalance = await prisma.balance.update({
      where: { id: existingBalance.id }, // Se usa 'id' porque es único
      data: { amount: { increment: price } },
    })

    return NextResponse.json({ transaction, updatedBalance }, { status: 201 })
  } catch (error) {
    console.error('Error en la transferencia:', error)
    return NextResponse.json(
      { error: 'Error en la transferencia' },
      { status: 500 }
    )
  }
}

//all

export async function GET(
  req: NextRequest,
) {
  
  try {
    const transactions = await prisma.transaction.findMany()

    return NextResponse.json(transactions, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener transacciones' }, { status: 500 })
  }
}
