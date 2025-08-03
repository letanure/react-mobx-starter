import Dexie, { type Table } from "dexie"
import type { Folder } from "@/stores/FolderStore"
import type { ImageModel, ImageStatus } from "@/stores/ImageStore"

interface PersistedImage {
  id: string
  fileName: string
  fileType: string
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

class PhotoRoomDB extends Dexie {
  images!: Table<PersistedImage>
  folders!: Table<PersistedFolder>

  constructor() {
    super("photoroom")

    this.version(1).stores({
      images: "id, fileName, fileType, status, createdAt",
      folders: "id, name, createdAt, updatedAt",
    })
  }
}

export class PersistenceService {
  private db = new PhotoRoomDB()

  // Image persistence
  async saveImages(images: ImageModel[]): Promise<void> {
    const persistedImages = await Promise.all(images.map(this.serializeImage))
    await this.db.images.clear()
    await this.db.images.bulkPut(persistedImages)
  }

  async loadImages(): Promise<ImageModel[]> {
    const persistedImages = await this.db.images.toArray()
    return persistedImages.map(this.deserializeImage)
  }

  // Folder persistence
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

  // Private serialization helpers
  private async serializeImage(image: ImageModel): Promise<PersistedImage> {
    return {
      id: image.id,
      fileName: image.file.name,
      fileType: image.file.type,
      fileBuffer: await image.file.arrayBuffer(),
      processedBuffer: image.processedBlob
        ? await image.processedBlob.arrayBuffer()
        : undefined,
      status: image.status,
      createdAt: image.createdAt.toISOString(),
    }
  }

  private deserializeImage(persisted: PersistedImage): ImageModel {
    const file = new File([persisted.fileBuffer], persisted.fileName, {
      type: persisted.fileType,
    })

    const processedBlob = persisted.processedBuffer
      ? new Blob([persisted.processedBuffer], { type: persisted.fileType })
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
}
