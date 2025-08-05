/**
 * Global Routes Configuration
 *
 * This file centralizes all application routes by importing them from features.
 * This pattern provides:
 * - Feature co-location (routes live with their features)
 * - Global access (import from one place)
 * - Type safety (TypeScript will catch route typos)
 * - Easy refactoring (change route in one place)
 *
 * Usage:
 * import { routes } from '@/config/routes'
 * <Link to={routes.todos.active}>Active</Link>
 */

import { todoRoutes } from "@/features/todo/routes"

export { todoRoutes }

export const routes = {
  todos: todoRoutes,
} as const

// Type helper for route values
export type RouteValue = (typeof routes.todos)[keyof typeof routes.todos]
