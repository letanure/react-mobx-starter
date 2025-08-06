import type { ComponentType } from "react"
import {
  CalendarField,
  CheckboxField,
  DatePickerField,
  DateRangePickerField,
  FieldArray,
  InputField,
  RadioField,
  SelectField,
  TextareaField,
} from "../fields"
import type { BaseFormFieldConfig, FormFieldConfig } from "../types"

type FieldComponentProps<T extends BaseFormFieldConfig | FormFieldConfig> = {
  field: T
  isRequired?: boolean
}

type FieldComponentMap = {
  [K in FormFieldConfig["type"]]: ComponentType<
    FieldComponentProps<Extract<FormFieldConfig, { type: K }>>
  >
}

export const fieldTypeMap: FieldComponentMap = {
  "field-array": FieldArray as any,
  checkbox: CheckboxField,
  radio: RadioField,
  select: SelectField,
  textarea: TextareaField,
  calendar: CalendarField,
  "date-picker": DatePickerField,
  "date-range-picker": DateRangePickerField,
  // Input field types
  text: InputField,
  email: InputField,
  password: InputField,
  number: InputField,
  tel: InputField,
  url: InputField,
  search: InputField,
  date: InputField,
  "datetime-local": InputField,
  time: InputField,
  month: InputField,
  week: InputField,
}

export function getFieldComponent(
  type: FormFieldConfig["type"],
): ComponentType<FieldComponentProps<any>> {
  return fieldTypeMap[type] || InputField
}

export function isInputFieldType(type: string): boolean {
  return [
    "text",
    "email",
    "password",
    "number",
    "tel",
    "url",
    "search",
    "date",
    "datetime-local",
    "time",
    "month",
    "week",
  ].includes(type)
}
