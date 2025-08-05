/**
 * English locale translations aggregated from features
 */

import { demoTranslations } from "@/features/demo/i18n/en"
import { todoTranslations } from "@/features/todo/i18n/en"

export const en = {
  todo: todoTranslations,
  demo: demoTranslations,
  theme: {
    toggle: "Toggle theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  time: {
    justNow: "just now",
    minutesAgo_one: "{{count}} minute ago",
    minutesAgo_other: "{{count}} minutes ago",
    hoursAgo_one: "{{count}} hour ago",
    hoursAgo_other: "{{count}} hours ago",
    daysAgo_one: "{{count}} day ago",
    daysAgo_other: "{{count}} days ago",
  },
}
