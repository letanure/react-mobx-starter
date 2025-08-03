import { observer } from "mobx-react-lite"
import { FileUpload } from "@/components/ui/FileUpload"
import { ImageGrid } from "@/components/ui/ImageGrid"
import { Stack } from "@/components/ui/Stack"
import { useStore } from "@/hooks/useStores"

export const DesignManager = observer(() => {
  const { imageStore } = useStore()

  const handleUpload = (files: File[]) => {
    imageStore.add(files)
  }

  // Map to plain objects to ensure MobX tracks property changes
  const images = imageStore.getAll().map((image) => ({
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
