import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white font-['DM_Sans']">
      <Navbar />
      <main className="pt-20 px-4 md:px-12 lg:px-20">
        {children}
      </main>
    </div>
  );
}
