import { prisma } from '@/db/ConnectPrisma'
import { NextResponse } from 'next/server'

interface RequestBody {
  IdUser: string
}

export async function POST(request: Request) {
  try {
    const { IdUser }: RequestBody = await request.json()

    if (!IdUser) {
      return NextResponse.json({ error: 'IdUser is required' }, { status: 400 })
    }

    // Obtener la cantidad de notificaciones no leídas
    const unreadCount = await prisma.notifications.count({
      where: {
        userId: IdUser,
        read_status: false,
      },
    })

    return NextResponse.json({ unreadCount })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error fetching unread count' },
      { status: 500 }
    )
  }
}
