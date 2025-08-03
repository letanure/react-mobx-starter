import Dexie, { type Table } from "dexie"
import type { Folder } from "@/stores/FolderStore"
import type { ImageModel, ImageStatus } from "@/stores/ImageStore"

// Types
interface PersistedImage {
  id: string
  fileName: string
  fileBuffer: ArrayBuffer
  processedBuffer?: ArrayBuffer
  status: string
  createdAt: string
}

interface PersistedFolder {
  id: string
  name: string
  imageIds: string[]
  createdAt: string
  updatedAt: string
}

// Database
class PhotoRoomDB extends Dexie {
  images!: Table<PersistedImage>
  folders!: Table<PersistedFolder>

  constructor() {
    super("photoroom")

    this.version(1).stores({
      images: "id",
      folders: "id",
    })
  }
}

// Constants
const MIME_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
}

export class PersistenceService {
  private db = new PhotoRoomDB()

  // Image operations
  async saveImages(images: ImageModel[]): Promise<void> {
    const persistedImages = await Promise.all(
      images.map((img) => this.serializeImage(img)),
    )
    await this.db.images.clear()
    await this.db.images.bulkPut(persistedImages)
  }

  async loadImages(): Promise<ImageModel[]> {
    const persistedImages = await this.db.images.toArray()
    return persistedImages.map((img) => this.deserializeImage(img))
  }

  // Folder operations
  async saveFolders(folders: Folder[]): Promise<void> {
    const persistedFolders = folders.map((folder) => ({
      id: folder.id,
      name: folder.name,
      imageIds: [...folder.imageIds],
      createdAt: folder.createdAt.toISOString(),
      updatedAt: folder.updatedAt.toISOString(),
    }))

    await this.db.folders.clear()
    await this.db.folders.bulkPut(persistedFolders)
  }

  async loadFolders(): Promise<Folder[]> {
    const persistedFolders = await this.db.folders.toArray()

    return persistedFolders.map((persisted) => ({
      id: persisted.id,
      name: persisted.name,
      imageIds: persisted.imageIds,
      createdAt: new Date(persisted.createdAt),
      updatedAt: new Date(persisted.updatedAt),
    }))
  }

  // Serialization helpers
  private async serializeImage(image: ImageModel): Promise<PersistedImage> {
    return {
      id: image.id,
      fileName: image.file.name,
      fileBuffer: await image.file.arrayBuffer(),
      processedBuffer: image.processedBlob
        ? await image.processedBlob.arrayBuffer()
        : undefined,
      status: image.status,
      createdAt: image.createdAt.toISOString(),
    }
  }

  private deserializeImage(persisted: PersistedImage): ImageModel {
    const mimeType = this.getMimeTypeFromFileName(persisted.fileName)

    const file = new File([persisted.fileBuffer], persisted.fileName, {
      type: mimeType,
    })

    const processedBlob = persisted.processedBuffer
      ? new Blob([persisted.processedBuffer], { type: mimeType })
      : undefined

    return {
      id: persisted.id,
      file,
      processedBlob,
      src: processedBlob
        ? URL.createObjectURL(processedBlob)
        : URL.createObjectURL(file),
      status: persisted.status as ImageStatus,
      createdAt: new Date(persisted.createdAt),
    }
  }

  private getMimeTypeFromFileName(fileName: string): string {
    const extension = fileName.split(".").pop()?.toLowerCase()
    return MIME_TYPES[extension || ""] || "image/jpeg"
  }
}
