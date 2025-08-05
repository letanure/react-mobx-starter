/**
 * Todo feature routes
 *
 * Define all routes related to the todo feature here.
 * Uses Vue Router-like nested syntax with layout control.
 */

import type { RouteConfig } from "@/config/routes"
import { TodoList } from "./TodoList"

export const todoRoutes: RouteConfig = {
  path: "/",
  layout: "sidebar",
  component: TodoList,
  meta: { title: "Todo List" },
  children: [
    {
      path: "",
      component: TodoList,
    },
    {
      path: "active",
      component: TodoList,
    },
    {
      path: "completed",
      component: TodoList,
    },
  ],
} as const
