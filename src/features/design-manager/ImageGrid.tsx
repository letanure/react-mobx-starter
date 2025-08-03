import { observer } from "mobx-react-lite"
import { AnimationContainer } from "@/components/ui/AnimationContainer"
import { Grid } from "@/components/ui/Grid"
import { ImageCard } from "@/components/ui/ImageCard"
import { useStore } from "@/hooks/useStores"
import { SelectionBar } from "./SelectionBar"
import { useDisplayImages } from "./useDisplayImages"

export const ImageGrid = observer(() => {
  // Store access
  const { selectionStore } = useStore()
  const images = useDisplayImages()

  // Early return for empty state
  if (images.length === 0) {
    return null
  }

  return (
    <>
      <Grid cols={{ default: 5 }} gap={4}>
        {images.map((image, index) => (
          <AnimationContainer
            key={image.id}
            animation="scale-in"
            staggerIndex={index}
          >
            <ImageCard
              src={image.src}
              status={image.status}
              selected={selectionStore.isSelected(image.id)}
              onToggleSelection={() => selectionStore.toggle(image.id)}
            />
          </AnimationContainer>
        ))}
      </Grid>

      {/* Selection bar - always present, visibility controlled by CSS */}
      <SelectionBar />
    </>
  )
})
