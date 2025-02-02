import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Definir la estructura del usuario
interface UserState {
  name: string | null
  email: string | null
  image: string | null
  risk_percentage: number | null
  setUser: (user: Partial<UserState>) => void
  clearUser: () => void
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      name: null,
      email: null,
      image: null,
      risk_percentage: null,
      setUser: (user) => set((state) => ({ ...state, ...user })),
      clearUser: () =>
        set({
          name: null,
          email: null,
          image: null,
          risk_percentage: null,
        }),
    }),
    {
      name: 'user-storage', // Nombre para persistencia en localStorage
    }
  )
)
