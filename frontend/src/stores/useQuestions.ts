import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface QuestionsState {
  answers: Record<number, number>
  riskPercentage: number | null
  setAnswer: (questionIndex: number, answer: number) => void
  calculateRiskPercentage: () => void
}

export const useQuestions = create<QuestionsState>()(
  persist(
    (set, get) => ({
      answers: {},
      riskPercentage: null,
      setAnswer: (questionIndex, answer) =>
        set((state) => ({
          answers: { ...state.answers, [questionIndex]: answer },
        })),
      calculateRiskPercentage: () => {
        const values = Object.values(get().answers)
        const risk = values.length
          ? values.reduce((a, b) => a + b, 0) / values.length
          : 0
        set({ riskPercentage: risk })
      },
    }),
    { name: 'user-storage' } // Este nombre debe coincidir con el error que tienes
  )
)
