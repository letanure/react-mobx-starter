import { useStore } from "@/hooks/useStores"

export function useDisplayImages() {
  const { imageStore, folderStore } = useStore()

  // Filter images based on active folder - MobX observer handles reactivity
  const getDisplayImages = () => {
    if (!folderStore.activeId) {
      // Show ALL images when no folder is selected
      return imageStore.getAll()
    }

    // Show folder-specific images
    const folder = folderStore.getById(folderStore.activeId)
    return imageStore.getByIds(folder?.imageIds || [])
  }

  return getDisplayImages()
}
