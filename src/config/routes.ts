/**
 * Application routes configuration
 */

import type { LayoutType } from "@/components/layout"
import { demoRoutes } from "@/features/demo/routes"
import { homeRoutes } from "@/features/home/routes"
import { todoRoutes } from "@/features/todo/routes"
import { processRoutes } from "@/lib/routeProcessor"

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

export const routeConfigs: RouteConfig[] = [homeRoutes, todoRoutes, demoRoutes]

export const processedRoutes = processRoutes(routeConfigs)
