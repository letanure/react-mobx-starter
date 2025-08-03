import { observer } from "mobx-react-lite"
import { FileUpload } from "@/components/ui/FileUpload"
import { ImageGrid } from "@/components/ui/ImageGrid"
import { Stack } from "@/components/ui/Stack"
import { useStore } from "@/hooks/useStores"

export const DesignManager = observer(() => {
  const store = useStore()

  const handleUpload = (files: File[]) => {
    store.imageStore.add(files)
  }

  return (
    <Stack spacing={8}>
      <ImageGrid images={store.imageStore.getAll()} />
      <FileUpload onFilesSelected={handleUpload} />
    </Stack>
  )
})
