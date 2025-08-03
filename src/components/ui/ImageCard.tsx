import type { ReactNode } from "react"

type Status = "uploaded" | "processing" | "completed" | "error"

interface ImageCardProps {
  src: string
  alt?: string
  status?: Status
  onRemove?: () => void
  actions?: ReactNode
  className?: string
}

export function ImageCard({
  src,
  alt = "Image",
  status,
  onRemove,
  actions,
  className = "",
}: ImageCardProps) {
  return (
    <div
      className={`relative bg-neutral-0 rounded-lg overflow-hidden border border-neutral-3 ${className}`}
    >
      <div className="aspect-square relative">
        <img src={src} alt={alt} className="w-full h-full object-cover" />

        {status && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 text-white">
            <span className="text-sm">{status}</span>
          </div>
        )}

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-lg transition-colors"
            aria-label="Remove image"
          >
            X
          </button>
        )}

        {actions && <div className="absolute bottom-2 right-2">{actions}</div>}
      </div>
    </div>
  )
}
