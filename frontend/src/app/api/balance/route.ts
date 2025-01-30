import { prisma } from '@/db/ConnectPrisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const userId = body?.userId

    if (!userId) {
      return NextResponse.json({ error: 'userId requerido' }, { status: 400 })
    }


    const balances = await prisma.balance.findMany({
      where: { userId: userId },
    })

    // Si no hay balances encontrados, devolver error
    if (balances.length === 0) {
      return NextResponse.json(
        { error: 'Balance no encontrado para este usuario' },
        { status: 404 }
      )
    }

    // Devolver el primer balance encontrado
    const balance = balances[0]

    return NextResponse.json({
      id: balance.id,
      balance: balance.amount.toNumber(),
      last_updated: balance.last_updated,
      cvu: balance.cvu,
      userId: balance.userId,
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: e.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
