import { IconFolderPlus } from "@tabler/icons-react"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { HorizontalBar } from "@/components/ui/HorizontalBar"
import { TagEditable } from "@/components/ui/TagEditable"
import { Text } from "@/components/ui/Text"
import { useStore } from "@/hooks/useStores"
import { FolderItem } from "./FolderItem"

export const FolderManager = observer(() => {
  const { folderStore, imageStore } = useStore()
  const folders = folderStore.getAll()
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleCreateFolder = (name: string) => {
    folderStore.add(name)
    setShowCreateForm(false)
  }

  const handleSelectFolder = (folderId: string | null) => {
    folderStore.setActive(folderId)
    setShowCreateForm(false)
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
        <Text variant="caption" muted className="ml-2">
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
