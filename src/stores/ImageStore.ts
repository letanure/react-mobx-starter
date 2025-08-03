import { makeAutoObservable } from "mobx"

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
  processedBlob?: Blob // Store the processed image blob
  status: ImageStatus
  createdAt: Date
}

export class ImageStore {
  images = new Map<string, ImageModel>()

  constructor() {
    makeAutoObservable(this)
  }

  // Getters
  get count(): number {
    return this.images.size
  }

  // CRUD Operations
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
      // Revoke old URL if we're updating the src to prevent memory leaks
      if (
        updates.src &&
        updates.src !== image.src &&
        image.src.startsWith("blob:")
      ) {
        URL.revokeObjectURL(image.src)
      }
      Object.assign(image, updates)
    }
  }

  remove(id: string) {
    const image = this.images.get(id)
    if (image) {
      URL.revokeObjectURL(image.src)
      this.images.delete(id)
    }
  }

  // Query Operations
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

  // Cleanup method to revoke all blob URLs
  dispose() {
    this.images.forEach((image) => {
      if (image.src.startsWith("blob:")) {
        URL.revokeObjectURL(image.src)
      }
    })
    this.images.clear()
  }
}
