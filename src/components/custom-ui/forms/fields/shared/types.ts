import type { Control } from "react-hook-form"
import type { FormFieldConfig } from "../../types"

export interface BaseFieldProps {
  field: FormFieldConfig
  control: Control
  isRequired?: boolean
}
