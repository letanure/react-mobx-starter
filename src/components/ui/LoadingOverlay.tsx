interface LoadingOverlayProps {
  message?: string
}

export function LoadingOverlay({
  message = "Loading...",
}: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="text-gray-600">{message}</div>
    </div>
  )
}
