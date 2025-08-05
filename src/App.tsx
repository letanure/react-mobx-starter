import { Route, Routes } from "react-router-dom"
import { LayoutWrapper } from "@/components/layout/LayoutWrapper"
import { processedRoutes } from "@/config/routes"
import "./App.css"

function App() {
  return (
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
  )
}

export default App
