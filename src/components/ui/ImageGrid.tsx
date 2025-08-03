import { Grid } from "./Grid"
import { ImageCard } from "./ImageCard"

interface ImageGridProps {
  images: Array<{
    id: string
    url: string
  }>
}

export function ImageGrid({ images }: ImageGridProps) {
  if (images.length === 0) {
    return null
  }

  return (
    <Grid cols={{ default: 5 }} gap={4}>
      {images.map((image) => (
        <ImageCard key={image.id} src={image.url} alt="Uploaded image" />
      ))}
    </Grid>
  )
}
