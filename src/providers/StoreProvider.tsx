import { createContext, type ReactNode } from "react"
import { RootStore } from "@/stores/RootStore"

export const StoreContext = createContext<RootStore | null>(null)

interface StoreProviderProps {
  children: ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  const store = new RootStore()

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
