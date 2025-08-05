import { FullscreenLayout } from "./FullscreenLayout"
import { SidebarLayout } from "./SidebarLayout"

export const layouts = {
  fullscreen: FullscreenLayout,
  sidebar: SidebarLayout,
} as const

export type LayoutType = keyof typeof layouts

// Re-export individual layouts
export { FullscreenLayout, SidebarLayout }
