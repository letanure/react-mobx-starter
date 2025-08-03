import type { ReactNode } from "react"

type TextSize = "xs" | "sm" | "base" | "lg" | "xl"
type TextVariant = "body" | "caption" | "label"
type TextElement = "span" | "p" | "div"

interface TextProps {
  children: ReactNode
  size?: TextSize
  variant?: TextVariant
  muted?: boolean
  className?: string
  as?: TextElement
}

const sizeStyles: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

const variantStyles: Record<TextVariant, string> = {
  body: "",
  caption: "text-sm",
  label: "font-medium",
}

export function Text({
  children,
  size,
  variant = "body",
  muted = false,
  className = "",
  as: Element = "span",
}: TextProps) {
  // Size takes precedence over variant size
  const textSize = size ? sizeStyles[size] : variantStyles[variant]
  const mutedClass = muted ? "opacity-75" : ""

  const classes = [textSize, mutedClass, className].filter(Boolean).join(" ")

  return <Element className={classes}>{children}</Element>
}
