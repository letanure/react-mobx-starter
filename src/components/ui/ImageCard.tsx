import { IconCheck, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import type { ImageStatus } from "@/stores/ImageStore"
import { IconButton } from "./IconButton"

// Types
interface ImageCardProps {
  src: string
  alt?: string
  status?: ImageStatus
  onRemove?: () => void
  className?: string
  selected?: boolean
  onToggleSelection?: () => void
}

// Styles
const cardStyles = {
  base: "w-full aspect-[217/290] rounded-lg shadow-md p-4 transition-all duration-300",
  container:
    "relative w-full h-full border border-gray-200 rounded overflow-hidden group",
  image: "w-full h-full object-contain",
  overlay:
    "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
  deleteButton: "absolute top-2 right-2 bg-white/80 hover:bg-white rounded",
}

const statusStyles: Record<string, string> = {
  error: "bg-red-200",
  default: "bg-white",
}

const selectedStyles: Record<string, string> = {
  selected: "ring-2 ring-blue-500",
  default: "",
}

const checkboxStyles: Record<string, string> = {
  selected: "bg-blue-500 border-blue-500 text-white",
  default: "bg-white/80 border-gray-300 hover:border-blue-400",
  base: "absolute top-2 left-2 w-6 h-6 rounded border-2 flex items-center justify-center transition-all",
}

const controlsStyles: Record<string, string> = {
  visible: "opacity-100",
  hidden: "opacity-0 group-hover:opacity-100",
  base: "absolute inset-0 transition-opacity",
}

const errorStateStyles = {
  container:
    "w-full h-full bg-gray-100 flex items-center justify-center text-gray-400",
  text: "text-sm",
}

const statusBadgeStyles = {
  container:
    "absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1",
  spinner:
    "w-3 h-3 border border-white border-t-transparent rounded-full animate-spin",
}

export function ImageCard({
  src,
  alt = "Image",
  status,
  onRemove,
  className = "",
  selected = false,
  onToggleSelection,
}: ImageCardProps) {
  // State
  const [imageError, setImageError] = useState(false)

  // Computed values
  const cardClasses = {
    status: statusStyles[status === "error" ? "error" : "default"],
    selected: selectedStyles[selected ? "selected" : "default"],
    checkbox: checkboxStyles[selected ? "selected" : "default"],
    controls: controlsStyles[selected ? "visible" : "hidden"],
  }

  const finalCardClassName = [
    cardStyles.base,
    cardClasses.status,
    cardClasses.selected,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const checkboxClassName = [checkboxStyles.base, cardClasses.checkbox]
    .filter(Boolean)
    .join(" ")

  const controlsClassName = [controlsStyles.base, cardClasses.controls]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={finalCardClassName}>
      <div className={cardStyles.container}>
        {/* Image with loading state */}
        {!imageError ? (
          <img
            src={src}
            alt={alt}
            className={cardStyles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={errorStateStyles.container}>
            <span className={errorStateStyles.text}>Failed to load</span>
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className={cardStyles.overlay} />

        {/* Controls overlay - visible on hover or when selected */}
        <div className={controlsClassName}>
          {onToggleSelection && (
            <button
              type="button"
              onClick={onToggleSelection}
              className={checkboxClassName}
              aria-label={selected ? "Deselect image" : "Select image"}
            >
              {selected && <IconCheck size={16} />}
            </button>
          )}

          {onRemove && (
            <div className={cardStyles.deleteButton}>
              <IconButton
                icon={IconTrash}
                onClick={onRemove}
                size="small"
                variant="danger"
                title="Delete image"
              />
            </div>
          )}
        </div>

        {/* Status badge */}
        {status && status !== "processed" && (
          <div className={statusBadgeStyles.container}>
            {status === "processing" && (
              <div className={statusBadgeStyles.spinner} />
            )}
            {status}
          </div>
        )}
      </div>
    </div>
  )
}
