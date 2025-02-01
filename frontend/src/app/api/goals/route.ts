// src/pages/api/goals/route
import { prisma } from '@/db/ConnectPrisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, name, targetAmount } = body

    if (!userId || !name || !targetAmount) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      )
    }

    const balance = await prisma.balance.findFirst({ where: { userId } })

    if (!balance) {
      return NextResponse.json(
        { error: 'Balance no encontrado para este usuario' },
        { status: 404 }
      )
    }

    // Crear la meta en la base de datos
    const newGoal = await prisma.goals.create({
      data: { userId, name, targetAmount, progress: 0 },
    })

    return NextResponse.json(newGoal, { status: 201 })
  } catch (error) {
    console.error('Error al crear la meta:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Listar los objetivos del usuario
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'Falta userId' }, { status: 400 })
  }

  try {
    const goals = await prisma.goals.findMany({
      where: { userId },
    })
    return NextResponse.json(goals)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los objetivos' },
      { status: 500 }
    )
  }
}
