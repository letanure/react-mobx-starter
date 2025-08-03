interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div>
      <h2>Oops! Something went wrong</h2>
      <p>We're sorry, but something unexpected happened.</p>
      <details>
        <summary>Error details</summary>
        <pre>{error.message}</pre>
      </details>
      <button type="button" onClick={resetError}>
        Try again
      </button>
    </div>
  )
}
