import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { AppSidebar } from "@/components/AppSidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { getAllNavigationItems } from "@/config/navigation"

interface SidebarLayoutProps {
  children: ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const location = useLocation()
  const { t } = useTranslation()

  // Derive breadcrumbs from navigation config to maintain consistency with sidebar
  const getBreadcrumbItems = () => {
    const path = location.pathname
    const allNavItems = getAllNavigationItems(t)

    // Match current page to navigation items to ensure breadcrumb accuracy
    const currentItem = allNavItems.find((item) => item.url === path)

    if (currentItem) {
      if (path === "/") {
        // Root level needs no parent breadcrumb for simplicity
        return [
          { label: currentItem.title, href: currentItem.url, isPage: true },
        ]
      } else {
        // Show hierarchy to help users understand their location
        return [
          { label: t("todo.navigation.all"), href: "/", isPage: false },
          { label: currentItem.title, href: currentItem.url, isPage: true },
        ]
      }
    }

    // Prevent broken breadcrumbs on unregistered routes
    return [{ label: "Application", href: "/", isPage: true }]
  }

  const breadcrumbItems = getBreadcrumbItems()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "280px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <div key={item.href} className="flex items-center">
                  {index > 0 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                  <BreadcrumbItem
                    className={index === 0 ? "hidden md:block" : ""}
                  >
                    {item.isPage ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href}>
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
