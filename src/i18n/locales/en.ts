/**
 * English locale translations aggregated from features
 */

import { todoTranslations } from "@/features/todo/i18n/en"

export const en = {
  todo: todoTranslations,
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
