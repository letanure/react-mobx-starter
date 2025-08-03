import { ImageStore } from "./ImageStore"

export class RootStore {
  imageStore: ImageStore

  constructor() {
    this.imageStore = new ImageStore()
  }
}
