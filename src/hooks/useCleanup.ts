import { useEffect } from "react"
import { useStore } from "./useStores"

export function useCleanup() {
  const store = useStore()

  useEffect(() => {
    const handleBeforeUnload = () => {
      store.dispose()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      // Also cleanup on component unmount
      store.dispose()
    }
  }, [store])
}
