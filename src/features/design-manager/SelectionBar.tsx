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

export const SelectionBar = observer(() => {
  const { selectionStore, folderStore, imageStore } = useStore()
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false)
  const displayImages = useDisplayImages()

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
  const folders = folderStore.getAll()
  const hasSelection = selectionStore.hasSelection

  return (
    <>
      <div
        className={`fixed bottom-4 left-1/2 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 flex items-center gap-4 z-10 transition-all duration-300 ${hasSelection ? "translate-y-0 translate-x-[-50%] opacity-100" : "translate-y-full translate-x-[-50%] opacity-0"}`}
      >
        <Text size="sm">{selectionStore.count} selected</Text>

        <div className="flex items-center gap-2">
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

          <div className="flex items-center gap-2 px-2 border-l border-gray-200">
            <IconFolder size={16} className="text-gray-500" />
            <Select
              options={[
                { value: "none", label: "No folder" },
                ...folders.map((folder) => ({
                  value: folder.id,
                  label: folder.name,
                })),
              ]}
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
