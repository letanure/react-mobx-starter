import { useStore } from "@/hooks/useStores"
import type { ImageModel } from "@/stores/ImageStore"

/**
 * Gets images to display based on folder selection.
 * @returns All images or filtered by active folder
 */
export function useDisplayImages(): ImageModel[] {
  const { imageStore, folderStore } = useStore()

  // Avoid double lookups
  const activeFolder = folderStore.activeId
    ? folderStore.getById(folderStore.activeId)
    : null

  // No filtering needed
  if (!folderStore.activeId) {
    return imageStore.getAll()
  }

  return imageStore.getByIds(activeFolder?.imageIds || [])
}
