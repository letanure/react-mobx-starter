import type { Icon } from "@tabler/icons-react"

// Types
type IconButtonSize = "small" | "medium" | "large"
type IconButtonVariant = "default" | "danger" | "accent" | "light"

interface IconButtonProps {
  icon: Icon
  onClick: () => void
  size?: IconButtonSize
  variant?: IconButtonVariant
  title?: string
  type?: "button" | "submit" | "reset"
}

// Styles
const sizeStyles: Record<IconButtonSize, { button: string; icon: number }> = {
  small: { button: "p-1", icon: 16 },
  medium: { button: "p-2", icon: 16 },
  large: { button: "p-3", icon: 20 },
}

const variantStyles: Record<IconButtonVariant, string> = {
  default: "text-gray-400 hover:text-gray-600",
  danger: "text-gray-400 hover:text-red-600",
  accent: "text-gray-400 hover:text-accent-600",
  light: "text-white hover:text-gray-200",
}

export function IconButton({
  icon: IconComponent,
  onClick,
  size = "medium",
  variant = "default",
  title,
  type = "button",
}: IconButtonProps) {
  // Computed values
  const sizeConfig = sizeStyles[size]
  const variantClass = variantStyles[variant]

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${sizeConfig.button} ${variantClass} transition-colors`}
      title={title}
      aria-label={title}
    >
      <IconComponent size={sizeConfig.icon} />
    </button>
  )
}
