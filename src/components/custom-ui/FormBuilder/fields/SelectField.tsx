import type { Control } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SelectFieldConfig } from "../types"
import { FieldLabel } from "./shared/FieldLabel"

interface SelectFieldProps {
  field: SelectFieldConfig
  control: Control
  isRequired?: boolean
}

export function SelectField({ field, control, isRequired }: SelectFieldProps) {
  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          <FieldLabel label={field.label} isRequired={isRequired} />
          <Select
            onValueChange={formField.onChange}
            value={formField.value || ""}
            disabled={field.disabled}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {field.description && (
            <FormDescription>{field.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
