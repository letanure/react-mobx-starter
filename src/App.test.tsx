import { render, screen } from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import { describe, expect, it } from "vitest"
import i18n from "@/i18n"
import { StoreProvider } from "@/providers/StoreProvider"
import App from "./App"

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>
    <StoreProvider>{children}</StoreProvider>
  </I18nextProvider>
)

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />, { wrapper: TestWrapper })
    expect(screen.getByText("Todo List")).toBeInTheDocument()
  })
})
