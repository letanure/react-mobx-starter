/** biome-ignore-all lint/correctness/noUnreachable: false positive */
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { Stack } from "@/components/custom-ui/Stack"
import { Text } from "@/components/custom-ui/Text"
import { useStore } from "@/hooks/useStores"
import { TodoEmpty } from "./TodoEmpty"
import { TodoForm } from "./TodoForm"
import { TodoItem } from "./TodoItem"
import { TodoStats } from "./TodoStats"

export const TodoList = observer(() => {
  const { todoStore } = useStore()
  const location = useLocation()
  const { t } = useTranslation()

  const filteredTodos = (() => {
    switch (location.pathname) {
      case "/todo/active":
        return todoStore.todos.filter((todo) => !todo.completed)
      case "/todo/completed":
        return todoStore.todos.filter((todo) => todo.completed)
      default:
        return todoStore.todos
    }
  })()

  return (
    <Stack spacing="lg">
      <Stack spacing="xs">
        <Text tag="h1">{t("todo.title")}</Text>
        <Text tag="small">
          {t("todo.description", { count: todoStore.totalCount })}
        </Text>
      </Stack>

      <TodoForm onSubmit={(text) => todoStore.addTodo(text)} />

      <Stack spacing="xs">
        {filteredTodos.length === 0 && <TodoEmpty />}
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={(id) => todoStore.toggleTodo(id)}
            onDelete={(id) => todoStore.deleteTodo(id)}
          />
        ))}
      </Stack>

      {todoStore.totalCount > 0 && (
        <TodoStats
          activeCount={todoStore.activeCount}
          completedCount={todoStore.completedCount}
          onClearCompleted={() => todoStore.clearCompleted()}
        />
      )}
    </Stack>
  )
})
