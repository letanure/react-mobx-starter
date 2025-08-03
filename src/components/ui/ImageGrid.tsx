import { useEffect, useState } from "react"
import { Grid } from "./Grid"
import { ImageCard } from "./ImageCard"

type Status = "uploaded" | "processing" | "completed" | "error"

interface ImageData {
  id: string
  src: string
  status: Status
}

interface ImageGridProps {
  images: ImageData[]
}

const STAGGER_DELAY = 100 // ms between each card animation

export function ImageGrid({ images }: ImageGridProps) {
  const [animatedIds, setAnimatedIds] = useState<Set<string>>(new Set())

  // Track which images should animate (new ones)
  useEffect(() => {
    const newIds = images
      .filter((img) => !animatedIds.has(img.id))
      .map((img) => img.id)

    if (newIds.length > 0) {
      setAnimatedIds((prev) => new Set([...prev, ...newIds]))
    }
  }, [images, animatedIds])

  if (images.length === 0) {
    return null
  }

  return (
    <Grid cols={{ default: 5 }} gap={4}>
      {images.map((image, index) => {
        const isNew =
          !animatedIds.has(image.id) || animatedIds.size === images.length
        const animationDelay = isNew ? index * STAGGER_DELAY : 0

        return (
          <div
            key={image.id}
            className="animate-scale-in"
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
