import { AlertTriangle, Code } from "lucide-react"
import type { RouteConfig } from "@/config/routes"
import { ApiDemo } from "./ApiDemo"
import { Demo } from "./Demo"

export const demoRoutes: RouteConfig = {
  path: "/demo",
  layout: "sidebar",
  children: [
    {
      path: "",
      component: Demo,
      meta: {
        titleKey: "demo.pages.errorDemo",
        nav: {
          icon: AlertTriangle,
          translationKey: "demo.navigation.errorDemo",
          section: "demo.navigation.section",
        },
      },
    },
    {
      path: "api",
      component: ApiDemo,
      meta: {
        titleKey: "demo.pages.apiIntegration",
        nav: {
          icon: Code,
          translationKey: "demo.navigation.apiIntegration",
          section: "demo.navigation.section",
        },
      },
    },
  ],
}
