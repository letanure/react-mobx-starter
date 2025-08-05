/**
 * Error Logger Utility
 *
 * Centralized error logging for error boundaries.
 * In production, this would typically send errors to a service like:
 * - Sentry
 * - LogRocket
 * - Bugsnag
 * - Custom analytics endpoint
 *
 * For development, it logs to console with additional context.
 */

interface ErrorInfo {
  componentStack: string
  errorBoundary?: string
}

export function logError(error: Error, errorInfo: ErrorInfo) {
  // In development, log to console with full details
  if (import.meta.env.DEV) {
    console.group("🚨 Error Boundary Caught Error")
    console.error("Error:", error)
    console.error("Error Info:", errorInfo)
    console.error("Stack:", error.stack)
    console.groupEnd()
    return
  }

  // In production, you would send to your error tracking service
  // Example implementations:

  // Sentry
  // Sentry.captureException(error, {
  //   contexts: {
  //     react: {
  //       componentStack: errorInfo.componentStack
  //     }
  //   }
  // })

  // Custom API
  // fetch('/api/errors', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     message: error.message,
  //     stack: error.stack,
  //     componentStack: errorInfo.componentStack,
  //     timestamp: new Date().toISOString(),
  //     userAgent: navigator.userAgent,
  //     url: window.location.href
  //   })
  // })

  // For now, log to console in production too
  console.error("Error caught by boundary:", error.message)
}
