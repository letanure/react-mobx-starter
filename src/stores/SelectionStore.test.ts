import { beforeEach, describe, expect, it } from "vitest"
import { SelectionStore } from "./SelectionStore"

describe("SelectionStore", () => {
  let store: SelectionStore

  beforeEach(() => {
    store = new SelectionStore()
  })

  it("starts empty", () => {
    expect(store.count).toBe(0)
    expect(store.hasSelection).toBe(false)
  })

  it("toggles selection", () => {
    store.toggle("image1")
    expect(store.isSelected("image1")).toBe(true)
    expect(store.count).toBe(1)

    store.toggle("image1")
    expect(store.isSelected("image1")).toBe(false)
    expect(store.count).toBe(0)
  })

  it("selects all visible", () => {
    store.selectAllVisible(["image1", "image2", "image3"])

    expect(store.count).toBe(3)
    expect(store.isSelected("image1")).toBe(true)
    expect(store.isSelected("image2")).toBe(true)
  })

  it("clears selection", () => {
    store.toggle("image1")
    store.toggle("image2")

    store.clear()

    expect(store.count).toBe(0)
    expect(store.hasSelection).toBe(false)
  })
})
