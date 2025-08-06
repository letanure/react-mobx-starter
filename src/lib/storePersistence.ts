import { action, reaction } from "mobx"
import * as storage from "./storage"

export interface PersistenceConfig {
  enabled?: boolean
  key?: string
  debounceMs?: number
}

export function makePersistent<T extends object>(
  store: T,
  config: PersistenceConfig = {},
): T {
  const { enabled = true, key, debounceMs = 300 } = config

  if (!enabled || !storage.isSupported()) {
    return store
  }

  const storageKey = key || store.constructor.name

  let timeoutId: NodeJS.Timeout | null = null

  const saveToStorage = action(() => {
    storage.setItem(storageKey, store)
  })

  const debouncedSave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(saveToStorage, debounceMs)
  }

  const loadFromStorage = action(() => {
    const data = storage.getItem<Partial<T>>(storageKey)
    if (data) {
      Object.assign(store, data)
    }
  })

  loadFromStorage()

  reaction(
    () => JSON.stringify(store),
    () => debouncedSave(),
    { fireImmediately: false },
  )

  return store
}
