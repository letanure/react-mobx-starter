import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { todoPaths } from "./routePaths"

export function TodoNavigation() {
  const location = useLocation()
  const { t } = useTranslation()

  const navigationItems = [
    { label: t("todo.navigation.all"), path: todoPaths.all },
    { label: t("todo.navigation.active"), path: todoPaths.active },
    { label: t("todo.navigation.completed"), path: todoPaths.completed },
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
