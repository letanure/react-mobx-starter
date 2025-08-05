import { makeAutoObservable } from "mobx"
import { TodoStore } from "@/stores/TodoStore"

export class RootStore {
  // Public stores
  todoStore: TodoStore

  constructor() {
    // Initialize stores
    this.todoStore = new TodoStore()

    // Setup MobX
    makeAutoObservable(this)
  }
}
