import { IconFolderPlus } from "@tabler/icons-react"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ConfirmModal } from "@/components/ui/ConfirmModal"
import { HorizontalBar } from "@/components/ui/HorizontalBar"
import { TagEditable } from "@/components/ui/TagEditable"
import { Text } from "@/components/ui/Text"
import { useStore } from "@/hooks/useStores"

export const FolderManager = observer(() => {
  const { folderStore, imageStore } = useStore()
  const folders = folderStore.getAll()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [confirmDeleteFolderId, setConfirmDeleteFolderId] = useState<
    string | null
  >(null)

  const handleCreateFolder = (name: string) => {
    folderStore.add(name)
    setShowCreateForm(false)
  }

  const handleSelectFolder = (folderId: string | null) => {
    folderStore.setActive(folderId)
    setShowCreateForm(false)
  }

  const handleRequestDelete = (id: string) => {
    setConfirmDeleteFolderId(id)
  }

  const handleDeleteFolderOnly = () => {
    if (confirmDeleteFolderId) {
      folderStore.remove(confirmDeleteFolderId)
      setConfirmDeleteFolderId(null)
    }
  }

  const handleDeleteFolderAndImages = () => {
    if (confirmDeleteFolderId) {
      const folder = folderStore.getById(confirmDeleteFolderId)
      const imageIds = folder ? [...folder.imageIds] : []

      // Remove folder first
      folderStore.remove(confirmDeleteFolderId)

      // Then remove images
      if (imageIds.length > 0) {
        imageStore.removeByIds(imageIds)
      }

      setConfirmDeleteFolderId(null)
    }
  }

  return (
    <>
      <HorizontalBar>
        {/* All Images - not editable */}
        <Button
          variant="tag"
          isSelected={folderStore.activeId === null}
          onClick={() => handleSelectFolder(null)}
        >
          All Images
          <Text variant="caption" muted className="ml-2">
            ({imageStore.count})
          </Text>
        </Button>

        {/* Folders */}
        {folders.map((folder) => (
          <TagEditable
            key={folder.id}
            name={folder.name}
            count={folder.imageIds.length}
            isSelected={folderStore.activeId === folder.id}
            onSelect={() => handleSelectFolder(folder.id)}
            onSave={(name) => folderStore.update(folder.id, { name })}
            onDelete={() => handleRequestDelete(folder.id)}
          />
        ))}

        {/* Create new folder */}
        {showCreateForm ? (
          <TagEditable
            defaultState="create"
            onSave={handleCreateFolder}
            onDelete={() => setShowCreateForm(false)}
          />
        ) : (
          <Button
            variant="secondary"
            onClick={() => setShowCreateForm(true)}
            icon={IconFolderPlus}
            label="New Folder"
          />
        )}
      </HorizontalBar>

      <ConfirmModal
        isOpen={!!confirmDeleteFolderId}
        onClose={() => setConfirmDeleteFolderId(null)}
        title="Delete Folder"
        message={`Are you sure you want to delete "${confirmDeleteFolderId ? folderStore.getById(confirmDeleteFolderId)?.name : ""}"?${
          confirmDeleteFolderId &&
          folderStore.getById(confirmDeleteFolderId)?.imageIds.length
            ? ` This folder contains ${folderStore.getById(confirmDeleteFolderId)?.imageIds.length} image(s).`
            : ""
        }`}
        actions={[
          {
            label: "Cancel",
            onClick: () => setConfirmDeleteFolderId(null),
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
      />
    </>
  )
})
