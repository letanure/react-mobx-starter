import type { ReactNode } from "react"
import { demoRoutes } from "@/features/demo/routes"
import { todoRoutes } from "@/features/todo/routes"

interface SidebarLayoutProps {
  children: ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar border-r border-sidebar-border p-4">
          <nav>
            <h2 className="font-semibold text-sidebar-foreground mb-4">
              Navigation
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href={todoRoutes.path}
                  className="block px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  Todos
                </a>
              </li>
              <li>
                <a
                  href={demoRoutes.path}
                  className="block px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  Error Demo
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
