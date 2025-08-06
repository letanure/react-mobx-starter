import { useFormContext } from "react-hook-form"
import { Calendar } from "@/components/ui/calendar"
import type { BaseFieldProps } from "../types"
import { FieldLabel } from "./shared/FieldLabel"

interface CalendarFieldProps extends Omit<BaseFieldProps, "disabled"> {
  mode?: "single" | "multiple" | "range"
  fromDate?: Date
  toDate?: Date
  disabled?: Date[] | ((date: Date) => boolean)
}

export function CalendarField({
  name,
  label,
  mode = "single",
  required,
  className,
  fromDate,
  toDate,
  disabled,
}: CalendarFieldProps) {
  const { setValue, watch, formState } = useFormContext()
  const value = watch(name)
  const error = formState.errors[name]

  const handleSelect = (date: Date | Date[] | undefined) => {
    setValue(name, date, { shouldValidate: true })
  }

  return (
    <div className={className}>
      <FieldLabel label={label} isRequired={required} />
      <div className="border rounded-md p-3">
        <Calendar
          mode={mode}
          selected={value}
          onSelect={handleSelect}
          startMonth={fromDate}
          endMonth={toDate}
          disabled={disabled}
          className="w-fit"
        />
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1">
          {error.message as string}
        </p>
      )}
    </div>
  )
}
