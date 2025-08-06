import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import type { CheckboxFieldConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"
import type { BaseFieldProps } from "./shared/types"

interface CheckboxFieldProps extends BaseFieldProps {
  field: CheckboxFieldConfig
}

export function CheckboxField({
  field,
  control,
  isRequired,
}: CheckboxFieldProps) {
  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={formField.value}
              onCheckedChange={formField.onChange}
              disabled={field.disabled}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FieldLabel isRequired={isRequired}>{field.label}</FieldLabel>
            {field.description && (
              <FormDescription>{field.description}</FormDescription>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
