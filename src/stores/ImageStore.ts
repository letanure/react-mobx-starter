import { makeAutoObservable } from "mobx"

// Types
export type ImageStatus =
  | "uploaded"
  | "processing"
  | "completed"
  | "processed"
  | "error"

export interface ImageModel {
  id: string
  file: File
  src: string
  processedBlob?: Blob
  status: ImageStatus
  createdAt: Date
}

export class ImageStore {
  // Properties
  images = new Map<string, ImageModel>()

  constructor() {
    makeAutoObservable(this)
  }

  // Computed values
  get count(): number {
    return this.images.size
  }

  // CRUD operations
  add(files: File[]): string[] {
    const imageIds: string[] = []

    files.forEach((file) => {
      const id = crypto.randomUUID()
      const image: ImageModel = {
        id,
        file,
        src: URL.createObjectURL(file),
        status: "uploaded",
        createdAt: new Date(),
      }

      this.images.set(id, image)
      imageIds.push(id)
    })

    return imageIds
  }

  update(
    id: string,
    updates: Partial<Pick<ImageModel, "status" | "src" | "processedBlob">>,
  ) {
    const image = this.images.get(id)
    if (image) {
      const oldSrc = image.src

      Object.assign(image, updates)

      // Cleanup old blob URL after transition
      if (updates.src && updates.src !== oldSrc && oldSrc.startsWith("blob:")) {
        setTimeout(() => {
          URL.revokeObjectURL(oldSrc)
        }, 2000)
      }
    }
  }

  remove(id: string) {
    const image = this.images.get(id)
    if (image) {
      URL.revokeObjectURL(image.src)
      this.images.delete(id)
    }
  }

  removeByIds(ids: string[]) {
    ids.forEach((id) => this.remove(id))
  }

  // Query operations
  get(id: string) {
    return this.images.get(id)
  }

  getAll() {
    return Array.from(this.images.values())
  }

  getByIds(imageIds: string[]): ImageModel[] {
    return imageIds
      .map((id) => this.images.get(id))
      .filter(Boolean) as ImageModel[]
  }

  getByStatus(status: ImageStatus) {
    return this.getAll().filter((img) => img.status === status)
  }

  // Cleanup operations
  dispose() {
    this.images.forEach((image) => {
      if (image.src.startsWith("blob:")) {
        URL.revokeObjectURL(image.src)
      }
    })
    this.images.clear()
  }
}
