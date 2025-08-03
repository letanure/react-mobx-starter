import { observer } from "mobx-react-lite"
import { FileUpload } from "@/components/ui/FileUpload"
import { Stack } from "@/components/ui/Stack"
import { useStore } from "@/hooks/useStores"
import { ImageGrid } from "./ImageGrid"

export const DesignManager = observer(() => {
  const { imageStore, folderStore } = useStore()

  const handleUpload = (files: File[]) => {
    const imageIds = imageStore.add(files)

    // If a folder is active, add uploaded images to it
    if (folderStore.activeId) {
      folderStore.addImagesToFolder(folderStore.activeId, imageIds)
    }
  }

  return (
    <Stack spacing={8}>
      <ImageGrid />
      <FileUpload onFilesSelected={handleUpload} />
    </Stack>
  )
})
