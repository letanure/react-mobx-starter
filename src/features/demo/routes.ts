import type { RouteConfig } from "@/config/routes"
import { Demo } from "./Demo"

export const demoRoutes: RouteConfig = {
  path: "/demo",
  layout: "sidebar",
  component: Demo,
  meta: { title: "Error Demo" },
}
