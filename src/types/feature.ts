/**
 * Feature Registry Pattern
 *
 * Standardized interface for all features to follow
 */

import type { ComponentType } from "react"
import type { RouteConfig } from "@/config/routes"

export interface FeatureRegistry<
  TStore = unknown,
  TComponent extends ComponentType = ComponentType,
> {
  component: TComponent

  routes: RouteConfig | RouteConfig[]

  Store?: new () => TStore

  translations?: Record<string, unknown>
}
