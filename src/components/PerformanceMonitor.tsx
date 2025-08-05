import { useEffect, useState } from "react"
import { measurePerformance } from "@/lib/performance"

interface PerformanceStats {
  renderTime: number
  mountTime: number
}

/**
 * Development-only component to display performance metrics
 * Only renders in development mode
 */
export function PerformanceMonitor() {
  const [stats, setStats] = useState<PerformanceStats>({
    renderTime: 0,
    mountTime: 0,
  })

  useEffect(() => {
    // Only show in development
    if (import.meta.env.PROD) return

    const startTime = performance.now()

    // Measure mount time
    const mountTime = Math.round(performance.now() - startTime)
    setStats((prev) => ({ ...prev, mountTime }))

    // Measure render performance
    measurePerformance.start("app-render")
    const renderTime = measurePerformance.end("app-render")
    setStats((prev) => ({ ...prev, renderTime }))
  }, [])

  // Don't render in production
  if (import.meta.env.PROD) return null

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "4px",
        fontSize: "12px",
        fontFamily: "monospace",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div>🚀 Performance</div>
      <div>Mount: {stats.mountTime}ms</div>
      <div>Render: {stats.renderTime}ms</div>
      <div style={{ fontSize: "10px", opacity: 0.7, marginTop: "2px" }}>
        Dev only - F12 for Web Vitals
      </div>
    </div>
  )
}
