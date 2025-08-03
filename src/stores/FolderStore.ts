import { makeAutoObservable } from "mobx"

export interface Folder {
  id: string
  name: string
  imageIds: string[]
  createdAt: Date
  updatedAt: Date
}

export class FolderStore {
  folders: Folder[] = []
  activeId: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  private sanitizeFolderName(name: string): string {
    const sanitized = name.trim().replace(/\s+/g, " ").slice(0, 50)
    return sanitized || "Untitled"
  }

  add(name: string) {
    const date = new Date()
    const folder: Folder = {
      id: crypto.randomUUID(),
      name: this.sanitizeFolderName(name),
      imageIds: [],
      createdAt: date,
      updatedAt: date,
    }
    this.folders.push(folder)
    this.activeId = folder.id
  }

  update(id: string, data: Partial<Omit<Folder, "id" | "createdAt">>) {
    const folder = this.folders.find((f) => f.id === id)
    if (folder) {
      // Sanitize name if it's being updated
      const updatedData = { ...data }
      if (updatedData.name) {
        updatedData.name = this.sanitizeFolderName(updatedData.name)
      }

      Object.assign(folder, {
        ...updatedData,
        updatedAt: new Date(),
      })
    }
  }

  remove(id: string) {
    const index = this.folders.findIndex((f) => f.id === id)
    if (index !== -1) {
      this.folders.splice(index, 1)
      // Reset activeId if we're deleting the active folder
      if (this.activeId === id) {
        this.activeId = null
      }
    }
  }

  setActive(id: string | null) {
    this.activeId = id
  }

  getById(id: string): Folder | undefined {
    return this.folders.find((f) => f.id === id)
  }

  getAll(): Folder[] {
    return this.folders
  }

  addImagesToFolder(folderId: string, imageIds: string[]) {
    const folder = this.folders.find((f) => f.id === folderId)
    if (folder) {
      imageIds.forEach((imageId) => {
        if (!folder.imageIds.includes(imageId)) {
          folder.imageIds.push(imageId)
        }
      })
      if (imageIds.length > 0) {
        folder.updatedAt = new Date()
      }
    }
  }

  removeImages(imageIds: string[]) {
    // Remove images from their folders (each image can only be in one folder)
    this.folders.forEach((folder) => {
      const originalLength = folder.imageIds.length
      folder.imageIds = folder.imageIds.filter((id) => !imageIds.includes(id))
      if (folder.imageIds.length !== originalLength) {
        folder.updatedAt = new Date()
      }
    })
  }
}
