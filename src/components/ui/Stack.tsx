import type { ReactNode } from "react"

// Types
interface StackProps {
  children: ReactNode
  spacing?: number
  direction?: "vertical" | "horizontal"
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  wrap?: boolean
  className?: string
}

// Styles
const stackStyles = {
  base: "flex",
}

const directionStyles: Record<string, string> = {
  vertical: "flex-col",
  horizontal: "flex-row",
}

const spacingStyles = {
  vertical: {
    1: "space-y-1",
    2: "space-y-2",
    3: "space-y-3",
    4: "space-y-4",
    5: "space-y-5",
    6: "space-y-6",
    7: "space-y-7",
    8: "space-y-8",
  },
  horizontal: {
    1: "space-x-1",
    2: "space-x-2",
    3: "space-x-3",
    4: "space-x-4",
    5: "space-x-5",
    6: "space-x-6",
    7: "space-x-7",
    8: "space-x-8",
  },
}

const alignStyles: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
}

const justifyStyles: Record<string, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
}

const wrapStyles: Record<string, string> = {
  wrap: "flex-wrap",
  nowrap: "",
}

export function Stack({
  children,
  spacing = 4,
  direction = "vertical",
  align,
  justify,
  wrap = false,
  className = "",
}: StackProps) {
  // Computed values
  const stackClasses = {
    direction: directionStyles[direction],
    spacing:
      spacingStyles[direction][
        spacing as keyof typeof spacingStyles.vertical
      ] || spacingStyles[direction][4],
    align: align ? alignStyles[align] : "",
    justify: justify ? justifyStyles[justify] : "",
    wrap: wrapStyles[wrap ? "wrap" : "nowrap"],
  }

  const finalClassName = [
    stackStyles.base,
    stackClasses.direction,
    stackClasses.spacing,
    stackClasses.align,
    stackClasses.justify,
    stackClasses.wrap,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return <div className={finalClassName}>{children}</div>
}
