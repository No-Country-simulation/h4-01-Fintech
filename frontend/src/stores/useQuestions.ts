import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import Cookies from 'js-cookie'

type QuestionsStore = {
  riskPercentage: number | null
  answers: number[]
  setRiskPercentage: (value: number | null) => void
  setAnswer: (questionIndex: number, value: number) => void
  calculateRiskPercentage: () => void
  reset: () => void
}

export const useQuestions = create<QuestionsStore>()(
  persist(
    (set, get) => ({
      riskPercentage: null,
      answers: Array(7).fill(10),

      setRiskPercentage: (value) => {
        set({ riskPercentage: value })
      },

      setAnswer: (questionIndex, value) => {
        const newAnswers = [...get().answers]
        newAnswers[questionIndex] = value
        set({ answers: newAnswers })
      },

      calculateRiskPercentage: () => {
        const { answers } = get()
        const total = answers.reduce((sum, value) => sum + value, 0)
        const averageRisk = total / answers.length
        set({ riskPercentage: averageRisk })
      },

      reset: () => {
        set({ riskPercentage: null, answers: Array(7).fill(0) })
      },
    }),
    {
      name: 'questions-storage',
      storage: createJSONStorage(() => ({
        getItem: (key) =>
          Cookies.get(key) ? JSON.parse(Cookies.get(key) as string) : null,
        setItem: (key, value) =>
          Cookies.set(key, JSON.stringify(value), { expires: 30, path: '/' }),
        removeItem: (key) => Cookies.remove(key, { path: '/' }),
      })),
    }
  )
)
