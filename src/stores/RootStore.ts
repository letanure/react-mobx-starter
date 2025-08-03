import { FolderStore } from "./FolderStore"
import { ImageStore } from "./ImageStore"

export class RootStore {
  imageStore: ImageStore
  folderStore: FolderStore

  constructor() {
    this.imageStore = new ImageStore()
    this.folderStore = new FolderStore()
  }
}
