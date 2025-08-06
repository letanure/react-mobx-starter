import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

const boxVariants = cva("", {
  variants: {
    padding: {
      none: "",
      xs: "p-1",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    },
    margin: {
      none: "",
      xs: "m-1",
      sm: "m-2",
      md: "m-4",
      lg: "m-6",
      xl: "m-8",
    },
    rounded: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    padding: "none",
    margin: "none",
    rounded: "none",
  },
})

interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  asChild?: boolean
  as?: keyof JSX.IntrinsicElements
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      padding,
      margin,
      rounded,
      asChild = false,
      as = "div",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : as

    return (
      <Comp
        ref={ref}
        className={cn(boxVariants({ padding, margin, rounded }), className)}
        {...props}
      />
    )
  },
)
Box.displayName = "Box"

export { Box, boxVariants }
