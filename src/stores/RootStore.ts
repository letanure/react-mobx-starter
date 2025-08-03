import { action, makeAutoObservable, reaction } from "mobx"
import { PersistenceService } from "@/services/persistence/PersistenceService"
import type { Folder } from "./FolderStore"
import { FolderStore } from "./FolderStore"
import type { ImageModel } from "./ImageStore"
import { ImageStore } from "./ImageStore"

export class RootStore {
  imageStore: ImageStore
  folderStore: FolderStore
  isHydrating = true

  private persistenceService: PersistenceService

  constructor() {
    makeAutoObservable(this)

    this.imageStore = new ImageStore()
    this.folderStore = new FolderStore()
    this.persistenceService = new PersistenceService()

    this.hydrate()
    this.setupAutoPersistence()
  }

  private setupAutoPersistence() {
    reaction(
      () => [
        this.imageStore.images.size,
        this.folderStore.folders.length,
        ...Array.from(this.imageStore.images.values()).map((img) => img.status),
        ...this.folderStore.folders.flatMap((f) => f.imageIds),
      ],
      () => {
        this.persistAll()
      },
      { delay: 100 },
    )
  }

  async hydrate() {
    const [images, folders] = await Promise.all([
      this.persistenceService.loadImages(),
      this.persistenceService.loadFolders(),
    ])

    this.hydrateImageStore(images)
    this.hydrateFolderStore(folders)

    await new Promise((resolve) => setTimeout(resolve, 300))
    this.setHydrating(false)
  }

  private setHydrating = action((value: boolean) => {
    this.isHydrating = value
  })

  async persistAll() {
    await Promise.all([
      this.persistenceService.saveImages(this.imageStore.getAll()),
      this.persistenceService.saveFolders(this.folderStore.getAll()),
    ])
  }

  private hydrateImageStore(images: ImageModel[]) {
    images.forEach((image) => {
      // Reset processing status on reload since background removal was interrupted
      const cleanedImage = {
        ...image,
        status:
          image.status === "processing" ? ("uploaded" as const) : image.status,
      }
      this.imageStore.images.set(image.id, cleanedImage)
    })
  }

  private hydrateFolderStore(folders: Folder[]) {
    this.folderStore.folders.length = 0
    folders.forEach((folder) => {
      this.folderStore.folders.push(folder)
    })
  }
}
