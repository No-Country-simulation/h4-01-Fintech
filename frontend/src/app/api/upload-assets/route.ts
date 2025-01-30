// pages/api/upload-assets.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import csvParser from 'csv-parser'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as Blob | null

    if (!file) {
      return NextResponse.json(
        { message: 'No se proporcionó un archivo CSV.' },
        { status: 400 }
      )
    }

    // Leer y procesar el archivo CSV
    const text = await file.text()
    const rows: Array<{
      asset_id: string
      name: string
      asset_type: string
      price: string
      currency: string
      sector: string
      info: string
      risk_profile: string
    }> = []

    const parseCSV = new Promise<void>((resolve, reject) => {
      const stream = require('stream')
      const readable = new stream.Readable()
      readable._read = () => {}
      readable.push(text)
      readable.push(null)

      readable
        .pipe(
          csvParser({
            headers: [
              'asset_id',
              'name',
              'asset_type',
              'price',
              'currency',
              'sector',
              'info',
              'risk_profile',
            ],
          })
        )
        .on('data', (row: {
          asset_id: string
          name: string
          asset_type: string
          price: string
          currency: string
          sector: string
          info: string
          risk_profile: string
        }) => rows.push(row))
        .on('end', resolve)
        .on('error', reject)
    })

    await parseCSV

    if (!rows.length) {
      return NextResponse.json(
        { message: 'El archivo CSV está vacío o no tiene datos válidos.' },
        { status: 400 }
      )
    }

    for (const row of rows) {
      const assetId = row.asset_id
      const name = row.name
      const assetType = row.asset_type
      const price = parseFloat(row.price)
      const currency = row.currency
      const sector = row.sector
      const info = row.info
      const riskProfile = parseInt(row.risk_profile)

      // Validar datos
      if (!assetId || isNaN(price) || !currency) {
        console.log(`Fila inválida: ${JSON.stringify(row)}`)
        continue // Saltar filas inválidas
      }

      // Buscar o crear el activo
      let asset = await prisma.asset.findUnique({
        where: { 
          symbol: assetId,
        },
      })

      if (!asset) {
        asset = await prisma.asset.create({
          data: {
            symbol: assetId,
            name: assetId || 'Unknown',
            asset_type: assetType || null,
            sector: sector || null,
            info: info || null,
            RiskProfile: isNaN(riskProfile) ? null : riskProfile,
            market_price: price,
            currency: currency,
          },
        })
      } else {
        console.log(`El activo ya existe: ${assetId}`)
      }

      // Agregar lógica adicional si es necesario para relacionar con otras tablas
      console.log(`Activo procesado: ${assetId}`)
    }

    return NextResponse.json({
      message: 'Datos de activos procesados correctamente.',
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error procesando el archivo', details: error.message },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
