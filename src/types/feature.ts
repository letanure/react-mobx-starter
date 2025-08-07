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
  // Main component (entry point)
  component: TComponent

  // Route configuration
  routes: RouteConfig | RouteConfig[]

  // Store class (optional)
  Store?: new () => TStore
}
