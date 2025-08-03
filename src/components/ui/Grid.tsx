import type { ReactNode } from "react"

interface GridProps {
  children: ReactNode
  className?: string
  cols?: {
    default: number
    md?: number
    lg?: number
  }
  gap?: number
}

export function Grid({
  children,
  className = "",
  cols = { default: 2, md: 3, lg: 4 },
  gap = 4,
}: GridProps) {
  const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  }

  const gapMap = {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
  }

  const gridCols =
    colsMap[cols.default as keyof typeof colsMap] || "grid-cols-2"
  const gridColsMd = cols.md
    ? `md:${colsMap[cols.md as keyof typeof colsMap]}`
    : ""
  const gridColsLg = cols.lg
    ? `lg:${colsMap[cols.lg as keyof typeof colsMap]}`
    : ""
  const gridGap = gapMap[gap as keyof typeof gapMap] || "gap-4"

  return (
    <div
      className={`grid ${gridCols} ${gridColsMd} ${gridColsLg} ${gridGap} ${className}`}
    >
      {children}
    </div>
  )
}
