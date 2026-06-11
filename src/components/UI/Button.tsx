import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neuro-darkBg disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';
  
  // Garantir a área mínima de toque de 44x44px para ergonomia mobile
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm min-h-[44px]',
    md: 'px-6 py-3 text-base min-h-[46px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]'
  };

  const variantStyles = {
    primary: 'bg-neuro-primary text-white hover:bg-neuro-primaryHover hover:shadow-glow focus:ring-neuro-primary',
    secondary: 'bg-neuro-cardBg border border-neuro-border text-neuro-textPrimary hover:bg-opacity-80 focus:ring-neuro-primary',
    accent: 'bg-neuro-accent text-white hover:bg-neuro-accentHover hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] focus:ring-neuro-accent',
    outline: 'bg-transparent border border-neuro-textSecondary text-neuro-textPrimary hover:bg-white hover:bg-opacity-5 focus:ring-neuro-textPrimary'
  };

  return (
    <button
      className={twMerge(
        clsx(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && 'w-full',
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
};
