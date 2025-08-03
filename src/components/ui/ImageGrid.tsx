import { useEffect, useState } from "react"
import type { ImageStatus } from "@/stores/ImageStore"
import { Grid } from "./Grid"
import { ImageCard } from "./ImageCard"

interface ImageData {
  id: string
  src: string
  status: ImageStatus
}

interface ImageGridProps {
  images: ImageData[]
}

const STAGGER_DELAY = 100 // ms between each card animation
const EXIT_DURATION = 200 // ms for exit animation

export function ImageGrid({ images }: ImageGridProps) {
  const [animatedIds, setAnimatedIds] = useState<Set<string>>(new Set())
  const [exitingIds, setExitingIds] = useState<Set<string>>(new Set())
  const [displayImages, setDisplayImages] = useState(images)

  // Handle image changes - detect exits and entries
  useEffect(() => {
    const currentIds = new Set(images.map((img) => img.id))

    // Find images that are exiting (in display but not in new images)
    const exitingImageIds = displayImages
      .filter((img) => !currentIds.has(img.id))
      .map((img) => img.id)

    if (exitingImageIds.length > 0) {
      // Start exit animation
      setExitingIds(new Set(exitingImageIds))

      // Remove exiting images after animation completes
      setTimeout(() => {
        setDisplayImages(images)
        setExitingIds(new Set())
      }, EXIT_DURATION)
    } else {
      // No exits, update display immediately
      setDisplayImages(images)
    }

    // Track new images for entry animation
    const newIds = images
      .filter((img) => !animatedIds.has(img.id))
      .map((img) => img.id)

    if (newIds.length > 0) {
      setAnimatedIds((prev) => new Set([...prev, ...newIds]))
    }
  }, [images, displayImages, animatedIds])

  if (displayImages.length === 0) {
    return null
  }

  return (
    <Grid cols={{ default: 5 }} gap={4}>
      {displayImages.map((image, index) => {
        const isExiting = exitingIds.has(image.id)
        const isNew =
          !animatedIds.has(image.id) || animatedIds.size === images.length
        const animationDelay = isNew && !isExiting ? index * STAGGER_DELAY : 0

        return (
          <div
            key={image.id}
            className={isExiting ? "animate-scale-out" : "animate-scale-in"}
            style={{
              animationDelay: `${animationDelay}ms`,
              animationFillMode: "backwards",
            }}
          >
            <ImageCard
              src={image.src}
              alt={
                image.status === "completed"
                  ? "Processed image"
                  : "Original image"
              }
              status={image.status}
            />
          </div>
        )
      })}
    </Grid>
  )
}
