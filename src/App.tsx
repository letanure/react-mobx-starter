import { observer } from "mobx-react-lite"
import { Layout } from "@/components/layouts/Layout"
import { LoadingOverlay } from "@/components/ui/LoadingOverlay"
import { DesignManager } from "@/features/design-manager/DesignManager"
import { FolderManager } from "@/features/folder-manager/FolderManager"
import { useCleanup } from "@/hooks/useCleanup"
import { useAutoBackgroundRemoval } from "@/hooks/useImageProcessing"
import { useStore } from "@/hooks/useStores"

const App = observer(() => {
  const { isHydrating } = useStore()
  useAutoBackgroundRemoval()
  useCleanup()

  return (
    <div className="relative">
      <Layout>
        <FolderManager />
        <DesignManager />
      </Layout>

      {isHydrating && <LoadingOverlay />}
    </div>
  )
})

export default App
