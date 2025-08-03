import { createContext, type ReactNode, useState } from "react"
import { RootStore } from "@/stores/RootStore"

// Types
interface StoreProviderProps {
  children: ReactNode
}

// Context
export const StoreContext = createContext<RootStore | null>(null)

export function StoreProvider({ children }: StoreProviderProps) {
  // State
  const [store] = useState(() => new RootStore())

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
