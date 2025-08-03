import { useEffect, useRef } from "react"

// Types
interface InputProps {
  value: string
  onChange: (value: string) => void
  onEnter?: () => void
  onEscape?: () => void
  placeholder?: string
  type?: string
  autoFocus?: boolean
  variant?: "default" | "accent"
  size?: "sm" | "md" | "lg"
}

// Styles
const inputStyles = {
  base: "border-none focus:outline-none rounded transition-colors",
}

const variantStyles: Record<string, string> = {
  default: "bg-white text-gray-900 placeholder-gray-500 border border-gray-300",
  accent: "bg-accent-600 text-white placeholder-gray-200",
}

const sizeStyles: Record<string, string> = {
  sm: "px-2 py-1 text-sm w-24",
  md: "px-2 py-0 w-32",
  lg: "px-3 py-2 text-lg w-48",
}

export function Input({
  value,
  onChange,
  onEnter,
  onEscape,
  placeholder = "Enter text",
  type = "text",
  autoFocus = false,
  variant = "accent",
  size = "md",
}: InputProps) {
  // Refs
  const inputRef = useRef<HTMLInputElement>(null)

  // Effects
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // Event handlers
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) onEnter()
    if (e.key === "Escape" && onEscape) onEscape()
  }

  // Computed values
  const inputClasses = {
    variant: variantStyles[variant],
    size: sizeStyles[size],
  }

  const finalClassName = [
    inputStyles.base,
    inputClasses.variant,
    inputClasses.size,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={finalClassName}
    />
  )
}
