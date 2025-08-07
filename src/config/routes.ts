/**
 * Application routes configuration
 */

import type { LayoutType } from "@/components/layout"
import { demoFeature } from "@/features/demo"
import { homeFeature } from "@/features/home"
import { todoFeature } from "@/features/todo"
import { processRoutes } from "@/lib/routeProcessor"
import { errorRoutes } from "@/pages/routes"

export interface RouteConfig {
  path: string
  component?: React.ComponentType
  layout?: LayoutType
  meta?: {
    title?: string
    titleKey?: string
    requiresAuth?: boolean
    nav?: {
      title?: string
      icon?: React.ComponentType<{ className?: string }>
      translationKey?: string
      section?: string
      hidden?: boolean
    }
    [key: string]: unknown
  }
  children?: RouteConfig[]
}

export const routeConfigs: RouteConfig[] = [
  homeFeature.routes,
  todoFeature.routes,
  demoFeature.routes,
  errorRoutes,
]

export const processedRoutes = processRoutes(routeConfigs)
