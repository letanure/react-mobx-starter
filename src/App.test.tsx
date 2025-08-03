import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { StoreProvider } from "@/providers/StoreProvider"
import App from "./App"

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
)

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />, { wrapper: TestWrapper })
    expect(screen.getByText("Click to select images")).toBeInTheDocument()
  })
})
