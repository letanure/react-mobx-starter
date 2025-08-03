import { type ReactNode, useEffect, useRef, useState } from "react"
import type { ImageStatus } from "@/stores/ImageStore"

interface ImageCardProps {
  src: string
  alt?: string
  status?: ImageStatus
  onRemove?: () => void
  actions?: ReactNode
  className?: string
}

// Animation constants
const BADGE_HIDE_DELAY = 1500
const BADGE_FADE_DURATION = "0.5s"

export function ImageCard({
  src,
  alt = "Image",
  status,
  onRemove,
  actions,
  className = "",
}: ImageCardProps) {
  const [hideBadge, setHideBadge] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [overlayImageSrc, setOverlayImageSrc] = useState("")
  const previousSrc = useRef(src)

  // Reset image loaded state when src changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: src is a prop that triggers reset
  useEffect(() => {
    setImageLoaded(false)
  }, [src])

  // Crossfade effect when src changes
  useEffect(() => {
    if (src !== previousSrc.current && previousSrc.current) {
      // Store old image and show overlay
      setOverlayImageSrc(previousSrc.current)
      setShowOverlay(true)

      // Start fade out after brief delay
      setTimeout(() => setShowOverlay(false), 100)
    }

    // Update ref for next comparison
    previousSrc.current = src
  }, [src])

  // Auto-hide badge after completion
  useEffect(() => {
    if (status === "completed") {
      const timer = setTimeout(() => setHideBadge(true), BADGE_HIDE_DELAY)
      return () => clearTimeout(timer)
    } else {
      setHideBadge(false)
    }
  }, [status])

  return (
    <div
      className={`w-full aspect-[217/290] rounded-lg shadow-md p-4 transition-colors duration-300 ${
        status === "error" ? "bg-red-200" : "bg-white"
      } ${className}`}
    >
      <div className="relative w-full h-full border border-gray-200 rounded overflow-hidden">
        {/* New image - bottom layer */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain transition-opacity duration-700"
          style={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Crossfade overlay - old image fades out */}
        {overlayImageSrc && (
          <img
            src={overlayImageSrc}
            alt={`${alt} (previous)`}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-1000"
            style={{ opacity: showOverlay ? 1 : 0 }}
          />
        )}

        {/* Loading placeholder */}
        {!imageLoaded && <div className="absolute inset-0 bg-gray-100"></div>}

        {/* Status badge with optional spinner */}
        {status && status !== "processed" && (
          <div
            className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
            style={{
              opacity: hideBadge ? 0 : 1,
              transition: `opacity ${BADGE_FADE_DURATION} ease-out`,
            }}
          >
            {status === "processing" && (
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {status}
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
