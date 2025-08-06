import { makeAutoObservable } from "mobx"
import type { Todo } from "@/features/todo/types"

export type { Todo }

export class TodoStore {
  // Properties
  todos: Todo[] = []

  constructor() {
    makeAutoObservable(this)
  }

  // Persistence configuration
  static persistenceConfig = {
    enabled: true,
    key: "todoStore",
  }

  // Actions
  addTodo(text: string) {
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    }
    this.todos.push(todo)
  }

  toggleTodo(id: string) {
    const todo = this.todos.find((t) => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex((t) => t.id === id)
    if (index > -1) {
      this.todos.splice(index, 1)
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed)
  }

  // Computed values
  get completedCount() {
    return this.todos.filter((todo) => todo.completed).length
  }

  get activeCount() {
    return this.todos.filter((todo) => !todo.completed).length
  }

  get totalCount() {
    return this.todos.length
  }
}
