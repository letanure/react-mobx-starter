/**
 * Global Route Configuration Types
 *
 * Defines the shape of route configurations used throughout the application.
 * These types support Vue Router-like nested routing with layout control.
 */

import type { LayoutType } from "@/components/layout"

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
