import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TodoFormProps {
  onSubmit: (text: string) => void
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [newTodo, setNewTodo] = useState("")
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      onSubmit(newTodo)
      setNewTodo("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder={t("todo.placeholder")}
        className="flex-1"
      />
      <Button type="submit">{t("todo.add")}</Button>
    </form>
  )
}
