// src/pages/api/goals/route
import { prisma } from '@/db/ConnectPrisma'
import { NextRequest, NextResponse } from 'next/server'

interface Data {
  userID: string
  name: string
  targetAmount: number
}

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
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const userId = req.query.userId as string | undefined

//   switch (req.method) {
//     case 'GET': // Listar objetivos del usuario
//       try {
//         const goals = await prisma.goals.findMany({ where: { userId } })
//         return res.status(200).json(goals)
//       } catch (error) {
//         return res.status(500).json({ error: 'Error obteniendo objetivos' })
//       }

//     case 'POST': // Crear un objetivo
//       try {
//         const { name, targetAmount, progress, userId } = req.body

//         // Crear el objetivo en la base de datos
//         const newGoal = await prisma.goals.create({
//           data: {
//             name,
//             targetAmount: targetAmount, // Prisma maneja automáticamente el tipo Decimal
//             progress: progress || 0, // Si no se proporciona progreso, se establece en 0
//             userId: userId || null, // Si no se proporciona userId, se establece en null
//           },
//         })

//         return res.status(201).json(newGoal)
//       } catch (error) {
//         console.error('Error creando el objetivo:', error)
//         return res.status(500).json({ error: 'Error creando el objetivo' })
//       }

//     default:
//       res.setHeader('Allow', ['GET', 'POST'])
//       return res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }

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
