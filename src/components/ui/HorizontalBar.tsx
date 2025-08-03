import type { ReactNode } from "react"

interface HorizontalBarProps {
  children: ReactNode
}

export function HorizontalBar({ children }: HorizontalBarProps) {
  return (
    <div className="w-full bg-gray-50 border-b border-gray-200 p-4">
      <div className="flex items-center gap-4 overflow-x-auto">{children}</div>
    </div>
  )
}
