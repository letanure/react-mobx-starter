import { makeAutoObservable } from "mobx"

export interface ImageModel {
  id: string
  file: File
  src: string
  status: "uploaded" | "processing" | "completed" | "error"
  createdAt: Date
}

export class ImageStore {
  images = new Map<string, ImageModel>()

  constructor() {
    makeAutoObservable(this)
  }

  get(id: string) {
    return this.images.get(id)
  }

  getAll() {
    return Array.from(this.images.values())
  }

  getByStatus(status: ImageModel["status"]) {
    return this.getAll().filter((img) => img.status === status)
  }

  add(files: File[]) {
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
    })
  }

  update(id: string, updates: Partial<Pick<ImageModel, "status" | "src">>) {
    const image = this.images.get(id)
    if (image) {
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
}
