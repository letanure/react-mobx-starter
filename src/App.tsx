import { Layout } from "@/components/layouts/Layout"
import { DesignManager } from "@/features/design-manager/DesignManager"
import { FolderManager } from "@/features/folder-manager/FolderManager"
import { useAutoBackgroundRemoval } from "@/hooks/useImageProcessing"

function App() {
  useAutoBackgroundRemoval()

  return (
    <Layout>
      <FolderManager />
      <DesignManager />
    </Layout>
  )
}

export default App
