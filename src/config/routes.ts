/**
 * Global Routes Configuration
 *
 * This file centralizes all application routes by importing them from features.
 * Uses Vue Router-like nested routing with layout inheritance and type safety.
 *
 * Usage:
 * - Routes are processed automatically with layout inheritance
 * - Type-safe path generation utilities available
 * - Feature co-location maintained (routes live with their features)
 */

import { todoRoutes } from "@/features/todo/routes"
import { processRoutes } from "@/lib/routeProcessor"
import type { RouteConfig } from "@/types/routes"

// Collect all feature routes
export const routeConfigs: RouteConfig[] = [
  todoRoutes,
  // Add more feature routes here
]

// Process routes for React Router
export const processedRoutes = processRoutes(routeConfigs)

// Legacy support - simple route paths (can remove later)
export const routes = {
  todos: {
    all: "/",
    active: "/active",
    completed: "/completed",
  },
} as const
