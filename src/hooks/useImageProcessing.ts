import { reaction } from "mobx"
import { useEffect } from "react"
import { useStore } from "@/hooks/useStores"
import { removeBackground } from "@/services/photoroom/photoroomService"

/**
 * Auto-processes uploaded images with background removal.
 * Watches for new uploads and processes them asynchronously.
 */
export function useAutoBackgroundRemoval() {
  // Store access
  const { imageStore } = useStore()

  useEffect(() => {
    const stopWatching = reaction(
      () => imageStore.getByStatus("uploaded"),
      async (newUploadedImages) => {
        if (newUploadedImages.length === 0) return

        // Prevent race conditions by marking immediately
        for (const image of newUploadedImages) {
          imageStore.update(image.id, { status: "processing" })
        }

        // Process each image
        for (const image of newUploadedImages) {
          const apiResult = await removeBackground(image.file)

          if (apiResult.error) {
            imageStore.update(image.id, { status: "error" })
            continue
          }

          const processedBlob = apiResult.data
          imageStore.update(image.id, {
            status: "completed",
            src: URL.createObjectURL(processedBlob),
            processedBlob: processedBlob,
          })

          // Hide badge after delay
          setTimeout(() => {
            imageStore.update(image.id, { status: "processed" })
          }, 1500)
        }
      },
    )

    return stopWatching
  }, [imageStore])
}
