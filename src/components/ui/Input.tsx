import { useEffect, useRef } from "react"

interface InputProps {
  value: string
  onChange: (value: string) => void
  onEnter?: () => void
  onEscape?: () => void
  placeholder?: string
  type?: string
  autoFocus?: boolean
}

export function Input({
  value,
  onChange,
  onEnter,
  onEscape,
  placeholder = "Enter text",
  type = "text",
  autoFocus = false,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) onEnter()
    if (e.key === "Escape" && onEscape) onEscape()
  }

  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className="px-2 py-0 border-none bg-accent-600 focus:outline-none text-white placeholder-gray-200 w-32 rounded"
    />
  )
}
