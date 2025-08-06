import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { BaseFieldProps } from "../types"
import { FieldLabel } from "./shared/FieldLabel"

interface DatePickerFieldProps extends Omit<BaseFieldProps, "disabled"> {
  fromDate?: Date
  toDate?: Date
  disabled?: Date[] | ((date: Date) => boolean)
  dateFormat?: string
  showInput?: boolean
}

export function DatePickerField({
  name,
  label,
  placeholder = "Pick a date",
  required,
  className,
  fromDate,
  toDate,
  disabled,
  dateFormat = "PPP",
  showInput = false,
}: DatePickerFieldProps) {
  const { setValue, watch, formState } = useFormContext()
  const value = watch(name)
  const error = formState.errors[name]

  const handleSelect = (date: Date | undefined) => {
    setValue(name, date, { shouldValidate: true })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value)
    if (!Number.isNaN(date.getTime())) {
      setValue(name, date, { shouldValidate: true })
    }
  }

  return (
    <div className={className}>
      <FieldLabel label={label} isRequired={required} htmlFor={name} />

      {showInput && (
        <div className="mb-2">
          <Input
            id={`${name}-input`}
            type="date"
            value={value ? format(value, "yyyy-MM-dd") : ""}
            onChange={handleInputChange}
            className={error ? "border-destructive" : ""}
          />
        </div>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-destructive",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, dateFormat) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            startMonth={fromDate}
            endMonth={toDate}
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-sm text-destructive mt-1">
          {error.message as string}
        </p>
      )}
    </div>
  )
}
