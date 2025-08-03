import { action, makeAutoObservable, reaction } from "mobx"
import { PersistenceService } from "@/services/persistence/PersistenceService"
import type { Folder } from "./FolderStore"
import { FolderStore } from "./FolderStore"
import type { ImageModel } from "./ImageStore"
import { ImageStore } from "./ImageStore"
import { SelectionStore } from "./SelectionStore"

export class RootStore {
  // Public stores
  imageStore: ImageStore
  folderStore: FolderStore
  selectionStore: SelectionStore

  // State
  isHydrating = true

  // Private services
  private persistenceService: PersistenceService

  constructor() {
    // Initialize stores
    this.imageStore = new ImageStore()
    this.folderStore = new FolderStore()
    this.selectionStore = new SelectionStore()

    // Initialize services
    this.persistenceService = new PersistenceService()

    // Setup MobX
    makeAutoObservable(this)

    // Initialize app
    this.hydrate()
    this.setupAutoPersistence()
  }

  // Hydration methods
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

  // State management
  private setHydrating = action((value: boolean) => {
    this.isHydrating = value
  })

  // Persistence methods
  private setupAutoPersistence() {
    reaction(
      () => [
        this.imageStore.images.size,
        this.folderStore.folders.length,
        ...Array.from(this.imageStore.images.values()).map((img) => img.status),
        ...this.folderStore.folders.flatMap((folder) => folder.imageIds),
      ],
      () => {
        this.persistAll()
      },
      { delay: 100 },
    )
  }

  async persistAll() {
    await Promise.all([
      this.persistenceService.saveImages(this.imageStore.getAll()),
      this.persistenceService.saveFolders(this.folderStore.getAll()),
    ])
  }

  // Cleanup
  dispose() {
    this.imageStore.dispose()
  }
}
