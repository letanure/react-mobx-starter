import { action } from "@storybook/addon-actions"
import type { Meta, StoryObj } from "@storybook/react"
import { z } from "zod"
import { FormBuilder } from "./FormBuilder"
import type { FormFieldConfig } from "./types"

const meta: Meta<typeof FormBuilder> = {
  title: "Custom UI/FormBuilder/Date Fields",
  component: FormBuilder,
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof FormBuilder>

// Native HTML5 Date Fields Schema
const nativeDateSchema = z.object({
  birthDate: z.date().optional(),
  appointmentDateTime: z.date().optional(),
  meetingTime: z.date().optional(),
  selectedMonth: z.date().optional(),
  selectedWeek: z.date().optional(),
})

const nativeDateFields: FormFieldConfig[] = [
  {
    type: "date",
    name: "birthDate",
    label: "Birth Date",
    placeholder: "Select your birth date",
    layout: "half",
  },
  {
    type: "datetime-local",
    name: "appointmentDateTime",
    label: "Appointment Date & Time",
    placeholder: "Select appointment date and time",
    layout: "half",
  },
  {
    type: "time",
    name: "meetingTime",
    label: "Meeting Time",
    placeholder: "Select meeting time",
    layout: "third",
  },
  {
    type: "month",
    name: "selectedMonth",
    label: "Select Month",
    placeholder: "Pick a month",
    layout: "third",
  },
  {
    type: "week",
    name: "selectedWeek",
    label: "Select Week",
    placeholder: "Pick a week",
    layout: "third",
  },
]

// shadcn Calendar Fields Schema
const calendarSchema = z.object({
  singleDate: z.date().optional(),
  multipleDates: z.array(z.date()).optional(),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
})

const calendarFields: FormFieldConfig[] = [
  {
    type: "calendar",
    name: "singleDate",
    label: "Single Date Selection",
    mode: "single",
    layout: "full",
  },
  {
    type: "calendar",
    name: "multipleDates",
    label: "Multiple Date Selection",
    mode: "multiple",
    layout: "full",
  },
  {
    type: "calendar",
    name: "dateRange",
    label: "Date Range Selection",
    mode: "range",
    layout: "full",
  },
]

// Date Picker Fields Schema
const datePickerSchema = z.object({
  eventDate: z.date().optional(),
  deadlineDate: z.date({
    required_error: "Deadline date is required",
  }),
  projectDateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
})

const datePickerFields: FormFieldConfig[] = [
  {
    type: "date-picker",
    name: "eventDate",
    label: "Event Date",
    placeholder: "Choose event date",
    showInput: true,
    layout: "half",
  },
  {
    type: "date-picker",
    name: "deadlineDate",
    label: "Project Deadline",
    placeholder: "Select deadline",
    required: true,
    dateFormat: "MMM dd, yyyy",
    layout: "half",
  },
  {
    type: "date-range-picker",
    name: "projectDateRange",
    label: "Project Duration",
    placeholder: "Select project start and end dates",
    numberOfMonths: 2,
    dateFormat: "PP",
    layout: "full",
  },
]

export const NativeDateFields: Story = {
  args: {
    fields: nativeDateFields,
    schema: nativeDateSchema,
    onSubmit: action("form-submitted"),
    submitLabel: "Submit Native Date Form",
    resetLabel: "Reset Form",
    showReset: true,
  },
}

export const CalendarFields: Story = {
  args: {
    fields: calendarFields,
    schema: calendarSchema,
    onSubmit: action("form-submitted"),
    submitLabel: "Submit Calendar Form",
    resetLabel: "Reset Form",
    showReset: true,
  },
}

export const DatePickerFields: Story = {
  args: {
    fields: datePickerFields,
    schema: datePickerSchema,
    onSubmit: action("form-submitted"),
    submitLabel: "Submit Date Picker Form",
    resetLabel: "Reset Form",
    showReset: true,
  },
}

// Mixed date fields example
const mixedDateSchema = z.object({
  quickDate: z.date().optional(),
  detailedPicker: z.date({
    required_error: "This date is required",
  }),
  vacationRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
  preferredTime: z.date().optional(),
})

const mixedDateFields: FormFieldConfig[] = [
  {
    type: "date",
    name: "quickDate",
    label: "Quick Date (Native)",
    placeholder: "Native HTML5 date input",
    layout: "quarter",
  },
  {
    type: "date-picker",
    name: "detailedPicker",
    label: "Detailed Date Picker",
    placeholder: "Popover calendar picker",
    required: true,
    showInput: false,
    layout: "quarter",
  },
  {
    type: "date-range-picker",
    name: "vacationRange",
    label: "Vacation Period",
    placeholder: "Select vacation dates",
    numberOfMonths: 1,
    layout: "half",
  },
  {
    type: "time",
    name: "preferredTime",
    label: "Preferred Meeting Time",
    placeholder: "Select time",
    layout: "quarter",
  },
]

export const MixedDateFields: Story = {
  args: {
    fields: mixedDateFields,
    schema: mixedDateSchema,
    onSubmit: action("form-submitted"),
    submitLabel: "Submit Mixed Form",
    resetLabel: "Reset",
    showReset: true,
  },
}
