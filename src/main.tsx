import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@/styles/global.css"
import "@/i18n"
import { StoreProvider } from "@/providers/StoreProvider"
import App from "./App"

const rootElement = document.getElementById("root")
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
    </StrictMode>,
  )
} else {
  throw new Error('Root element with id "root" not found.')
}
