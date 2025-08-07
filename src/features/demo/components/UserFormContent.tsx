import { z } from "zod"
import { FormBuilder } from "@/components/custom-ui/FormBuilder"

const userFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Please enter a valid email"),
})

interface UserFormContentProps {
  onSubmit: (data: { [x: string]: any }) => void
  onCancel: () => void
}

export function UserFormContent({ onSubmit, onCancel }: UserFormContentProps) {
  return (
    <FormBuilder
      fields={[
        {
          name: "username",
          type: "text",
          label: "Username",
          placeholder: "Enter your username",
          layout: "full",
          autoComplete: "username",
        },
        {
          name: "email",
          type: "email",
          label: "Email",
          placeholder: "Enter your email",
          layout: "full",
          autoComplete: "email",
        },
      ]}
      schema={userFormSchema}
      onSubmit={onSubmit}
      submitText="Create User"
      onCancel={onCancel}
      showCancelButton
    />
  )
}
