import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { ConfirmModal } from "@/components/ui/ConfirmModal"
import { FileUpload } from "@/components/ui/FileUpload"
import { ImageGrid } from "@/components/ui/ImageGrid"
import { Stack } from "@/components/ui/Stack"
import { useStore } from "@/hooks/useStores"
import { SelectionBar } from "./SelectionBar"

export const DesignManager = observer(() => {
  const { imageStore, folderStore } = useStore()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false)
  const [showSingleDeleteConfirm, setShowSingleDeleteConfirm] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<string | null>(null)

  const handleUpload = (files: File[]) => {
    const imageIds = imageStore.add(files)

    // If a folder is active, add uploaded images to it
    if (folderStore.activeId) {
      folderStore.addImagesToFolder(folderStore.activeId, imageIds)
    }
  }

  const handleToggleSelection = (imageId: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(imageId)) {
        newSet.delete(imageId)
      } else {
        newSet.add(imageId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    const allImageIds = images.map((img) => img.id)
    setSelectedIds(new Set(allImageIds))
  }

  const handleClearSelection = () => {
    setSelectedIds(new Set())
  }

  const handleDeleteSelectedClick = () => {
    setShowBulkDeleteConfirm(true)
  }

  const handleConfirmBulkDelete = () => {
    const idsToDelete = Array.from(selectedIds)
    imageStore.removeByIds(idsToDelete)
    folderStore.removeImages(idsToDelete)
    setSelectedIds(new Set())
    setShowBulkDeleteConfirm(false)
  }

  const handleDeleteSingleClick = (imageId: string) => {
    setImageToDelete(imageId)
    setShowSingleDeleteConfirm(true)
  }

  const handleConfirmSingleDelete = () => {
    if (imageToDelete) {
      imageStore.remove(imageToDelete)
      folderStore.removeImages([imageToDelete])
      setSelectedIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(imageToDelete)
        return newSet
      })
    }
    setImageToDelete(null)
    setShowSingleDeleteConfirm(false)
  }

  const handleMoveToFolder = (targetFolderId: string | null) => {
    const imageIds = Array.from(selectedIds)
    folderStore.moveImagesToFolder(imageIds, targetFolderId)
    setSelectedIds(new Set())
  }

  // Filter images based on active folder - MobX observer handles reactivity
  const getDisplayImages = () => {
    if (!folderStore.activeId) {
      // Show ALL images when no folder is selected
      return imageStore.getAll()
    }

    // Show folder-specific images
    const folder = folderStore.getById(folderStore.activeId)
    return imageStore.getByIds(folder?.imageIds || [])
  }

  // Map to plain objects to ensure MobX tracks property changes
  const images = getDisplayImages().map((image) => ({
    id: image.id,
    src: image.src,
    status: image.status,
  }))

  return (
    <>
      <Stack spacing={8}>
        <ImageGrid
          images={images}
          selectedIds={selectedIds}
          onToggleSelection={handleToggleSelection}
          onDeleteSingle={handleDeleteSingleClick}
        />
        <FileUpload onFilesSelected={handleUpload} />
      </Stack>

      {/* Selection bar - always present, visibility controlled by CSS */}
      <SelectionBar
        selectedCount={selectedIds.size}
        onClearSelection={handleClearSelection}
        onDeleteSelected={handleDeleteSelectedClick}
        onSelectAll={handleSelectAll}
        hasSelection={selectedIds.size > 0}
        folders={folderStore.getAll()}
        currentFolderId={folderStore.activeId}
        onMoveToFolder={handleMoveToFolder}
      />

      {/* Single delete confirmation modal */}
      <ConfirmModal
        isOpen={showSingleDeleteConfirm}
        onClose={() => setShowSingleDeleteConfirm(false)}
        onConfirm={handleConfirmSingleDelete}
        title="Delete Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Bulk delete confirmation modal */}
      <ConfirmModal
        isOpen={showBulkDeleteConfirm}
        onClose={() => setShowBulkDeleteConfirm(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Delete Images"
        message={`Are you sure you want to delete ${selectedIds.size} image${selectedIds.size > 1 ? "s" : ""}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  )
})
