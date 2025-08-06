import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Stack } from "@/components/custom-ui/Stack"
import { Form } from "@/components/ui/form"
import { FormActions } from "./FormActions"
import { FormLayout } from "./FormLayout"
import type { FormBuilderProps } from "./types"

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

  const handleSubmit = async (data: unknown) => {
    try {
      await onSubmit(data as FormData)
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
