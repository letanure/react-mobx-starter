import { useFormContext } from "react-hook-form"
import {
  CalendarField,
  CheckboxField,
  DatePickerField,
  DateRangePickerField,
  FieldArray,
  InputField,
  NativeDateField,
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

  if (field.type === "field-array") {
    return <FieldArray field={field} isRequired={isRequired} />
  }

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

  if (field.type === "calendar") {
    return (
      <CalendarField
        name={field.name}
        label={field.label}
        mode={field.mode}
        required={isRequired}
        fromDate={field.fromDate}
        toDate={field.toDate}
        disabled={field.disabled}
        placeholder={field.placeholder}
      />
    )
  }

  if (field.type === "date-picker") {
    return (
      <DatePickerField
        name={field.name}
        label={field.label}
        required={isRequired}
        fromDate={field.fromDate}
        toDate={field.toDate}
        disabled={field.disabled}
        dateFormat={field.dateFormat}
        showInput={field.showInput}
        placeholder={field.placeholder}
      />
    )
  }

  if (field.type === "date-range-picker") {
    return (
      <DateRangePickerField
        name={field.name}
        label={field.label}
        required={isRequired}
        fromDate={field.fromDate}
        toDate={field.toDate}
        disabled={field.disabled}
        dateFormat={field.dateFormat}
        numberOfMonths={field.numberOfMonths}
        placeholder={field.placeholder}
      />
    )
  }

  // Handle native date input types
  if (
    ["date", "datetime-local", "time", "month", "week"].includes(field.type)
  ) {
    return (
      <NativeDateField
        name={field.name}
        label={field.label}
        type={
          field.type as "date" | "datetime-local" | "time" | "month" | "week"
        }
        required={isRequired}
        placeholder={field.placeholder}
        disabled={field.disabled}
        min={field.min}
        max={field.max}
        step={field.step}
        autoComplete={field.autoComplete}
      />
    )
  }

  // Default to InputField for all other input types (text, email, number, etc.)
  return <InputField field={field} control={control} isRequired={isRequired} />
}
