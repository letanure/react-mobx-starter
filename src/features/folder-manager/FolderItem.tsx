import { observer } from "mobx-react-lite"
import { useState } from "react"
import { createPortal } from "react-dom"
import { ConfirmModal } from "@/components/ui/ConfirmModal"
import { TagEditable } from "@/components/ui/TagEditable"
import { useStore } from "@/hooks/useStores"

// Types
interface FolderItemProps {
  folderId: string
}

export const FolderItem = observer(({ folderId }: FolderItemProps) => {
  // Store access
  const { folderStore, imageStore } = useStore()

  // State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Computed values
  const folder = folderStore.getById(folderId)
  if (!folder) return null

  const folderName = folder.name
  const imageCount = folder.imageIds.length
  const isSelected = folderStore.activeId === folder.id

  // Event handlers
  const handleDeleteFolderOnly = () => {
    folderStore.remove(folderId)
    setShowDeleteConfirm(false)
  }

  const handleDeleteFolderAndImages = () => {
    const imageIds = [...folder.imageIds]

    folderStore.remove(folderId)

    if (imageIds.length > 0) {
      imageStore.removeByIds(imageIds)
    }

    setShowDeleteConfirm(false)
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true)
  }

  const handleSelect = () => {
    folderStore.setActive(folderId)
  }

  const handleSave = (name: string) => {
    folderStore.update(folderId, { name })
  }

  return (
    <>
      <TagEditable
        name={folder.name}
        count={folder.imageIds.length}
        isSelected={isSelected}
        onSelect={handleSelect}
        onSave={handleSave}
        onDelete={handleDeleteClick}
      />

      {showDeleteConfirm &&
        createPortal(
          <ConfirmModal
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            title="Delete Folder"
            message={`Are you sure you want to delete "${folderName}"?${
              imageCount > 0
                ? ` This folder contains ${imageCount} image(s).`
                : ""
            }`}
            actions={[
              {
                label: "Cancel",
                onClick: () => setShowDeleteConfirm(false),
                variant: "secondary",
              },
              {
                label: "Delete folder",
                onClick: handleDeleteFolderOnly,
                variant: "danger",
              },
              {
                label: "Delete all",
                onClick: handleDeleteFolderAndImages,
                variant: "danger",
              },
            ]}
          />,
          document.body,
        )}
    </>
  )
})
