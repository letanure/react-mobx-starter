import { FormLabel } from "@/components/ui/form"

interface FieldLabelProps {
  children: React.ReactNode
  isRequired?: boolean
}

export function FieldLabel({ children, isRequired = false }: FieldLabelProps) {
  return (
    <FormLabel className="inline-block min-h-[1.5rem]">
      {children}
      {isRequired && (
        <span className="ml-1 text-destructive font-semibold">*</span>
      )}
    </FormLabel>
  )
}
