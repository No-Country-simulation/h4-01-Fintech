// stores/useInvestmentStore.ts
import { create } from 'zustand'

interface InvestmentStore {
  answers: number[]
  currentQuestion: number
  setAnswers: (answers: number[]) => void
  setCurrentQuestion: (index: number) => void
}

export const useInvestmentStore = create<InvestmentStore>((set) => ({
  answers: new Array(7).fill(5), // Inicializa con 7 preguntas y valor predeterminado 5
  currentQuestion: 0,
  setAnswers: (answers) => set({ answers }),
  setCurrentQuestion: (index) => set({ currentQuestion: index }),
}))
