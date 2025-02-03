import { prisma } from '@/db/ConnectPrisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // Extraemos el parámetro de la URL
    const { searchParams } = new URL(req.url)
    const riskLevel = searchParams.get('riskLevel')

    if (!riskLevel || isNaN(Number(riskLevel))) {
      return NextResponse.json(
        { error: 'Nivel de riesgo inválido' },
        { status: 400 }
      )
    }

    const assets = await prisma.asset.findMany({
      where: { RiskProfile: Number(riskLevel) },
    })

    return NextResponse.json(assets, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener activos' },
      { status: 500 }
    )
  }
}
