import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { routes } from "@/config/routes"
import { TodoNavigation } from "@/features/todo/TodoNavigation"
import { useStore } from "@/hooks/useStores"
import { cn } from "@/lib/utils"
import { getRelativeTime } from "@/utils"
import "./TodoList.css"

export const TodoList = observer(() => {
  const { todoStore } = useStore()
  const [newTodo, setNewTodo] = useState("")
  const location = useLocation()
  const { t } = useTranslation()

  const filteredTodos = (() => {
    switch (location.pathname) {
      case routes.todos.active:
        return todoStore.todos.filter((todo) => !todo.completed)
      case routes.todos.completed:
        return todoStore.todos.filter((todo) => todo.completed)
      default:
        return todoStore.todos
    }
  })()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      todoStore.addTodo(newTodo)
      setNewTodo("")
    }
  }

  return (
    <div className="todo-container">
      <h1>{t("todo.title")}</h1>

      <TodoNavigation />

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder={t("todo.placeholder")}
          className="todo-input"
        />
        <Button onClick={() => {}}>{t("todo.add")}</Button>
      </form>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => todoStore.toggleTodo(todo.id)}
            />
            <span className={cn(todo.completed && "completed")}>
              {todo.text}
            </span>
            <span className="todo-time">{getRelativeTime(todo.createdAt)}</span>
            <Button onClick={() => todoStore.deleteTodo(todo.id)}>
              {t("todo.delete")}
            </Button>
          </li>
        ))}
      </ul>

      {todoStore.totalCount > 0 && (
        <div className="todo-stats">
          <span>
            {todoStore.activeCount} {t("todo.stats.active")}
          </span>
          <span>
            {todoStore.completedCount} {t("todo.stats.completed")}
          </span>
          {todoStore.completedCount > 0 && (
            <Button onClick={() => todoStore.clearCompleted()}>
              {t("todo.clearCompleted")}
            </Button>
          )}
        </div>
      )}
    </div>
  )
})
