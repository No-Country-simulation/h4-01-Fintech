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

    const text = await file.text()
    const rows: Array<{ asset_id: string; fecha: string; cierre: string }> = []

    const parseCSV = new Promise<void>((resolve, reject) => {
      const stream = require('stream')
      const readable = new stream.Readable()
      readable._read = () => {}
      readable.push(text)
      readable.push(null)

      readable
        .pipe(csvParser({ headers: ['asset_id', 'fecha', 'cierre'] }))
        .on(
          'data',
          (row: { asset_id: string; fecha: string; cierre: string }) => {
            rows.push(row)
          }
        )
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

    for (const [index, row] of rows.entries()) {
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms))

      const assetId = row.asset_id
      const fecha = new Date(row.fecha)
      const cierre = parseFloat(row.cierre)

      // Validar datos
      if (isNaN(fecha.getTime()) || isNaN(cierre)) {
        console.log(`Fila inválida: ${JSON.stringify(row)}`)
        continue // Saltar filas inválidas
      }

      // Buscar o crear el activo
      let asset = await prisma.asset.findUnique({
        where: { symbol: assetId },
      })

      if (!asset) {
        asset = await prisma.asset.create({
          data: {
            symbol: assetId,
            name: assetId,
          },
        })
      }

      // Verificar si ya existe el registro en marketData
      const existingMarketData = await prisma.marketData.findFirst({
        where: {
          asset_id: asset.id,
          timestamp: fecha,
        },
      })

      if (!existingMarketData) {
        // Crear nuevo registro
        await prisma.marketData.create({
          data: {
            name: assetId,
            asset_id: asset.id,
            price: cierre,
            timestamp: fecha,
          },
        })
        console.log(
          `Dato insertado: ${assetId} - ${fecha.toISOString()} - ${cierre}`
        )
      } else {
        console.log(
          `Dato duplicado: ${assetId} - ${fecha.toISOString()} - ${cierre}`
        )
      }

    }

    return NextResponse.json({ message: 'Datos procesados correctamente.' })
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error procesando el archivo', details: error.message },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
