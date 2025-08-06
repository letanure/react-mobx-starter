import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { FormBuilder } from "@/components/custom-ui/FormBuilder/FormBuilder"
import type { FormFieldConfig } from "@/components/custom-ui/FormBuilder/types"

interface TodoFormProps {
  onSubmit: (text: string) => void
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const { t } = useTranslation()

  // Define the form schema with global validation messages
  const todoSchema = useMemo(
    () =>
      z.object({
        text: z
          .string()
          .trim()
          .refine((val) => val.length > 0, {
            message: t("validation.required"),
          }),
      }),
    [t],
  )

  type TodoFormData = z.infer<typeof todoSchema>

  const fields: FormFieldConfig[] = [
    {
      type: "text",
      name: "text",
      label: "",
      placeholder: t("todo.placeholder"),
      autoComplete: "off",
      layout: "full",
    },
  ]

  const handleSubmit = async (data: TodoFormData) => {
    onSubmit(data.text)
  }

  return (
    <div className="todo-form-inline">
      <FormBuilder
        fields={fields}
        schema={todoSchema}
        defaultValues={{ text: "" }}
        onSubmit={handleSubmit}
        submitLabel={t("todo.add")}
        resetLabel=""
        showReset={false}
        resetAfterSubmit={true}
      />
      <style>{`
        .todo-form-inline .space-y-6 {
          display: flex;
          flex-direction: row;
          gap: 0.5rem;
          align-items: flex-start;
        }
        .todo-form-inline .space-y-6 > * {
          margin-top: 0;
          margin-bottom: 0;
        }
        .todo-form-inline .space-y-6 > .flex-col {
          flex: 1;
        }
        .todo-form-inline .space-y-6 > .flex-col:last-child {
          flex: none;
          display: flex;
          align-items: flex-start;
        }
        .todo-form-inline .pt-4 {
          padding-top: 0 !important; /* Remove the padding that pushes button too low */
        }
        .todo-form-inline [data-slot="form-item"] {
          min-height: 4rem; /* Reserve space for input + error message to prevent layout shift */
        }
        .todo-form-inline .text-sm {
          min-height: 1.25rem; /* Reserve minimum height for error message space */
        }
      `}</style>
    </div>
  )
}
