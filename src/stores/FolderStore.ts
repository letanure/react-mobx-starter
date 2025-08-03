import { makeAutoObservable } from "mobx"

// Types
export interface Folder {
  id: string
  name: string
  imageIds: string[]
  createdAt: Date
  updatedAt: Date
}

export class FolderStore {
  // Properties
  folders: Folder[] = []
  activeId: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  // CRUD operations
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
    const folder = this.folders.find((item) => item.id === id)
    if (folder) {
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
    const index = this.folders.findIndex((item) => item.id === id)
    if (index !== -1) {
      this.folders.splice(index, 1)
      if (this.activeId === id) {
        this.activeId = null
      }
    }
  }

  // Selection operations
  setActive(id: string | null) {
    this.activeId = id
  }

  // Query operations
  getById(id: string): Folder | undefined {
    return this.folders.find((item) => item.id === id)
  }

  getAll(): Folder[] {
    return this.folders
  }

  // Image management
  addImagesToFolder(folderId: string, imageIds: string[]) {
    const folder = this.folders.find((item) => item.id === folderId)
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
    this.folders.forEach((folder) => {
      const originalLength = folder.imageIds.length
      folder.imageIds = folder.imageIds.filter((id) => !imageIds.includes(id))
      if (folder.imageIds.length !== originalLength) {
        folder.updatedAt = new Date()
      }
    })
  }

  moveImagesToFolder(imageIds: string[], targetFolderId: string | null) {
    this.removeImages(imageIds)

    if (targetFolderId) {
      this.addImagesToFolder(targetFolderId, imageIds)
    }
  }

  // Utility functions
  private sanitizeFolderName(name: string): string {
    const sanitized = name.trim().replace(/\s+/g, " ").slice(0, 50)
    return sanitized || "Untitled"
  }
}
