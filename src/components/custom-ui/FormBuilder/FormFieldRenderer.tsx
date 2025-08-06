import { useFormContext } from "react-hook-form"
import {
  CheckboxField,
  InputField,
  RadioField,
  SelectField,
  TextareaField,
} from "./fields"
import type { FormFieldConfig } from "./types"

interface FormFieldRendererProps {
  field: FormFieldConfig
  isRequired?: boolean
}

export function FormFieldRenderer({
  field,
  isRequired = false,
}: FormFieldRendererProps) {
  const { control } = useFormContext()

  if (field.type === "checkbox") {
    return (
      <CheckboxField field={field} control={control} isRequired={isRequired} />
    )
  }

  if (field.type === "radio") {
    return (
      <RadioField field={field} control={control} isRequired={isRequired} />
    )
  }

  if (field.type === "select") {
    return (
      <SelectField field={field} control={control} isRequired={isRequired} />
    )
  }

  if (field.type === "textarea") {
    return (
      <TextareaField field={field} control={control} isRequired={isRequired} />
    )
  }

  // Default to InputField for all input types (text, email, number, etc.)
  return <InputField field={field} control={control} isRequired={isRequired} />
}
