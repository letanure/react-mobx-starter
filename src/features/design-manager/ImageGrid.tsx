import { observer } from "mobx-react-lite"
import { Grid } from "@/components/ui/Grid"
import { ImageCard } from "@/components/ui/ImageCard"
import { useStore } from "@/hooks/useStores"
import { SelectionBar } from "./SelectionBar"
import { useDisplayImages } from "./useDisplayImages"

const STAGGER_DELAY = 100 // ms between each card animation

export const ImageGrid = observer(() => {
  const { selectionStore } = useStore()
  const images = useDisplayImages()

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <Grid cols={{ default: 5 }} gap={4}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className="animate-scale-in"
            style={{
              animationDelay: `${index * STAGGER_DELAY}ms`,
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
              selected={selectionStore.isSelected(image.id)}
              onToggleSelection={() => selectionStore.toggle(image.id)}
            />
          </div>
        ))}
      </Grid>

      {/* Selection bar - always present, visibility controlled by CSS */}
      <SelectionBar />
    </>
  )
})
