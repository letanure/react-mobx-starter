import {
  IconCheck,
  IconEdit,
  IconFolder,
  IconFolderOpen,
  IconTrash,
  IconX,
} from "@tabler/icons-react"
import { useState } from "react"
import { IconButton } from "./IconButton"
import { Input } from "./Input"
import { Text } from "./Text"

type TagState = "create" | "edit" | "view"

interface TagEditableProps {
  name?: string
  count?: number
  defaultState?: TagState
  isSelected?: boolean
  onSave: (name: string) => void
  onDelete?: () => void
  onSelect?: () => void
}

export function TagEditable({
  name = "",
  count = 0,
  defaultState = "view",
  isSelected = false,
  onSave,
  onDelete,
  onSelect,
}: TagEditableProps) {
  const [tagState, setTagState] = useState<TagState>(defaultState)
  const [editValue, setEditValue] = useState(name)

  const handleSave = () => {
    onSave(editValue)
    setTagState("view")
  }

  const handleCancel = () => {
    if (tagState === "create") {
      onDelete?.()
      return
    }
    setEditValue(name)
    setTagState("view")
  }

  const handleEdit = () => {
    setEditValue(name)
    setTagState("edit")
  }

  const isEditing = tagState === "create" || tagState === "edit"
  const isViewing = tagState === "view"

  return (
    <div className="flex items-center gap-1">
      {isEditing && (
        <div className="flex items-center justify-between px-4 py-2 rounded-lg font-medium transition-colors border bg-accent-500 text-white border-accent-500 w-auto min-w-[200px]">
          <div className="flex items-center">
            <IconFolderOpen size={16} className="mr-2" />
            <Input
              value={editValue}
              onChange={setEditValue}
              onEnter={handleSave}
              onEscape={handleCancel}
              placeholder="Enter name"
              autoFocus
            />
            <Text variant="caption" muted className="ml-2">
              ({count})
            </Text>
          </div>
          <div className="flex items-center gap-1 ml-3 w-[50px]">
            <IconButton
              icon={IconCheck}
              onClick={handleSave}
              size="small"
              variant="light"
              title="Save"
            />
            <IconButton
              icon={IconX}
              onClick={handleCancel}
              size="small"
              variant="light"
              title="Cancel"
            />
          </div>
        </div>
      )}

      {isViewing && (
        <div
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors border ${
            isSelected
              ? "bg-accent-500 text-white border-accent-500"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
          }`}
        >
          <button
            type="button"
            onClick={onSelect}
            className="flex items-center whitespace-nowrap flex-1 -m-2 p-2"
          >
            {isSelected ? (
              <IconFolderOpen size={16} className="mr-2" />
            ) : (
              <IconFolder size={16} className="mr-2" />
            )}
            {name}
            <Text variant="caption" muted className="ml-2">
              ({count})
            </Text>
          </button>

          <div
            className={`flex items-center gap-1 ml-3 overflow-hidden transition-all duration-300 ${
              isSelected ? "w-[50px] opacity-100" : "w-0 opacity-0"
            }`}
          >
            <IconButton
              icon={IconEdit}
              onClick={handleEdit}
              size="small"
              title="Edit"
            />
            {onDelete && (
              <IconButton
                icon={IconTrash}
                onClick={onDelete}
                size="small"
                variant="danger"
                title="Delete"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
