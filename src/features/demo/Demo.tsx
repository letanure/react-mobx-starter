import { ErrorDemo } from "@/components/ui/ErrorDemo"

export function Demo() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Error Demo</h1>
      <p className="text-muted-foreground mb-8">
        This page demonstrates error boundary functionality and error handling
        patterns.
      </p>
      <ErrorDemo />
    </div>
  )
}
