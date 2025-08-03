import { IconFolder, IconTrash } from "@tabler/icons-react"
import { Button } from "@/components/ui/Button"
import { IconButton } from "@/components/ui/IconButton"
import { Select } from "@/components/ui/Select"
import { Text } from "@/components/ui/Text"
import type { Folder } from "@/stores/FolderStore"

interface SelectionBarProps {
  selectedCount: number
  onClearSelection: () => void
  onDeleteSelected: () => void
  onSelectAll: () => void
  hasSelection: boolean
  folders: Folder[]
  currentFolderId: string | null
  onMoveToFolder: (folderId: string | null) => void
}

export function SelectionBar({
  selectedCount,
  onClearSelection,
  onDeleteSelected,
  onSelectAll,
  hasSelection,
  folders,
  currentFolderId,
  onMoveToFolder,
}: SelectionBarProps) {
  return (
    <div
      className={`fixed bottom-4 left-1/2 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 flex items-center gap-4 z-10 transition-all duration-300 ${hasSelection ? "translate-y-0 translate-x-[-50%] opacity-100" : "translate-y-full translate-x-[-50%] opacity-0"}`}
    >
      <Text size="sm">{selectedCount} selected</Text>

      <div className="flex items-center gap-2">
        <Button label="Select All" onClick={onSelectAll} variant="secondary" />

        <Button label="Clear" onClick={onClearSelection} variant="secondary" />

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
            value={currentFolderId || "none"}
            onChange={(value) =>
              onMoveToFolder(value === "none" ? null : value)
            }
            placeholder="Move to folder"
          />
        </div>

        <IconButton
          icon={IconTrash}
          onClick={onDeleteSelected}
          variant="danger"
          title="Delete selected images"
        />
      </div>
    </div>
  )
}
