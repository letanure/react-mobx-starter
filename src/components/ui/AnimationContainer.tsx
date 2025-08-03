import type { ReactNode } from "react"

// Types
interface AnimationContainerProps {
  children: ReactNode
  animation?: "scale-in" | "fade-in" | "slide-in"
  delay?: number
  staggerIndex?: number
  staggerDelay?: number
  className?: string
}

// Styles
const animationStyles: Record<string, string> = {
  "scale-in": "animate-scale-in",
  "fade-in": "animate-fade-in-delayed",
  "slide-in": "animate-slide-in",
}

export function AnimationContainer({
  children,
  animation = "scale-in",
  delay = 0,
  staggerIndex,
  staggerDelay = 100,
  className = "",
}: AnimationContainerProps) {
  // Computed values
  const animationClass = animationStyles[animation]
  const finalClassName = [animationClass, className].filter(Boolean).join(" ")

  const finalDelay =
    staggerIndex !== undefined ? staggerIndex * staggerDelay : delay

  return (
    <div
      className={finalClassName}
      style={{
        animationDelay: `${finalDelay}ms`,
        animationFillMode: "backwards",
      }}
    >
      {children}
    </div>
  )
}
