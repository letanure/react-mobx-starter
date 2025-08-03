import { Header } from "@/components/ui/Header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-ci-background text-ci-text">
      <Header title="Design Manager" />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
