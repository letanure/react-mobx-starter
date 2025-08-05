import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@/styles/global.css"
import "@/i18n"
import { AppProviders } from "@/providers/AppProviders"
import App from "./App"

const rootElement = document.getElementById("root")
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  )
} else {
  throw new Error('Root element with id "root" not found.')
}
