"use client"

import { useEffect, useState } from "react"
import { MyEnv } from "@/lib/envs"

interface StockEntry {
  symbol: string
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// Símbolos de las acciones a consultar
const symbols = "AAPL,MSFT,AMZN,GOOGL,TSLA,META,NVDA,NFLX,ADBE,INTC"
const API_KEY = MyEnv.ACCESS_KEY as string

export default function ModernStockComponent() {
  const [stockData, setStockData] = useState<StockEntry[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          `https://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=${symbols}`
        )

        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor")
        }

        const data: { data: StockEntry[] } = await response.json()

        if (data.data && data.data.length > 0) {
          // Filtrar duplicados combinando `symbol` y `date`
          const uniqueStocks = Array.from(
            new Map(data.data.map((stock: StockEntry) => [`${stock.symbol}-${stock.date}`, stock])).values()
          )

          setStockData(uniqueStocks as StockEntry[])
        } else {
          setError("No hay datos disponibles.")
        }
      } catch (error) {
        setError("Error al obtener los datos.")
      } finally {
        setLoading(false)
      }
    }

    fetchStockData()
  }, [])

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h3 className="text-3xl font-bold mb-8 text-gray-800">Acciones Principales</h3>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : stockData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stockData.map((stock) => {
            const change = stock.close - stock.open
            const changePercent = (change / stock.open) * 100
            const isPositive = change >= 0

            return (
              <div
                key={`${stock.symbol}-${stock.date}`} // Clave única garantizada
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-2xl font-bold text-gray-800">{stock.symbol}</h4>
                    <span className={`text-lg font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                      ${stock.close.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cambio</span>
                    <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
                      <span className="mr-1">{isPositive ? "▲" : "▼"}</span>
                      <span className="font-semibold">
                        {Math.abs(change).toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Volumen</span>
                    <span className="font-semibold text-gray-800">{stock.volume.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
