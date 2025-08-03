import { Component, type ErrorInfo, type ReactNode } from "react"

// Types
interface Props {
  children?: ReactNode
  fallback?: ReactNode
  variant?: "default" | "minimal" | "detailed"
  showRetry?: boolean
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

// Styles
const errorContainerStyles = {
  base: "flex flex-col items-center justify-center p-8 text-center",
}

const variantStyles: Record<string, string> = {
  default: "bg-red-50 border border-red-200 rounded-lg",
  minimal: "bg-gray-50 rounded-lg",
  detailed: "bg-red-50 border-2 border-red-300 rounded-xl shadow-lg",
}

const headingStyles: Record<string, string> = {
  default: "text-xl font-semibold text-red-800 mb-4",
  minimal: "text-lg font-medium text-gray-700 mb-2",
  detailed: "text-2xl font-bold text-red-900 mb-6",
}

const messageStyles: Record<string, string> = {
  default: "text-red-600 mb-4",
  minimal: "text-gray-600 mb-3",
  detailed: "text-red-700 mb-6",
}

const buttonStyles = {
  base: "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2",
  default: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  minimal: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
  detailed: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-600",
}

const detailStyles: Record<string, string> = {
  default:
    "mt-4 text-sm text-red-500 bg-red-100 p-3 rounded border max-w-md overflow-auto",
  minimal: "mt-2 text-xs text-gray-500",
  detailed:
    "mt-6 text-sm text-red-600 bg-red-100 p-4 rounded-lg border border-red-200 max-w-lg overflow-auto font-mono",
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  // Static methods
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  // Lifecycle methods
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
    this.setState({ errorInfo })
    this.props.onError?.(error, errorInfo)
  }

  // Event handlers
  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  // Render methods
  renderErrorContent() {
    const { variant = "default", showRetry = true } = this.props

    const { error, errorInfo } = this.state

    // Style classes
    const containerClass = [
      errorContainerStyles.base,
      variantStyles[variant],
    ].join(" ")

    const headingClass = headingStyles[variant]
    const messageClass = messageStyles[variant]
    const buttonClass = [
      buttonStyles.base,
      buttonStyles[variant as keyof typeof buttonStyles] ||
        buttonStyles.default,
    ].join(" ")

    return (
      <div className={containerClass}>
        <h2 className={headingClass}>
          {variant === "minimal" ? "Error" : "Something went wrong"}
        </h2>

        {variant !== "minimal" && (
          <p className={messageClass}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
        )}

        {showRetry && (
          <button
            type="button"
            onClick={this.handleRetry}
            className={buttonClass}
          >
            Try again
          </button>
        )}

        {variant === "detailed" && error && (
          <details className={detailStyles[variant]}>
            <summary className="cursor-pointer font-semibold mb-2">
              Error Details
            </summary>
            <div className="text-left">
              <p className="font-semibold">Error:</p>
              <p className="mb-2">{error.toString()}</p>
              {errorInfo?.componentStack && (
                <>
                  <p className="font-semibold">Component Stack:</p>
                  <pre className="whitespace-pre-wrap text-xs">
                    {errorInfo.componentStack}
                  </pre>
                </>
              )}
            </div>
          </details>
        )}
      </div>
    )
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || this.renderErrorContent()
    }

    return this.props.children
  }
}
