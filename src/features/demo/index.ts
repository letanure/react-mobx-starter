/**
 * Centralizes demo feature exports to provide a single entry point
 * for the root application to consume components and routes
 */

import type { FeatureRegistry } from "@/types/feature"
import { Demo } from "./Demo"
import { demoRoutes } from "./routes"

export const demoFeature: FeatureRegistry<never, typeof Demo> = {
  component: Demo,
  routes: demoRoutes,
}
