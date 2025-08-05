import { ErrorBoundary } from "react-error-boundary"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LayoutWrapper } from "@/components/layout/LayoutWrapper"
import { ErrorDemo } from "@/components/ui/ErrorDemo"
import { ErrorFallback } from "@/components/ui/ErrorFallback"
import { processedRoutes } from "@/config/routes"
import { logError } from "@/utils"
import "./App.css"

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <BrowserRouter>
        <Routes>
          {processedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <LayoutWrapper layout={route.layout}>
                  <route.component />
                </LayoutWrapper>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
      <ErrorDemo />
    </ErrorBoundary>
  )
}

export default App
