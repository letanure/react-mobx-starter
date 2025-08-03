import { makeAutoObservable } from "mobx"

export interface ImageModel {
  id: string
  file: File
  url: string
  status: "uploaded" | "processing" | "completed" | "error"
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

  add(files: File[]) {
    files.forEach((file) => {
      const id = crypto.randomUUID()
      const image: ImageModel = {
        id,
        file,
        url: URL.createObjectURL(file),
        status: "uploaded",
      }

      this.images.set(id, image)
    })
  }

  remove(id: string) {
    const image = this.images.get(id)
    if (image) {
      URL.revokeObjectURL(image.url)
      this.images.delete(id)
    }
  }
}
