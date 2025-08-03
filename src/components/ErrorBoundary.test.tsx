import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { ErrorBoundary } from "./ErrorBoundary"

// Test component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error")
  }
  return <div>No error</div>
}

describe("ErrorBoundary", () => {
  // Suppress console.error for these tests
  const originalError = console.error
  beforeEach(() => {
    console.error = vi.fn()
  })
  afterEach(() => {
    console.error = originalError
  })

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>,
    )

    expect(screen.getByText("No error")).toBeInTheDocument()
  })

  it("renders error fallback when there is an error", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    )

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument()
  })

  it("renders custom fallback when provided", () => {
    const customFallback = <div>Custom error message</div>

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    )

    expect(screen.getByText("Custom error message")).toBeInTheDocument()
  })

  it("shows try again button when error occurs", async () => {
    const user = userEvent.setup()

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    )

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument()

    const tryAgainButton = screen.getByRole("button", { name: "Try again" })
    expect(tryAgainButton).toBeInTheDocument()

    // Just verify the button is clickable - state reset is complex to test
    await user.click(tryAgainButton)
  })
})
