import type { ReactNode } from "react"

interface StackProps {
  children: ReactNode
  spacing?: number
  direction?: "vertical" | "horizontal"
  className?: string
}

export function Stack({
  children,
  spacing = 4,
  direction = "vertical",
  className = "",
}: StackProps) {
  const spacingMap = {
    1: "space-y-1",
    2: "space-y-2",
    3: "space-y-3",
    4: "space-y-4",
    5: "space-y-5",
    6: "space-y-6",
    7: "space-y-7",
    8: "space-y-8",
  }

  const spacingMapHorizontal = {
    1: "space-x-1",
    2: "space-x-2",
    3: "space-x-3",
    4: "space-x-4",
    5: "space-x-5",
    6: "space-x-6",
    7: "space-x-7",
    8: "space-x-8",
  }

  const flexDirection = direction === "horizontal" ? "flex-row" : "flex-col"
  const spacingClass =
    direction === "horizontal"
      ? spacingMapHorizontal[spacing as keyof typeof spacingMapHorizontal] ||
        "space-x-4"
      : spacingMap[spacing as keyof typeof spacingMap] || "space-y-4"

  return (
    <div className={`flex ${flexDirection} ${spacingClass} ${className}`}>
      {children}
    </div>
  )
}
