import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-x-hidden dot-grid selection:bg-neon-lime selection:text-midnight">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-lime/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-vibrant-fuchsia/5 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative z-50 flex justify-between items-center w-full px-6 py-6 lg:px-12 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="text-2xl font-bold tracking-tighter text-neon-lime font-oswald italic uppercase">LIK</div>
        <div className="flex gap-4">
          <button className="p-2 text-white/60 hover:text-neon-lime transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
          <button className="p-2 text-white/60 hover:text-neon-lime transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <main className="relative z-10">
        {children}
      </main>

      {/* Footer Status */}
      <footer className="fixed bottom-0 left-0 w-full px-8 py-4 flex justify-between items-center z-20 pointer-events-none">
        <div className="text-[10px] font-space text-white/20 tracking-[0.5em] uppercase">Digital Sanctuary v2.0</div>
        <div className="flex gap-8 pointer-events-auto">
          <a href="#" className="text-[10px] font-space text-white/40 hover:text-neon-lime transition-colors uppercase tracking-widest">Privacy</a>
          <a href="#" className="text-[10px] font-space text-white/40 hover:text-neon-lime transition-colors uppercase tracking-widest">Terms</a>
        </div>
      </footer>
    </div>
  );
};
