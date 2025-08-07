import { makeAutoObservable } from "mobx"
import { todoFeature } from "@/features/todo"
import { makePersistent } from "@/lib/storePersistence"

export class RootStore {
  // Public stores
  todoStore: InstanceType<NonNullable<typeof todoFeature.Store>>

  constructor() {
    if (!todoFeature.Store) {
      throw new Error("Todo feature Store is required")
    }
    this.todoStore = new todoFeature.Store()
    makeAutoObservable(this)
    this.setupPersistence()
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
