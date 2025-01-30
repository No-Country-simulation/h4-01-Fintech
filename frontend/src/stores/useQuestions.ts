// stores/useQuestions.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'

type QuestionsStore = {
  riskPercentage: number | null // Porcentaje de riesgo final
  answers: number[] // Respuestas del usuario (array de números)
  setRiskPercentage: (value: number | null) => void // Función para actualizar el riskPercentage
  setAnswer: (questionIndex: number, value: number) => void // Guarda una respuesta específica
  calculateRiskPercentage: () => void // Calcula el porcentaje de riesgo
  reset: () => void // Resetea el estado
}

export const useQuestions = create<QuestionsStore>()(
  persist(
    (set, get) => ({
      riskPercentage: null,
      answers: Array(7).fill(10), // Inicializa un array de 7 respuestas con valor 0

      // Función para actualizar el riskPercentage
      setRiskPercentage: (value) => {
        set({ riskPercentage: value })

        // Guarda el riskPercentage en las cookies
        if (value !== null) {
          Cookies.set('riskPercentage', value.toString(), {
            expires: 30,
            path: '/',
          })
        } else {
          Cookies.remove('riskPercentage', { path: '/' })
        }
      },

      // Guarda una respuesta específica
      setAnswer: (questionIndex, value) => {
        const newAnswers = [...get().answers]
        newAnswers[questionIndex] = value // Actualiza la respuesta en el índice dado
        set({ answers: newAnswers })

        // Guarda las respuestas en las cookies
        Cookies.set('answers', JSON.stringify(newAnswers), {
          expires: 30,
          path: '/',
        })
      },

      // Calcula el porcentaje de riesgo
      calculateRiskPercentage: () => {
        const { answers } = get()
        const total = answers.reduce((sum, value) => sum + value, 0) // Suma todas las respuestas
        const averageRisk = total / answers.length// Calcula el promedio (7 preguntas, 10 puntos cada una)
        set({ riskPercentage: averageRisk })

        // Guarda el porcentaje de riesgo en las cookies
        Cookies.set('riskPercentage', averageRisk.toString(), {
          expires: 30,
          path: '/',
        })
      },

      // Resetea el estado
      reset: () => {
        set({ riskPercentage: null, answers: Array(7).fill(0) })
        Cookies.remove('riskPercentage', { path: '/' })
        Cookies.remove('answers', { path: '/' })
      },
    }),
    {
      name: 'questions-storage', // Nombre de la clave en el almacenamiento
    }
  )
)
