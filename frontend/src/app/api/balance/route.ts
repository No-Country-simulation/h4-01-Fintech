// src/app/api/balance/route.ts
import { NextResponse } from 'next/server'
import Decimal from 'decimal.js'
import { prisma } from '@/db/ConnectPrisma'
import { generateUniqueCVU } from '@/lib/generate'

/**
 * POST: Crear un balance si no existe
 */
export async function POST(req: Request) {
  try {
    const { userId } = await req.json()

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'userId inválido' }, { status: 400 })
    }

    // Verificar si el usuario existe
    const user = await prisma.users.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json(
        { error: 'El usuario no existe' },
        { status: 404 }
      )
    }

    // Verificar si ya tiene balance
    const existingBalance = await prisma.balance.findUnique({
      where: { userId },
    })
    if (existingBalance) {
      return NextResponse.json({
        message: 'Balance ya existe',
        balance: {
          id: existingBalance.id,
          balance: existingBalance.balance.toNumber(),
          last_updated: existingBalance.last_updated,
          cvu: existingBalance.cvu,
          userId: existingBalance.userId,
        },
      })
    }

    // Crear balance nuevo
    const cvu = await generateUniqueCVU() // Usar la función importada
    const newBalance = await prisma.balance.create({
      data: {
        balance: new Decimal(0),
        cvu,
        userId,
      },
    })

    return NextResponse.json({ message: 'Balance creado', balance: newBalance })
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
