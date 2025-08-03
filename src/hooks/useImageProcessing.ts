import { reaction } from "mobx"
import { useEffect } from "react"
import { useStore } from "@/hooks/useStores"
import { removeBackground } from "@/services/photoroom/photoroomService"

export function useAutoBackgroundRemoval() {
  const { imageStore } = useStore()

  useEffect(() => {
    const stopWatching = reaction(
      () => imageStore.getByStatus("uploaded"),
      async (newUploadedImages) => {
        if (newUploadedImages.length === 0) return

        // Mark all as processing immediately to remove from "uploaded" status
        for (const image of newUploadedImages) {
          imageStore.update(image.id, { status: "processing" })
        }

        // Then process each one async
        for (const image of newUploadedImages) {
          const apiResult = await removeBackground(image.file)

          if (apiResult.error) {
            imageStore.update(image.id, { status: "error" })
            continue
          }

          const processedBlob = apiResult.data as Blob
          imageStore.update(image.id, {
            status: "completed",
            src: URL.createObjectURL(processedBlob),
            processedBlob: processedBlob, // Store the processed blob for persistence
          })

          // Auto-hide badge after delay by changing status to "processed"
          setTimeout(() => {
            imageStore.update(image.id, { status: "processed" })
          }, 1500) // Match BADGE_HIDE_DELAY from ImageCard
        }
      },
    )

    return stopWatching
  }, [imageStore])
}
