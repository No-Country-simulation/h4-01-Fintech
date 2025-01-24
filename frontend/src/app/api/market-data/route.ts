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
    const rows: Array<{ asset_id: string; fecha: string; cierre: string }> = []

    const parseCSV = new Promise<void>((resolve, reject) => {
      const stream = require('stream')
      const readable = new stream.Readable()
      readable._read = () => {}
      readable.push(text)
      readable.push(null)

      interface CSVRow {
        asset_id: string
        fecha: string
        cierre: string
      }

      const parseCSV = new Promise<void>((resolve, reject) => {
        const readable = new stream.Readable()
        readable._read = () => {}
        readable.push(text)
        readable.push(null)

        readable
          .pipe(csvParser({ headers: ['asset_id', 'fecha', 'cierre'] }))
          .on('data', (row: CSVRow) => rows.push(row))
          .on('end', resolve)
          .on('error', reject)
      })
    })

    await parseCSV

    if (!rows.length) {
      return NextResponse.json(
        { message: 'El archivo CSV está vacío o no tiene datos válidos.' },
        { status: 400 }
      )
    }

    // Validar y procesar filas
    const validRows = rows
      .map((row) => ({
        asset_id: row.asset_id,
        fecha: new Date(row.fecha),
        cierre: parseFloat(row.cierre),
      }))
      .filter((row) => !isNaN(row.fecha.getTime()) && !isNaN(row.cierre))

    if (!validRows.length) {
      return NextResponse.json(
        { message: 'No se encontraron filas válidas en el archivo CSV.' },
        { status: 400 }
      )
    }

    // Obtener activos existentes
    const assetSymbols = [...new Set(validRows.map((row) => row.asset_id))]
    const existingAssets = await prisma.asset.findMany({
      where: { symbol: { in: assetSymbols } },
    })
    const existingSymbols = new Set(existingAssets.map((asset) => asset.symbol))

    // Crear nuevos activos
    const newAssets = assetSymbols
      .filter((symbol) => !existingSymbols.has(symbol))
      .map((symbol) => ({ symbol, name: 'Unknown' }))

    if (newAssets.length) {
      await prisma.asset.createMany({ data: newAssets })
    }

    // Re-cargar activos actualizados
    const allAssets = await prisma.asset.findMany({
      where: { symbol: { in: assetSymbols } },
    })
    const assetMap = new Map(allAssets.map((asset) => [asset.symbol, asset.id]))

    // Preparar datos para marketData
    const marketData = validRows.map((row) => ({
      market_data_id: Date.now() + Math.random(), // Generar un ID único
      asset_id: assetMap.get(row.asset_id),
      price: row.cierre,
      timestamp: row.fecha,
    }))

    // Evitar duplicados en marketData
    const existingMarketData = await prisma.marketData.findMany({
      where: {
        OR: marketData.map((data) => ({
          asset_id: data.asset_id,
          timestamp: data.timestamp,
        })),
      },
    })
    const existingDataSet = new Set(
      existingMarketData.map(
        (data) => `${data.asset_id}-${data.timestamp.toISOString()}`
      )
    )

    const newMarketData = marketData.filter(
      (data) =>
        !existingDataSet.has(`${data.asset_id}-${data.timestamp.toISOString()}`)
    )

    if (newMarketData.length) {
      await prisma.marketData.createMany({ data: newMarketData })
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
