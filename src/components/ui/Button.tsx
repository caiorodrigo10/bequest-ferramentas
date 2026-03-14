import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const base = 'font-bold rounded-[16px] px-6 py-3 transition-all cursor-pointer';
  const variants = {
    primary: 'bg-[#3F1DFF] hover:bg-[#3217C7] text-white',
    secondary: 'bg-[#FFBA26] hover:bg-[#E6A520] text-[#0c0c0c]',
    ghost: 'bg-white/10 hover:bg-white/20 text-white',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
