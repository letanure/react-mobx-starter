import { expect, test } from "@playwright/test"
import { TestHelpers } from "./helpers"

test.describe("Todo App - E2E Demo Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  // Visual/UI Test - Checks page structure and elements
  test("Visual: page loads with correct structure", async ({ page }) => {
    const helpers = new TestHelpers(page)

    // Check main heading
    await helpers.expectVisible(page.getByRole("heading", { level: 1 }))
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Todo List",
    )

    // Check navigation is present
    await helpers.expectVisible(page.getByText("All"))
    await helpers.expectVisible(page.getByText("Active"))
    await helpers.expectVisible(page.getByText("Completed"))

    // Check input form
    await helpers.expectVisible(page.getByPlaceholder("What needs to be done?"))
    await helpers.expectVisible(page.getByRole("button", { name: "Add" }))
  })

  // User Flow Test - Complete user journey
  test("Flow: complete todo workflow", async ({ page }) => {
    const helpers = new TestHelpers(page)
    const todoText = "Learn E2E testing"

    // Add todo using helper
    await helpers.addTodo(todoText)

    // Mark as complete
    await helpers.toggleTodo(0)
    await helpers.expectVisible(page.locator(".completed"))

    // Clean up - delete todo
    await helpers.deleteTodo(0)
    await helpers.expectNotVisible(page.getByText(todoText))
  })

  // Navigation Test - Route changes
  test("Navigation: route filtering works", async ({ page }) => {
    // Check initial URL
    await expect(page).toHaveURL("/")

    // Navigate to active filter
    await page.getByText("Active").click()
    await expect(page).toHaveURL("/active")

    // Navigate to completed filter
    await page.getByText("Completed").click()
    await expect(page).toHaveURL("/completed")

    // Back to all
    await page.getByText("All").click()
    await expect(page).toHaveURL("/")
  })

  // Form Validation Test - Edge cases
  test("Validation: empty input handling", async ({ page }) => {
    const initialTodoCount = await page.locator(".todo-item").count()

    // Try submitting empty form
    await page.getByRole("button", { name: "Add" }).click()

    // Should not create new todo
    const finalTodoCount = await page.locator(".todo-item").count()
    expect(finalTodoCount).toBe(initialTodoCount)

    // Input should remain empty
    await expect(page.getByPlaceholder("What needs to be done?")).toHaveValue(
      "",
    )
  })

  // State Management Test - Data persistence across interactions
  test("State: statistics update correctly", async ({ page }) => {
    const helpers = new TestHelpers(page)

    // Add two todos
    await helpers.addTodo("Todo 1")
    await helpers.addTodo("Todo 2")

    // Complete first todo
    await helpers.toggleTodo(0)

    // Check statistics display
    await helpers.expectVisible(page.getByText("1 active"))
    await helpers.expectVisible(page.getByText("1 completed"))
  })

  // Visual Regression Test - Screenshot comparison
  test("Visual: screenshot comparison", async ({ page }) => {
    const helpers = new TestHelpers(page)

    // Configure for consistent screenshots across environments
    await page.setViewportSize({ width: 1280, height: 720 })

    // Take screenshot of empty state
    await expect(page.locator(".todo-container")).toHaveScreenshot(
      "empty-state.png",
    )

    // Add a todo and take screenshot of the todo list area
    await helpers.addTodo("Sample todo for visual test")
    await expect(page.locator(".todo-container")).toHaveScreenshot(
      "with-item.png",
    )

    // Complete todo and take screenshot
    await helpers.toggleTodo(0)
    await expect(page.locator(".todo-container")).toHaveScreenshot(
      "completed-state.png",
    )

    // Screenshot of statistics area when visible
    await helpers.expectVisible(page.locator(".todo-stats"))
    await expect(page.locator(".todo-stats")).toHaveScreenshot(
      "stats-section.png",
    )
  })
})
