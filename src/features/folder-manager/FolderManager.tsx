import { IconFolderPlus } from "@tabler/icons-react"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import { HorizontalBar } from "@/components/ui/HorizontalBar"
import { TagEditable } from "@/components/ui/TagEditable"
import { Text } from "@/components/ui/Text"
import { useStore } from "@/hooks/useStores"
import { FolderItem } from "./FolderItem"

// URL helper - in real app this would be React Router
const updateUrl = (folderId: string | null) => {
  const url = new URL(window.location.href)
  if (folderId) {
    url.searchParams.set("folder", folderId)
  } else {
    url.searchParams.delete("folder")
  }
  window.history.replaceState({}, "", url.toString())
}

export const FolderManager = observer(() => {
  // Store access
  const { folderStore, imageStore } = useStore()

  // State
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Computed values
  const folders = folderStore.getAll()

  // Load folder from URL on page load
  // in real app this would be React Router
  useEffect(() => {
    // Simple timeout to wait for data - in real app this would be React Router
    setTimeout(() => {
      folderStore.setActive(
        new URLSearchParams(window.location.search).get("folder"),
      )
    }, 500)
  }, [folderStore])

  // Event handlers
  const handleCreateFolder = (name: string) => {
    folderStore.add(name)
    setShowCreateForm(false)
  }

  const handleSelectFolder = (folderId: string | null) => {
    folderStore.setActive(folderId)
    setShowCreateForm(false)
    updateUrl(folderId)
  }

  return (
    <HorizontalBar>
      {/* All Images - not editable */}
      <Button
        variant="tag"
        isSelected={folderStore.activeId === null}
        onClick={() => handleSelectFolder(null)}
      >
        All Images
        <Text
          variant="caption"
          color={folderStore.activeId === null ? "inherit" : "muted"}
          spacing="sm"
        >
          ({imageStore.count})
        </Text>
      </Button>

      {/* Folders */}
      {folders.map((folder) => (
        <FolderItem key={folder.id} folderId={folder.id} />
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
  )
})
