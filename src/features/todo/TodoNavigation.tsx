import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router-dom"
import { routes } from "@/config/routes"
import { cn } from "@/lib/utils"

export function TodoNavigation() {
  const location = useLocation()
  const { t } = useTranslation()

  const navigationItems = [
    { label: t("todo.navigation.all"), path: routes.todos.all },
    { label: t("todo.navigation.active"), path: routes.todos.active },
    { label: t("todo.navigation.completed"), path: routes.todos.completed },
  ]

  return (
    <nav className="todo-navigation">
      {navigationItems.map(({ label, path }) => (
        <Link
          key={path}
          to={path}
          className={cn("nav-link", location.pathname === path && "active")}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
