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

export function ImageGrid({ images }: ImageGridProps) {
  if (images.length === 0) {
    return null
  }

  return (
    <Grid cols={{ default: 5 }} gap={4}>
      {images.map((image) => (
        <ImageCard
          key={image.id}
          src={image.src}
          alt={
            image.status === "completed" ? "Processed image" : "Original image"
          }
          status={image.status}
        />
      ))}
    </Grid>
  )
}
