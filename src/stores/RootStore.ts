import { makeAutoObservable } from "mobx"
import { TodoStore } from "@/features/todo/TodoStore"
import { makePersistent } from "@/lib/storePersistence"

export class RootStore {
  // Public stores
  todoStore: TodoStore

  constructor() {
    this.todoStore = new TodoStore()
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
