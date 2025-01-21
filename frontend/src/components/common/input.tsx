// components/ui/input.tsx
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <input ref={ref} {...props} className="border rounded p-2 w-full" />;
});

Input.displayName = "Input";

export { Input };
