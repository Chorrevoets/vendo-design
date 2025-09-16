import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        secondary:
          "border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        destructive:
          "border border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        outline: "text-foreground border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        statusGreen: "bg-green-600 text-white hover:bg-green-700",
        statusOrange: "bg-orange-600 text-white hover:bg-orange-700",
        statusRed: "bg-red-600 text-white hover:bg-red-700",
        statusGray: "bg-gray-600 text-white hover:bg-gray-700",
        statusBlue: "bg-blue-600 text-white hover:bg-blue-700",
        statusPurple: "bg-purple-600 text-white hover:bg-purple-700",
        statusBlack: "bg-black text-white hover:bg-black/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
