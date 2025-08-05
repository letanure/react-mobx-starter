/**
 * Todo feature routes
 *
 * Define all routes related to the todo feature here.
 * Uses Vue Router-like nested syntax with layout control.
 */

import { CheckCircle, Circle, List } from "lucide-react"
import type { RouteConfig } from "@/config/routes"
import { TodoList } from "./TodoList"

export const todoRoutes: RouteConfig = {
  path: "/todo",
  layout: "sidebar",
  children: [
    {
      path: "",
      component: TodoList,
      meta: {
        titleKey: "todo.pages.all",
        nav: {
          icon: List,
          translationKey: "todo.navigation.all",
          section: "todo.navigation.section",
        },
      },
    },
    {
      path: "active",
      component: TodoList,
      meta: {
        titleKey: "todo.pages.active",
        nav: {
          icon: Circle,
          translationKey: "todo.navigation.active",
          section: "todo.navigation.section",
        },
      },
    },
    {
      path: "completed",
      component: TodoList,
      meta: {
        titleKey: "todo.pages.completed",
        nav: {
          icon: CheckCircle,
          translationKey: "todo.navigation.completed",
          section: "todo.navigation.section",
        },
      },
    },
  ],
} as const
