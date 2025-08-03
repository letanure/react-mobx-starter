import { Layout } from "@/components/layouts/Layout"
import { DesignManager } from "@/features/design-manager/DesignManager"
import { useAutoBackgroundRemoval } from "@/hooks/useImageProcessing"

function App() {
  useAutoBackgroundRemoval()

  return (
    <Layout>
      <DesignManager />
    </Layout>
  )
}

export default App
