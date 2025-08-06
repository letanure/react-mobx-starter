import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { InputFieldConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"
import type { BaseFieldProps } from "./shared/types"

interface InputFieldProps extends BaseFieldProps {
  field: InputFieldConfig
}

export function InputField({ field, control, isRequired }: InputFieldProps) {
  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          <FieldLabel label={field.label} isRequired={isRequired} />
          <FormControl>
            <Input
              {...formField}
              type={field.type}
              placeholder={field.placeholder}
              disabled={field.disabled}
              min={field.min}
              max={field.max}
              step={field.step}
              pattern={field.pattern}
              autoComplete={field.autoComplete}
            />
          </FormControl>
          {field.description && (
            <FormDescription>{field.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
