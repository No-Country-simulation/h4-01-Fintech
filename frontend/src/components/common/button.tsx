import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <button
            {...props}
            className={`px-4 py-2 rounded-md ${className}`}
        >
            {children}
        </button>
    );
};
