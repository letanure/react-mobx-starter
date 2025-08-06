import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const Submit: Story = {
  args: {
    type: "submit",
    children: "Submit",
  },
}

export const Reset: Story = {
  args: {
    type: "reset",
    children: "Reset",
  },
}

export const LongText: Story = {
  args: {
    children: "This is a button with very long text to test wrapping",
  },
}
