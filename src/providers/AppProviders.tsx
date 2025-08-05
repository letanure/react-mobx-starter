import type { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { I18nextProvider } from "react-i18next"
import { BrowserRouter } from "react-router-dom"
import { ErrorFallback } from "@/components/ui/ErrorFallback"
import i18n from "@/i18n"
import { StoreProvider } from "@/providers/StoreProvider"
import { logError } from "@/utils"

interface AppProvidersProps {
  children: ReactNode
}

/**
 * Composites all app providers to avoid provider hell in App.tsx
 * @param children - React components to wrap with providers
 * @returns JSX with all providers applied
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <StoreProvider>{children}</StoreProvider>
        </BrowserRouter>
      </I18nextProvider>
    </ErrorBoundary>
  )
}
