/**
 * Layout Wrapper Component
 *
 * Dynamically renders the appropriate layout based on route configuration.
 * This component is used by the route processor to wrap components with their layouts.
 */

import type { ReactNode } from "react"
import { type LayoutType, layouts } from "./index"

interface LayoutWrapperProps {
  layout: LayoutType
  children: ReactNode
}

export function LayoutWrapper({ layout, children }: LayoutWrapperProps) {
  const LayoutComponent = layouts[layout]

  if (!LayoutComponent) {
    console.warn(`Layout "${layout}" not found, falling back to fullscreen`)
    return <layouts.fullscreen>{children}</layouts.fullscreen>
  }

  return <LayoutComponent>{children}</LayoutComponent>
}
