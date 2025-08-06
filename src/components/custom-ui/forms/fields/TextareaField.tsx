import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import type { TextareaFieldConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"
import type { BaseFieldProps } from "./shared/types"

interface TextareaFieldProps extends BaseFieldProps {
  field: TextareaFieldConfig
}

export function TextareaField({
  field,
  control,
  isRequired,
}: TextareaFieldProps) {
  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          <FieldLabel isRequired={isRequired}>{field.label}</FieldLabel>
          <FormControl>
            <Textarea
              {...formField}
              placeholder={field.placeholder}
              disabled={field.disabled}
              rows={field.rows || 3}
              maxLength={field.maxLength}
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
