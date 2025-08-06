import type { FallbackProps } from "react-error-boundary"
import { Button } from "@/components/ui/button"

/**
 * Error Fallback Component
 *
 * This component is displayed when an error boundary catches an error.
 * It provides a user-friendly error message and a retry button.
 *
 * Following community standards:
 * - Uses react-error-boundary library
 * - Provides retry mechanism
 * - Shows user-friendly error message
 * - Self-contained with inline styles
 */

const fallbackStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    padding: "2rem",
  } as React.CSSProperties,

  content: {
    textAlign: "center",
    maxWidth: "500px",
  } as React.CSSProperties,

  title: {
    color: "#dc2626",
    fontSize: "1.5rem",
    marginBottom: "1rem",
  } as React.CSSProperties,

  message: {
    color: "#6b7280",
    marginBottom: "1.5rem",
    lineHeight: 1.6,
  } as React.CSSProperties,

  details: {
    margin: "1rem 0",
    textAlign: "left",
  } as React.CSSProperties,

  summary: {
    cursor: "pointer",
    padding: "0.5rem",
    backgroundColor: "#f3f4f6",
    borderRadius: "4px",
    marginBottom: "0.5rem",
  } as React.CSSProperties,

  stack: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "4px",
    padding: "1rem",
    fontSize: "0.875rem",
    color: "#374151",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  } as React.CSSProperties,

  actions: {
    marginTop: "1.5rem",
  } as React.CSSProperties,
}

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div style={fallbackStyles.container} role="alert">
      <div style={fallbackStyles.content}>
        <h2 style={fallbackStyles.title}>Something went wrong</h2>
        <p style={fallbackStyles.message}>
          We're sorry, but something unexpected happened. Please try again.
        </p>

        {/* Show error details in development */}
        {import.meta.env.DEV && (
          <details style={fallbackStyles.details}>
            <summary style={fallbackStyles.summary}>
              Error details (development only)
            </summary>
            <pre style={fallbackStyles.stack}>{error.message}</pre>
            {error.stack && (
              <pre style={fallbackStyles.stack}>{error.stack}</pre>
            )}
          </details>
        )}

        <div style={fallbackStyles.actions}>
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </div>
      </div>
    </div>
  )
}
