import { PlusIcon, XIcon } from "lucide-react"
import { useEffect } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormLayout } from "../FormLayout"
import type { FieldArrayConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"

interface FieldArrayProps {
  field: FieldArrayConfig
  isRequired?: boolean
}

export function FieldArray({ field, isRequired = false }: FieldArrayProps) {
  const { control, formState, trigger, setError, clearErrors } =
    useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: field.name,
  })
  const error = formState.errors[field.name]

  const createDefaultValue = () => {
    const defaultValue: Record<string, unknown> = {}

    if (field.fields && Array.isArray(field.fields)) {
      field.fields.forEach((fieldConfig) => {
        let fieldDefault: unknown = ""

        if (fieldConfig.type === "number") {
          fieldDefault = 0
        } else if (fieldConfig.type === "checkbox") {
          fieldDefault = false
        } else if (fieldConfig.type === "select" && fieldConfig.multiple) {
          fieldDefault = []
        } else if (
          [
            "date",
            "datetime-local",
            "time",
            "month",
            "week",
            "date-picker",
            "calendar",
          ].includes(fieldConfig.type)
        ) {
          fieldDefault = null
        }

        defaultValue[fieldConfig.name] = fieldDefault
      })
    }

    return defaultValue
  }

  // Check if a row is empty (all fields have default/empty values)
  const isRowEmpty = (index: number) => {
    const formValues = control._formValues
    const arrayValues = formValues[field.name]

    if (!arrayValues || !arrayValues[index]) return true

    const rowData = arrayValues[index]
    return field.fields.every((fieldConfig) => {
      const value = rowData[fieldConfig.name]

      if (fieldConfig.type === "number")
        return value === 0 || value === "" || value == null
      if (fieldConfig.type === "checkbox") return value === false
      if (fieldConfig.type === "select" && fieldConfig.multiple)
        return !value || value.length === 0
      if (
        [
          "date",
          "datetime-local",
          "time",
          "month",
          "week",
          "date-picker",
          "calendar",
        ].includes(fieldConfig.type)
      ) {
        return value == null || value === ""
      }

      return value === "" || value == null
    })
  }

  // Get indices of non-empty rows for validation
  const getNonEmptyRowIndices = () => {
    return fields.map((_, index) => index).filter((index) => !isRowEmpty(index))
  }

  // Always ensure there's an empty row at the bottom for adding
  useEffect(() => {
    if (fields.length === 0) {
      append(createDefaultValue())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Validate array length against minItems requirement
  useEffect(() => {
    const nonEmptyCount = getNonEmptyRowIndices().length
    const hasMinItemsError = field.minItems && nonEmptyCount < field.minItems

    if (hasMinItemsError && formState.isSubmitted) {
      setError(field.name, {
        type: "minItems",
        message: `Minimum ${field.minItems} items required (currently ${nonEmptyCount})`,
      })
    } else if (!hasMinItemsError) {
      clearErrors(field.name)
    }
  }, [
    fields,
    field.minItems,
    field.name,
    formState.isSubmitted,
    setError,
    clearErrors,
  ]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddItem = async () => {
    // Get non-empty rows for validation
    const nonEmptyIndices = getNonEmptyRowIndices()

    if (nonEmptyIndices.length === 0) {
      // No data to validate, just add empty row
      append(createDefaultValue())
      return
    }

    // Validate only non-empty rows
    const validationPromises = nonEmptyIndices.map((index) =>
      trigger(`${field.name}.${index}`),
    )

    const validationResults = await Promise.all(validationPromises)
    const allValid = validationResults.every((result) => result)

    if (allValid) {
      append(createDefaultValue())
    }
  }

  const handleRemoveItem = (index: number) => {
    remove(index)
  }

  const nonEmptyCount = getNonEmptyRowIndices().length
  const canAddMore = fields.length < (field.maxItems || 10)
  const canRemove = fields.length > 1 // Always allow removing if more than 1 row total

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
                      onClick={() => handleRemoveItem(index)}
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
      {canAddMore && (
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddItem}
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

      {nonEmptyCount > 0 && (
        <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
          <span>
            {nonEmptyCount} {field.label.toLowerCase()}
          </span>
          {field.maxItems && <span>Maximum {field.maxItems} items</span>}
        </div>
      )}
    </div>
  )
}
