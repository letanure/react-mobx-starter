import { IconCheck, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import type { ImageStatus } from "@/stores/ImageStore"
import { IconButton } from "./IconButton"

interface ImageCardProps {
  src: string
  alt?: string
  status?: ImageStatus
  onRemove?: () => void
  className?: string
  selected?: boolean
  onToggleSelection?: () => void
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
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className={`w-full aspect-[217/290] rounded-lg shadow-md p-4 transition-all duration-300 ${
        status === "error" ? "bg-red-200" : "bg-white"
      } ${selected ? "ring-2 ring-blue-500" : ""} ${className}`}
    >
      <div className="relative w-full h-full border border-gray-200 rounded overflow-hidden group">
        {/* Image with loading state */}
        {!imageError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            <span className="text-sm">Failed to load</span>
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Controls overlay - visible on hover or when selected */}
        <div
          className={`absolute inset-0 ${selected || "opacity-0 group-hover:opacity-100"} transition-opacity`}
        >
          {onToggleSelection && (
            <button
              type="button"
              onClick={onToggleSelection}
              className={`absolute top-2 left-2 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                selected
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-white/80 border-gray-300 hover:border-blue-400"
              }`}
              aria-label={selected ? "Deselect image" : "Select image"}
            >
              {selected && <IconCheck size={16} />}
            </button>
          )}

          {onRemove && (
            <div className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded">
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
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
            {status === "processing" && (
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
            )}
            {status}
          </div>
        )}
      </div>
    </div>
  )
}
