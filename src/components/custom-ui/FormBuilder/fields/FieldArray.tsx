import { PlusIcon, XIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormLayout } from "../FormLayout"
import { useFieldArray } from "../hooks/useFieldArray"
import type { FieldArrayConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"

interface FieldArrayProps {
  field: FieldArrayConfig
  isRequired?: boolean
}

export function FieldArray({ field, isRequired = false }: FieldArrayProps) {
  const { formState, control } = useFormContext()
  const { fields, addRow, removeRow, canAdd, canRemove } = useFieldArray({
    name: field.name,
    fieldConfig: field,
  })
  const error = formState.errors[field.name]

  // All field array logic is now handled by the useFieldArray hook

  return (
    <div className={field.layout ? `layout-${field.layout}` : ""}>
      <div className="mb-4">
        <FieldLabel label={field.label} isRequired={isRequired} />
      </div>

      <div className="space-y-4">
        {fields.map((arrayField, index) => {
          // Create field configs for each array item with proper names
          const itemFields = field.fields.map((fieldConfig) => ({
            ...fieldConfig,
            name: `${field.name}.${index}.${fieldConfig.name}`,
            label: index === 0 ? fieldConfig.label : "", // Only show labels on first row
          }))

          return (
            <div key={arrayField.id} className="relative">
              <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
                <div className="min-w-0">
                  <FormLayout
                    fields={itemFields}
                    schema={control._formSchema}
                  />
                </div>

                <div className="flex-shrink-0">
                  {/* Remove button - align with fields, accounting for labels on first row */}
                  {canRemove && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRow(index)}
                      className={`text-destructive hover:text-destructive/80 ${
                        index === 0 ? "mt-8" : "mt-2"
                      }`}
                    >
                      <XIcon className="w-4 h-4" />
                      <span className="sr-only">
                        {field.removeButtonLabel || "Remove"}
                      </span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Add subtle separator between items (except last) */}
              {index < fields.length - 1 && (
                <div className="border-b border-border/50 mt-4" />
              )}
            </div>
          )
        })}
      </div>

      {/* Add button below all rows */}
      {canAdd && (
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addRow}
            className="flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            {field.addButtonLabel || "Add"}
          </Button>
        </div>
      )}

      {/* Array-level validation error */}
      {error && (
        <p className="text-sm text-destructive mt-2">
          {error.message as string}
        </p>
      )}

      {fields.length > 0 && (
        <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
          <span>
            {fields.length} {field.label.toLowerCase()}
          </span>
          {field.maxItems && <span>Maximum {field.maxItems} items</span>}
        </div>
      )}
    </div>
  )
}
