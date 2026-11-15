import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.08em] transition-[background-color,color,transform,border-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-giallo disabled:pointer-events-none disabled:opacity-50 active:translate-y-px cursor-pointer [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        rosso: "bg-rosso text-white hover:bg-white hover:text-carbon",
        outline: "border border-white/40 text-ivory hover:bg-white hover:text-carbon",
        ink: "bg-carbon text-ivory hover:bg-rosso",
        ghost: "text-ivory hover:text-rosso-hi",
      },
      size: {
        default: "h-12 px-7",
        lg: "h-14 px-9 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "rosso", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
