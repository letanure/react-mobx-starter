import type { z } from "zod"
import { Flex } from "@/components/custom-ui/Flex"
import { Stack } from "@/components/custom-ui/Stack"
import { cn } from "@/lib/utils"
import { FormFieldRenderer } from "./FormFieldRenderer"
import type { FormFieldConfig } from "./types"
import { layoutWidthClasses } from "./types"
import { isFieldRequired } from "./utils/formFieldUtils"

interface FormLayoutProps {
  fields: FormFieldConfig[]
  schema: z.ZodObject<z.ZodRawShape>
}

// Calculate how much space a layout takes (for grouping logic)
const getLayoutWeight = (layout?: string) => {
  switch (layout) {
    case "quarter":
      return 1
    case "third":
      return 2
    case "half":
      return 2
    default:
      return 4 // "full"
  }
}

export function FormLayout({ fields, schema }: FormLayoutProps) {
  // Group fields into rows (max weight of 4 per row)
  const rows: FormFieldConfig[][] = []
  let currentRow: FormFieldConfig[] = []
  let currentRowWeight = 0

  for (const field of fields) {
    const fieldWeight = getLayoutWeight(field.layout)

    // If adding this field would exceed capacity, start new row
    if (currentRowWeight + fieldWeight > 4 && currentRow.length > 0) {
      rows.push([...currentRow])
      currentRow = []
      currentRowWeight = 0
    }

    currentRow.push(field)
    currentRowWeight += fieldWeight

    // If this field takes full width, end the row
    if (fieldWeight === 4) {
      rows.push([...currentRow])
      currentRow = []
      currentRowWeight = 0
    }
  }

  // Add any remaining fields
  if (currentRow.length > 0) {
    rows.push(currentRow)
  }

  return (
    <Stack spacing="md">
      {rows.map((rowFields, rowIndex) => {
        // Single field in row
        if (rowFields.length === 1) {
          const field = rowFields[0]
          if (!field) return null

          const widthClass = layoutWidthClasses[field.layout || "full"]

          return (
            <div key={`${rowIndex}-${field.name}`} className={cn(widthClass)}>
              <FormFieldRenderer
                field={field}
                isRequired={isFieldRequired(schema, field.name)}
              />
            </div>
          )
        }

        // Multiple fields in row
        return (
          <Flex
            key={`row-${rowIndex}-${rowFields.map((f) => f.name).join("-")}`}
            gap="md"
            align="start"
          >
            {rowFields.map((field) => {
              const widthClass = layoutWidthClasses[field.layout || "full"]

              return (
                <div key={field.name} className={cn(widthClass, "min-w-0")}>
                  <FormFieldRenderer
                    field={field}
                    isRequired={isFieldRequired(schema, field.name)}
                  />
                </div>
              )
            })}
          </Flex>
        )
      })}
    </Stack>
  )
}
