import { prisma } from '@/db/ConnectPrisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const {
      price,
      cvu,
      transaction_type,
      timestamp,
      userId,
      quantity,
      location,
    } = await req.json()

    if (!price || !cvu || !transaction_type || !userId) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
    }

    // Crear la transacción
    const transaction = await prisma.transaction.create({
      data: {
        price,
        transaction_type,
        timestamp,
        userId,
        quantity,
        location,
      },
    })

    const existBalance = await prisma.balance.update({
      where: { id: userId },
      data: {
        amount: {
          increment: price,
        },
      },
    })
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error en la transferencia' },
      { status: 500 }
    )
  }
}
