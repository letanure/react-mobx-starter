/**
 * Centralized route configuration with Vue Router-like nested routing
 */

import type { LayoutType } from "@/components/layout"
import { demoRoutes } from "@/features/demo/routes"
import { todoRoutes } from "@/features/todo/routes"
import { processRoutes } from "@/lib/routeProcessor"

export interface RouteConfig {
  path: string
  component?: React.ComponentType
  layout?: LayoutType
  meta?: {
    title?: string
    requiresAuth?: boolean
    [key: string]: unknown
  }
  children?: RouteConfig[]
}

export const routeConfigs: RouteConfig[] = [todoRoutes, demoRoutes]

export const processedRoutes = processRoutes(routeConfigs)
export const routes = {
  todos: {
    all: "/",
    active: "/active",
    completed: "/completed",
  },
  demo: "/demo",
} as const
