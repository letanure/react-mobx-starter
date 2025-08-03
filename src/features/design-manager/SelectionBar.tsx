import { IconTrash } from "@tabler/icons-react"
import { Button } from "@/components/ui/Button"
import { IconButton } from "@/components/ui/IconButton"
import { Text } from "@/components/ui/Text"

interface SelectionBarProps {
  selectedCount: number
  onClearSelection: () => void
  onDeleteSelected: () => void
  onSelectAll: () => void
  hasSelection: boolean
}

export function SelectionBar({
  selectedCount,
  onClearSelection,
  onDeleteSelected,
  onSelectAll,
  hasSelection,
}: SelectionBarProps) {
  return (
    <div
      className={`fixed bottom-4 left-1/2 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 flex items-center gap-4 z-10 transition-all duration-300 ${hasSelection ? "translate-y-0 translate-x-[-50%] opacity-100" : "translate-y-full translate-x-[-50%] opacity-0"}`}
    >
      <Text size="sm">{selectedCount} selected</Text>

      <div className="flex items-center gap-2">
        <Button label="Select All" onClick={onSelectAll} variant="secondary" />

        <Button label="Clear" onClick={onClearSelection} variant="secondary" />

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
