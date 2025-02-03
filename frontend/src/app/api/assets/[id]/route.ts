import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/db/ConnectPrisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params 

    const asset = await prisma.asset.findUnique({
      where: { id },
    })

    if (!asset) {
      return NextResponse.json(
        { error: 'Activo no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(asset, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener el activo' },
      { status: 500 }
    )
  }
}
