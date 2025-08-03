import { makeAutoObservable, observable } from "mobx"
import type { RootStore } from "./RootStore"

export class SelectionStore {
  selectedIds = observable.set<string>()
  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  get count() {
    return this.selectedIds.size
  }

  get ids() {
    return this.selectedIds
  }

  get hasSelection() {
    return this.selectedIds.size > 0
  }

  toggle(imageId: string) {
    if (this.selectedIds.has(imageId)) {
      this.selectedIds.delete(imageId)
    } else {
      this.selectedIds.add(imageId)
    }
  }

  selectAll() {
    const allImages = this.rootStore.imageStore.getAll()
    allImages.forEach((image) => {
      this.selectedIds.add(image.id)
    })
  }

  selectAllVisible(imageIds: string[]) {
    imageIds.forEach((id) => {
      this.selectedIds.add(id)
    })
  }

  clear() {
    this.selectedIds.clear()
  }

  isSelected(imageId: string) {
    return this.selectedIds.has(imageId)
  }
}
