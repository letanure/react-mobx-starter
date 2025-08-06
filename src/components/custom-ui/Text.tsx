import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

const textVariants = cva("", {
  variants: {
    variant: {
      // Semantic variants
      default: "",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
      // Style variants
      lead: "text-xl font-normal",
      bold: "font-bold",
      italic: "italic",
      underline: "underline underline-offset-4",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
    },
    size: {
      // Mobile-first with responsive desktop sizes
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg lg:text-xl",
      xl: "text-xl lg:text-2xl",
      "2xl": "text-2xl lg:text-3xl",
      "3xl": "text-3xl lg:text-4xl",
      "4xl": "text-4xl lg:text-5xl",
      "5xl": "text-5xl lg:text-6xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    tracking: {
      normal: "",
      tight: "tracking-tight",
      wide: "tracking-wide",
    },
    leading: {
      none: "leading-none",
      tight: "leading-tight",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    weight: "normal",
    tracking: "normal",
    leading: "normal",
  },
  compoundVariants: [
    // Headings get specific treatment
    {
      size: ["3xl", "4xl", "5xl"],
      className: "tracking-tight font-semibold scroll-m-20",
    },
    {
      size: ["xl", "2xl"],
      className: "tracking-tight font-semibold",
    },
  ],
})

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "div"
    | "label"
    | "strong"
    | "em"
    | "code"
  asChild?: boolean
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      variant,
      size,
      weight,
      tracking,
      leading,
      as = "p",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : as

    return (
      <Comp
        ref={ref as React.Ref<HTMLElement>}
        className={cn(
          textVariants({ variant, size, weight, tracking, leading }),
          className,
        )}
        {...props}
      />
    )
  },
)
Text.displayName = "Text"
