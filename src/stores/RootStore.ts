import { makeAutoObservable } from "mobx"
import { TodoStore } from "@/features/todo/TodoStore"

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
