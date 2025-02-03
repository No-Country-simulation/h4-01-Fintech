import {create} from 'zustand'

interface DepositStore {
  depositSuccess: boolean
  setDepositSuccess: (success: boolean) => void
}

export const useDepositStore = create<DepositStore>((set) => ({
  depositSuccess: false,
  setDepositSuccess: (success) => set({ depositSuccess: success }),
}))
