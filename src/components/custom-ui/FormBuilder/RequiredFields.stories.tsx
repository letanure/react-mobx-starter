import type { Meta, StoryObj } from "@storybook/react"
import { z } from "zod"
import { FormBuilder } from "./FormBuilder"

const meta: Meta<typeof FormBuilder> = {
  title: "Custom UI/FormBuilder/Required Fields",
  component: FormBuilder,
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof FormBuilder>

// Helper to show form data
const showFormData = (data: unknown) => {
  console.log("Form Data:", data)
  const formatted = JSON.stringify(data, null, 2)

  const overlay = document.createElement("div")
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
    background: rgba(0,0,0,0.8); z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    font-family: ui-monospace, Monaco, monospace;
  `

  const modal = document.createElement("div")
  modal.style.cssText = `
    background: white; padding: 24px; border-radius: 8px; 
    max-width: 500px; width: 90%; max-height: 70vh; overflow: auto;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  `

  const title = document.createElement("h3")
  title.textContent = "Form Submitted"
  title.style.cssText = "margin: 0 0 16px 0; font-size: 18px; font-weight: 600;"

  const code = document.createElement("pre")
  code.textContent = formatted
  code.style.cssText = `
    background: #f3f4f6; padding: 16px; border-radius: 4px; 
    margin: 0; overflow: auto; font-size: 14px;
    border: 1px solid #e5e7eb;
  `

  const closeBtn = document.createElement("button")
  closeBtn.textContent = "Close"
  closeBtn.style.cssText = `
    margin-top: 16px; padding: 8px 16px; background: #3b82f6;
    color: white; border: none; border-radius: 4px; cursor: pointer;
    font-size: 14px; font-weight: 500;
  `

  closeBtn.onclick = () => document.body.removeChild(overlay)
  overlay.onclick = (e) =>
    e.target === overlay && document.body.removeChild(overlay)

  modal.appendChild(title)
  modal.appendChild(code)
  modal.appendChild(closeBtn)
  overlay.appendChild(modal)
  document.body.appendChild(overlay)
}

const requiredOptionalSchema = z.object({
  requiredField: z.string().min(1, "Required field is required"),
  optionalField: z.string().optional(),
  anotherRequired: z.string().min(1, "Another required field"),
  optionalEmail: z.string().email().optional(),
})

export const RequiredVsOptional: Story = {
  args: {
    fields: [
      {
        name: "requiredField",
        type: "text",
        label: "Required Field",
        placeholder: "This field is required",
        layout: "half",
        description:
          "Required fields automatically get an asterisk (*) from Zod schema",
      },
      {
        name: "optionalField",
        type: "text",
        label: "Optional Field",
        placeholder: "This field is optional",
        layout: "half",
        description: "Optional fields have no asterisk",
      },
      {
        name: "anotherRequired",
        type: "text",
        label: "Another Required Field",
        placeholder: "This is also required",
        layout: "half",
        description: "Also required, gets asterisk (*)",
      },
      {
        name: "optionalEmail",
        type: "email",
        label: "Optional Email",
        placeholder: "Enter your email (optional)",
        layout: "half",
        description: "Optional email field, no asterisk",
      },
    ],
    schema: requiredOptionalSchema,
    onSubmit: (data) => {
      showFormData(data)
    },
    submitLabel: "Test Required Fields Detection",
  },
}
