import type { ReactNode } from "react"

type TextSize = "xs" | "sm" | "base" | "lg" | "xl"
type TextVariant = "body" | "caption" | "label"
type TextElement = "span" | "p" | "div"
type TextColor = "default" | "muted" | "accent" | "danger" | "inherit"
type TextSpacing = "none" | "xs" | "sm" | "md" | "lg"

interface TextProps {
  children: ReactNode
  size?: TextSize
  variant?: TextVariant
  color?: TextColor
  muted?: boolean
  spacing?: TextSpacing
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

const colorStyles: Record<TextColor, string> = {
  default: "text-gray-900",
  muted: "text-gray-700",
  accent: "text-accent-600",
  danger: "text-red-600",
  inherit: "",
}

const spacingStyles: Record<TextSpacing, string> = {
  none: "",
  xs: "ml-1",
  sm: "ml-2",
  md: "ml-4",
  lg: "ml-6",
}

export function Text({
  children,
  size,
  variant = "body",
  color = "default",
  muted = false,
  spacing = "none",
  className = "",
  as: Element = "span",
}: TextProps) {
  // Size takes precedence over variant size
  const textSize = size ? sizeStyles[size] : variantStyles[variant]
  const textColor = colorStyles[color]
  const textSpacing = spacingStyles[spacing]
  const mutedClass = muted ? "opacity-75" : ""

  const classes = [textSize, textColor, textSpacing, mutedClass, className]
    .filter(Boolean)
    .join(" ")

  return <Element className={classes}>{children}</Element>
}
