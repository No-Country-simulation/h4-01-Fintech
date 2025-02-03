import { create } from 'zustand'
import { persist, StorageValue } from 'zustand/middleware'

interface UserState {
  name: string | null
  email: string | null
  image: string | null
  risk_percentage: number | null
  setUser: (user: Partial<UserState>) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
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
      name: 'user-storage',
      storage: typeof window !== 'undefined' ? {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name: string, value: StorageValue<UserState>) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        }
      } : undefined, // Evita usar localStorage en el servidor
    }
  )
)
