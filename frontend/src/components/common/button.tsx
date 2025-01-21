import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, ...props }, ref) => (
        <button
            ref={ref}
            {...props}
            className={`p-3 rounded text-white font-semibold ${className}`}
        >
            {children}
        </button>
    )
);

Button.displayName = "Button";
