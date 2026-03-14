import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'accent' | 'secondary' | 'ghost';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'accent', children, className = '' }: BadgeProps) {
  const base = 'inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full';
  const variants = {
    accent: 'bg-[#3F1DFF] text-white',
    secondary: 'bg-[#FFBA26] text-[#0c0c0c]',
    ghost: 'bg-white/10 text-white',
  };
  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
