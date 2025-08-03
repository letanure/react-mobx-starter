import type { Icon } from "@tabler/icons-react"
import type { ReactNode } from "react"

// Types
type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "tag"
  | "icon"
  | "danger-icon"

interface ButtonProps {
  children?: ReactNode
  label?: string
  icon?: Icon
  onClick?: () => void
  variant?: ButtonVariant
  isSelected?: boolean
  title?: string
  type?: "button" | "submit" | "reset"
}

// Styles
const variantStyles: Record<ButtonVariant, string> = {
  primary: "px-3 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600",
  secondary: "px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300",
  danger: "px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600",
  tag: "px-4 py-2 rounded-lg font-medium transition-all duration-300 border",
  icon: "p-2 text-gray-600 hover:text-accent-600 transition-colors",
  "danger-icon": "p-2 text-gray-600 hover:text-red-600 transition-colors",
}

const tagSelectedStyles: Record<string, string> = {
  selected: "bg-accent-500 text-white border-accent-500",
  default: "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200",
}

export function Button({
  children,
  label,
  icon: IconComponent,
  onClick,
  variant = "primary",
  isSelected = false,
  title,
  type = "button",
}: ButtonProps) {
  // Computed values
  const baseStyles = variantStyles[variant]
  const tagStyles =
    variant === "tag"
      ? tagSelectedStyles[isSelected ? "selected" : "default"]
      : ""
  const finalClassName = `${baseStyles} ${tagStyles}`.trim()

  return (
    <button
      type={type}
      onClick={onClick}
      className={finalClassName}
      title={title}
    >
      <div className="flex items-center gap-2">
        {IconComponent && <IconComponent size={16} />}
        {label}
        {children}
      </div>
    </button>
  )
}
