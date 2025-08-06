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
      if (store?.constructor?.persistenceConfig) {
        const config = store.constructor.persistenceConfig
        makePersistent(store, config)
      }
    }
  }
}
