import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "dark relative group border text-foreground mx-auto text-center rounded-full font-bold cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-slate-500/5 hover:bg-blue-500/0 text-white text-2xl font-mono border-blue-500/20",
                solid: "bg-blue-500 hover:bg-blue-600 text-white border-transparent hover:border-foreground/50 transition-all duration-200",
                ghost: "border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10",
            },
            size: {
                default: "px-7 py-1.5 ",
                sm: "px-4 py-0.5 ",
                lg: "px-14 py-4 ",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { neon?: boolean }

const ButtonNeon = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children,onClick,...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
                onClick={onClick}
              
            >
                <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-blue-500 via-blue-600 to-transparent hidden", neon && "block")} />
                {children}
                <span className={cn("absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-blue-500 via-blue-600 to-transparent hidden", neon && "block")} />
            </button>
        );
    }
)

ButtonNeon.displayName = 'Collect';

export { ButtonNeon, buttonVariants };