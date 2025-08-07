import { makeAutoObservable } from "mobx"
import { todoFeature } from "@/features/todo"
import { makePersistent } from "@/lib/storePersistence"
import type { StoreConstructor } from "@/types/shared"

export class RootStore {
  // Explicitly typed stores
  todoStore!: InstanceType<NonNullable<typeof todoFeature.stores>[number]>

  constructor() {
    // Initialize stores from features
    this.initializeFeatureStores()
    makeAutoObservable(this)
    this.setupPersistence()
  }

  private initializeFeatureStores() {
    // Initialize feature stores
    if (todoFeature.stores && todoFeature.stores.length > 0) {
      for (const StoreClass of todoFeature.stores) {
        const storeName = this.getStoreName(StoreClass as StoreConstructor)
        const storeInstance = new StoreClass()

        // Dynamically assign store to this instance
        Object.assign(this, { [storeName]: storeInstance })
      }
    }
  }

  private getStoreName(StoreClass: StoreConstructor): string {
    // Get the store name from persistence config or class name
    const persistenceKey = StoreClass.persistenceConfig?.key

    if (persistenceKey) {
      return persistenceKey
    }

    // Fallback to class name converted to camelCase
    const className = StoreClass.name || "store"
    return className.charAt(0).toLowerCase() + className.slice(1)
  }

  private setupPersistence() {
    const storeEntries = Object.entries(this) as [string, unknown][]

    for (const [, store] of storeEntries) {
      // Type assertion needed for constructor property access
      // biome-ignore lint/suspicious/noExplicitAny: Constructor property access requires any type
      const storeConstructor = store?.constructor as any
      if (storeConstructor?.persistenceConfig) {
        const config = storeConstructor.persistenceConfig
        makePersistent(store as object, config)
      }
    }
  }
}
