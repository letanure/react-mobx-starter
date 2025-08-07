/**
 * Centralizes todo feature exports to provide a single entry point
 * for the root application to consume components, routes, and stores
 */

import type { FeatureRegistry } from "@/types/feature"
import { translations } from "./i18n"
import { todoRoutes } from "./routes"
import { Store } from "./store"
import { TodoList } from "./TodoList"

export const todoFeature: FeatureRegistry<
  InstanceType<typeof Store>,
  typeof TodoList
> = {
  component: TodoList,
  routes: todoRoutes,
  Store,
  translations,
}

// Export types only if needed by external consumers
// export type { Todo } from './types'
