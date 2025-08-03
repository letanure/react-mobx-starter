// Types
interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  variant?: "default" | "accent" | "minimal"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
}

// Styles
const selectStyles = {
  base: "border rounded-lg focus:outline-none focus:ring-2 transition-colors",
}

const variantStyles: Record<string, string> = {
  default: "bg-white border-gray-300 text-gray-900 focus:ring-blue-500",
  accent:
    "bg-accent-50 border-accent-300 text-accent-900 focus:ring-accent-500",
  minimal: "bg-transparent border-gray-200 text-gray-700 focus:ring-gray-400",
}

const sizeStyles: Record<string, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
}

const stateStyles: Record<string, string> = {
  enabled: "",
  disabled: "opacity-50 cursor-not-allowed",
}

const optionStyles = {
  placeholder: "text-gray-500",
  option: "text-gray-900",
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  variant = "default",
  size = "md",
  disabled = false,
}: SelectProps) {
  // Computed values
  const selectClasses = {
    variant: variantStyles[variant],
    size: sizeStyles[size],
    state: stateStyles[disabled ? "disabled" : "enabled"],
  }

  const finalClassName = [
    selectStyles.base,
    selectClasses.variant,
    selectClasses.size,
    selectClasses.state,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className={finalClassName}
      disabled={disabled}
    >
      <option value="" disabled className={optionStyles.placeholder}>
        {placeholder}
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={optionStyles.option}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
