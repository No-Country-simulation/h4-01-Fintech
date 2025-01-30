import { prisma } from '@/db/ConnectPrisma'
import { NextResponse, NextRequest } from 'next/server'

// Definir la interfaz para los parámetros
interface Params {
  userId: string
}

/**
 * GET: Obtener balance del usuario
 */
export async function GET(
  req: NextRequest,
) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId') as string // Obtener userId desde params

    if (!userId) {
      return NextResponse.json({ error: 'userId requerido' }, { status: 400 })
    }

    // Buscar el balance por userId
    const balance = await prisma.balance.findUnique({
      where: { userId: userId },
    })

    // Si no se encuentra el balance, devolver error 404
    if (!balance) {
      return NextResponse.json(
        { error: 'Balance no encontrado' },
        { status: 404 }
      )
    }

    // Devolver la respuesta con el balance
    return NextResponse.json({
      id: balance.id,
      balance: balance.balance.toNumber(),
      last_updated: balance.last_updated,
      cvu: balance.cvu,
      userId: balance.userId,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
