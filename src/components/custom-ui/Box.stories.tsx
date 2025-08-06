import type { Meta, StoryObj } from "@storybook/react"
import { Box } from "./Box"
import { Text } from "./Text"

const meta = {
  title: "Custom UI/Box",
  component: Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    padding: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    margin: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    rounded: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },
    as: {
      control: { type: "select" },
      options: ["div", "section", "aside", "article"],
    },
  },
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    padding: "md",
    className: "bg-blue-100",
    children: <Text tag="p">This is content inside a Box component</Text>,
  },
}

export const WithPadding: Story = {
  args: {
    padding: "lg",
    className: "bg-green-100 border-2 border-green-300",
    children: <Text tag="p">Box with large padding</Text>,
  },
}

export const WithMargin: Story = {
  args: {
    margin: "lg",
    padding: "md",
    className: "bg-yellow-100 border-2 border-yellow-300",
    children: <Text tag="p">Box with large margin</Text>,
  },
}

export const Rounded: Story = {
  args: {
    padding: "lg",
    rounded: "lg",
    className: "bg-purple-100 border-2 border-purple-300",
    children: <Text tag="p">Rounded box with large border radius</Text>,
  },
}

export const FullyRounded: Story = {
  args: {
    padding: "xl",
    rounded: "full",
    className:
      "bg-pink-100 border-2 border-pink-300 w-32 h-32 flex items-center justify-center",
    children: <Text tag="span">Circle</Text>,
  },
}

export const AsCard: Story = {
  args: {
    padding: "lg",
    rounded: "md",
    className: "bg-white border shadow-lg max-w-sm",
    children: (
      <>
        <Text tag="h3" className="mb-2">
          Card Title
        </Text>
        <Text tag="p" variant="muted">
          This is a card-like component using the Box primitive with shadow and
          border styling.
        </Text>
      </>
    ),
  },
}

export const AllPadding: Story = {
  args: {
    children: "Demo content",
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <Text tag="h4">None</Text>
        <Box padding="none" className="bg-gray-100 border">
          <Text tag="p">No padding</Text>
        </Box>
      </div>
      <div>
        <Text tag="h4">Extra Small (xs)</Text>
        <Box padding="xs" className="bg-gray-100 border">
          <Text tag="p">Extra small padding</Text>
        </Box>
      </div>
      <div>
        <Text tag="h4">Small (sm)</Text>
        <Box padding="sm" className="bg-gray-100 border">
          <Text tag="p">Small padding</Text>
        </Box>
      </div>
      <div>
        <Text tag="h4">Medium (md)</Text>
        <Box padding="md" className="bg-gray-100 border">
          <Text tag="p">Medium padding</Text>
        </Box>
      </div>
      <div>
        <Text tag="h4">Large (lg)</Text>
        <Box padding="lg" className="bg-gray-100 border">
          <Text tag="p">Large padding</Text>
        </Box>
      </div>
      <div>
        <Text tag="h4">Extra Large (xl)</Text>
        <Box padding="xl" className="bg-gray-100 border">
          <Text tag="p">Extra large padding</Text>
        </Box>
      </div>
    </div>
  ),
}

export const AllRounded: Story = {
  args: {
    children: "Demo content",
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <Text tag="h4">None</Text>
        <Box padding="md" rounded="none" className="bg-blue-100 border">
          <Text tag="p">No border radius</Text>
        </Box>
      </div>
      <div>
        <Text tag="h4">Small (sm)</Text>
        <Box padding="md" rounded="sm" className="bg-blue-100 border">
          <Text tag="p">Small border radius</Text>
        </Box>
      </div>
      <div>
        <Text tag="h4">Medium (md)</Text>
        <Box padding="md" rounded="md" className="bg-blue-100 border">
          <Text tag="p">Medium border radius</Text>
        </Box>
      </div>
      <div>
        <Text tag="h4">Large (lg)</Text>
        <Box padding="md" rounded="lg" className="bg-blue-100 border">
          <Text tag="p">Large border radius</Text>
        </Box>
      </div>
      <div>
        <Text tag="h4">Extra Large (xl)</Text>
        <Box padding="md" rounded="xl" className="bg-blue-100 border">
          <Text tag="p">Extra large border radius</Text>
        </Box>
      </div>
      <div>
        <Text tag="h4">Full</Text>
        <Box
          padding="md"
          rounded="full"
          className="bg-blue-100 border w-32 h-32 flex items-center justify-center"
        >
          <Text tag="p">Full border radius</Text>
        </Box>
      </div>
    </div>
  ),
}
