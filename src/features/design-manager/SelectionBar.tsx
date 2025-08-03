import { IconFolder, IconTrash } from "@tabler/icons-react"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/Button"
import { ConfirmModal } from "@/components/ui/ConfirmModal"
import { IconButton } from "@/components/ui/IconButton"
import { Select } from "@/components/ui/Select"
import { Text } from "@/components/ui/Text"
import { useStore } from "@/hooks/useStores"
import { useDisplayImages } from "./useDisplayImages"

// Styles
const barStyles = {
  base: "fixed bottom-4 left-1/2 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 flex items-center gap-4 z-10 transition-all duration-300",
  controls: "flex items-center gap-2",
  folderSection: "flex items-center gap-2 px-2 border-l border-gray-200",
  folderIcon: "text-gray-500",
}

const visibilityStyles: Record<string, string> = {
  visible: "translate-y-0 translate-x-[-50%] opacity-100",
  hidden: "translate-y-full translate-x-[-50%] opacity-0",
}

export const SelectionBar = observer(() => {
  // Store access
  const { selectionStore, folderStore, imageStore } = useStore()
  const displayImages = useDisplayImages()

  // State
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false)

  // Event handlers
  const handleSelectAll = () => {
    const allImageIds = displayImages.map((img) => img.id)
    selectionStore.selectAllVisible(allImageIds)
  }

  const handleClearSelection = () => {
    selectionStore.clear()
  }

  const handleDeleteSelectedClick = () => {
    setShowBulkDeleteConfirm(true)
  }

  const handleConfirmBulkDelete = () => {
    const idsToDelete = Array.from(selectionStore.ids)
    imageStore.removeByIds(idsToDelete)
    folderStore.removeImages(idsToDelete)
    selectionStore.clear()
    setShowBulkDeleteConfirm(false)
  }

  const handleMoveToFolder = (targetFolderId: string | null) => {
    const imageIds = Array.from(selectionStore.ids)
    folderStore.moveImagesToFolder(imageIds, targetFolderId)
    selectionStore.clear()
  }

  // Computed values
  const folders = folderStore.getAll()
  const hasSelection = selectionStore.hasSelection
  const visibilityClass = visibilityStyles[hasSelection ? "visible" : "hidden"]

  const barClassName = [barStyles.base, visibilityClass].join(" ")

  const folderOptions = [
    { value: "none", label: "No folder" },
    ...folders.map((folder) => ({
      value: folder.id,
      label: folder.name,
    })),
  ]

  return (
    <>
      <div className={barClassName}>
        <Text size="sm">{selectionStore.count} selected</Text>

        <div className={barStyles.controls}>
          <Button
            label="Select All"
            onClick={handleSelectAll}
            variant="secondary"
          />

          <Button
            label="Clear"
            onClick={handleClearSelection}
            variant="secondary"
          />

          <div className={barStyles.folderSection}>
            <IconFolder size={16} className={barStyles.folderIcon} />
            <Select
              options={folderOptions}
              value={folderStore.activeId || "none"}
              onChange={(value) =>
                handleMoveToFolder(value === "none" ? null : value)
              }
              placeholder="Move to folder"
            />
          </div>

          <IconButton
            icon={IconTrash}
            onClick={handleDeleteSelectedClick}
            variant="danger"
            title="Delete selected images"
          />
        </div>
      </div>

      {showBulkDeleteConfirm &&
        createPortal(
          <ConfirmModal
            isOpen={showBulkDeleteConfirm}
            onClose={() => setShowBulkDeleteConfirm(false)}
            title="Delete Images"
            message={`Are you sure you want to delete ${selectionStore.count} image${selectionStore.count > 1 ? "s" : ""}? This action cannot be undone.`}
            actions={[
              {
                label: "Cancel",
                onClick: () => setShowBulkDeleteConfirm(false),
                variant: "secondary",
              },
              {
                label: "Delete",
                onClick: handleConfirmBulkDelete,
                variant: "danger",
              },
            ]}
          />,
          document.body,
        )}
    </>
  )
})
