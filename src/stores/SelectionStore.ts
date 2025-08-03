import { makeAutoObservable, observable } from "mobx"

export class SelectionStore {
  // Properties
  selectedIds = observable.set<string>()

  constructor() {
    makeAutoObservable(this)
  }

  // Computed values
  get count() {
    return this.selectedIds.size
  }

  get ids() {
    return this.selectedIds
  }

  get hasSelection() {
    return this.selectedIds.size > 0
  }

  // Query operations
  isSelected(imageId: string) {
    return this.selectedIds.has(imageId)
  }

  // Selection operations
  toggle(imageId: string) {
    if (this.selectedIds.has(imageId)) {
      this.selectedIds.delete(imageId)
    } else {
      this.selectedIds.add(imageId)
    }
  }

  selectAllVisible(imageIds: string[]) {
    imageIds.forEach((id) => {
      this.selectedIds.add(id)
    })
  }

  clear() {
    this.selectedIds.clear()
  }
}
