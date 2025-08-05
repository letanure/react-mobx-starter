import { ErrorBoundary } from "react-error-boundary"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ErrorDemo } from "@/components/ui/ErrorDemo"
import { ErrorFallback } from "@/components/ui/ErrorFallback"
import { routes } from "@/config/routes"
import { TodoList } from "@/features/todo/TodoList"
import { logError } from "@/utils"
import "./App.css"

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <BrowserRouter>
        <Routes>
          {(Object.entries(routes.todos) as [string, string][]).map(
            ([key, path]) => (
              <Route key={key} path={path} element={<TodoList />} />
            ),
          )}
        </Routes>
      </BrowserRouter>
      <ErrorDemo />
    </ErrorBoundary>
  )
}

export default App
