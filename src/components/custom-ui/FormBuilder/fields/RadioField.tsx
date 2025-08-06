import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { RadioFieldConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"
import type { BaseFieldProps } from "./shared/types"

interface RadioFieldProps extends BaseFieldProps {
  field: RadioFieldConfig
}

export function RadioField({ field, control, isRequired }: RadioFieldProps) {
  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          <FieldLabel label={field.label} isRequired={isRequired} />
          <FormControl>
            <RadioGroup
              onValueChange={formField.onChange}
              value={formField.value}
              disabled={field.disabled}
              className="flex flex-col space-y-1"
            >
              {field.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`${field.name}-${option.value}`}
                    disabled={option.disabled}
                  />
                  <Label htmlFor={`${field.name}-${option.value}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
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
