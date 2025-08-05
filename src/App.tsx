import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from "@/config/routes"
import { TodoList } from "@/features/todo/TodoList"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.todos.all} element={<TodoList />} />
        <Route path={routes.todos.active} element={<TodoList />} />
        <Route path={routes.todos.completed} element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
