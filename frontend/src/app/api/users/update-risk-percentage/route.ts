import { prisma } from '@/db/ConnectPrisma'
import { NextResponse } from 'next/server'

interface RequestBody {
  userId: string
  riskPercentage: number
}

export async function PUT(request: Request) {
  try {
    const { userId, riskPercentage }: RequestBody = await request.json()

    // Validar datos recibidos
    if (!userId || riskPercentage === undefined || riskPercentage === null) {
      return NextResponse.json(
        { error: 'userId and riskPercentage are required' },
        { status: 400 }
      )
    }

    const riskPercentageInt = Math.round(riskPercentage)
    if (!Number.isInteger(riskPercentageInt)) {
      return NextResponse.json(
        { error: 'Risk percentage must be an integer' },
        { status: 400 }
      )
    }

    // Actualizar el porcentaje de riesgo en la base de datos
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: { risk_percentage: riskPercentageInt },
    })

    // Verifica que el updatedUser no sea nulo o indefinido
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      )
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(JSON.stringify(error))
    return NextResponse.json(
      {
        error: 'Error updating risk percentage',
        details: (error as any).message || error,
      },
      { status: 500 }
    )
  }
}
