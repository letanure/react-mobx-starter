import type { z } from "zod"

export type LayoutWidth = "full" | "half" | "third" | "quarter"

export const layoutWidthClasses = {
  full: "w-full",
  half: "w-full md:w-1/2",
  third: "w-full md:w-1/3",
  quarter: "w-full md:w-1/4",
} as const

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "datetime-local"
  | "time"

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface BaseFieldConfig {
  name: string
  label: string
  placeholder?: string
  defaultValue?: unknown
  required?: boolean
  disabled?: boolean
  description?: string
  layout?: LayoutWidth
  autoComplete?:
    | "off"
    | "on"
    | "name"
    | "given-name"
    | "family-name"
    | "email"
    | "username"
    | "current-password"
    | "new-password"
    | "tel"
    | "street-address"
    | "postal-code"
    | "country"
    | "bday"
    | "cc-name"
    | "cc-number"
    | "cc-exp"
    | "cc-csc"
    | string
}

export interface InputFieldConfig extends BaseFieldConfig {
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "datetime-local"
    | "time"
  min?: number | string
  max?: number | string
  step?: number | string
  pattern?: string
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: "textarea"
  rows?: number
  maxLength?: number
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select"
  options: SelectOption[]
  multiple?: boolean
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: "checkbox"
  checkedValue?: string | number | boolean
  uncheckedValue?: string | number | boolean
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: "radio"
  options: SelectOption[]
}

export type FormFieldConfig =
  | InputFieldConfig
  | TextareaFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig
  | RadioFieldConfig

export interface FormBuilderProps<TSchema extends z.ZodObject<z.ZodRawShape>> {
  fields: FormFieldConfig[]
  schema: TSchema
  defaultValues?: Partial<z.infer<TSchema>>
  onSubmit: (data: z.infer<TSchema>) => void | Promise<void>
  isSubmitting?: boolean
  submitLabel: string
  submittingLabel?: string
  resetLabel: string
  showReset?: boolean
  className?: string
  autoComplete?: "off" | "on"
}
