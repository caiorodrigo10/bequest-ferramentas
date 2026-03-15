import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-['DM_Sans']">
      <Sidebar />
      <main className="flex-1 ml-[240px] p-8 max-w-screen-xl">
        {children}
      </main>
    </div>
  );
}
