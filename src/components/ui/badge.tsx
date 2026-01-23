import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sw-yellow focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-sw-yellow/20 text-sw-yellow",
        secondary: "border-transparent bg-space-light text-gray-300",
        destructive: "border-transparent bg-sw-red/20 text-sw-red",
        outline: "border-sw-yellow/30 text-sw-yellow",
        blue: "border-transparent bg-sw-blue/20 text-sw-blue",
        cyan: "border-transparent bg-sw-cyan/20 text-sw-cyan",
        green: "border-transparent bg-sw-green/20 text-sw-green",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
