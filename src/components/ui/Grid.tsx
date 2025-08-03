import type { ReactNode } from "react"

// Types
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

// Style mappings
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

export function Grid({
  children,
  className = "",
  cols = { default: 2, md: 3, lg: 4 },
  gap = 4,
}: GridProps) {
  // Computed values
  const gridClasses = {
    base: colsMap[cols.default as keyof typeof colsMap] || colsMap[2],
    md: cols.md ? `md:${colsMap[cols.md as keyof typeof colsMap]}` : "",
    lg: cols.lg ? `lg:${colsMap[cols.lg as keyof typeof colsMap]}` : "",
    gap: gapMap[gap as keyof typeof gapMap] || gapMap[4],
  }

  const finalClassName = [
    "grid",
    gridClasses.base,
    gridClasses.md,
    gridClasses.lg,
    gridClasses.gap,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return <div className={finalClassName}>{children}</div>
}
