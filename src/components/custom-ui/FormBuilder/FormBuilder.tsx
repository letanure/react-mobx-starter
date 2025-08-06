import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Stack } from "@/components/custom-ui/Stack"
import { Form } from "@/components/ui/form"
import { FormActions } from "./FormActions"
import { FormLayout } from "./FormLayout"
import type { FormBuilderProps, BaseFormFieldConfig } from "./types"

export function FormBuilder<TSchema extends z.ZodObject<z.ZodRawShape>>({
  fields,
  schema,
  defaultValues = {},
  onSubmit,
  isSubmitting = false,
  submitLabel,
  submittingLabel = submitLabel,
  resetLabel,
  showReset = false,
  className,
  autoComplete = "on",
}: FormBuilderProps<TSchema>) {
  type FormData = z.infer<TSchema>

  const form = useForm({
    // @ts-expect-error - Complex type compatibility issue between React Hook Form and Zod
    resolver: zodResolver(schema),
    // @ts-expect-error - Related type compatibility issue with defaultValues
    defaultValues: defaultValues || {},
  })

  // Helper to check if a row is empty in field arrays
  const isRowEmpty = (
    rowData: Record<string, unknown>,
    fieldConfigs: BaseFormFieldConfig[],
  ) => {
    return fieldConfigs.every((fieldConfig) => {
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

  // Filter empty rows from field arrays before submission
  const processFormData = (data: Record<string, unknown>) => {
    const processedData = { ...data }

    fields.forEach((field) => {
      if (
        field.type === "field-array" &&
        Array.isArray(processedData[field.name])
      ) {
        const arrayData = processedData[field.name] as Record<string, unknown>[]
        processedData[field.name] = arrayData.filter(
          (rowData) => !isRowEmpty(rowData, field.fields),
        )
      }
    })

    return processedData
  }

  const handleSubmit = async (data: unknown) => {
    try {
      const processedData = processFormData(data as Record<string, unknown>)
      await onSubmit(processedData as FormData)
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const handleReset = () => {
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={className}
        autoComplete={autoComplete}
        noValidate
      >
        <Stack spacing="lg">
          <FormLayout fields={fields} schema={schema} />

          <FormActions
            isSubmitting={isSubmitting}
            submitLabel={submitLabel}
            submittingLabel={submittingLabel}
            resetLabel={resetLabel}
            showReset={showReset}
            onReset={handleReset}
          />
        </Stack>
      </form>
    </Form>
  )
}
