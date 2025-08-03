import { observer } from "mobx-react-lite"
import { FileUpload } from "@/components/ui/FileUpload"
import { ImageGrid } from "@/components/ui/ImageGrid"
import { Stack } from "@/components/ui/Stack"
import { useStore } from "@/hooks/useStores"

export const DesignManager = observer(() => {
  const { imageStore, folderStore } = useStore()

  const handleUpload = (files: File[]) => {
    const imageIds = imageStore.add(files)

    // If a folder is active, add uploaded images to it
    if (folderStore.activeId) {
      imageIds.forEach((imageId) => {
        folderStore.addImageToFolder(folderStore.activeId, imageId)
      })
    }
  }

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

  // Map to plain objects to ensure MobX tracks property changes
  const images = getDisplayImages().map((image) => ({
    id: image.id,
    src: image.src,
    status: image.status,
  }))

  return (
    <Stack spacing={8}>
      <ImageGrid images={images} />
      <FileUpload onFilesSelected={handleUpload} />
    </Stack>
  )
})
