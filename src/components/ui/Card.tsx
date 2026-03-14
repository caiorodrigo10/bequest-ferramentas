import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`bg-[#141414] border border-white/10 rounded-[24px] p-6 ${
        hover ? 'hover:bg-[#1c1c1c] hover:border-white/20 transition-all' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
