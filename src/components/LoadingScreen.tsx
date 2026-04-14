import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Radar, Shield, Heart, CircleDollarSign } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Quantifying Emotional Solvency...",
    "Detecting Coverage Gaps...",
    "Finalizing Policy Terms...",
    "Synchronizing Trust Latency...",
    "Encrypting Sanctuary Vault..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-24 overflow-hidden">
      {/* Scanning Beam */}
      <motion.div 
        className="fixed left-0 w-full h-[2px] bg-neon-lime/50 shadow-[0_0_20px_#BEF264] z-50 pointer-events-none"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative w-full max-w-4xl flex flex-col items-center">
        {/* Radar Scanner */}
        <div className="relative mb-12 flex items-center justify-center">
          <div className="absolute w-[300px] h-[300px] bg-neon-lime/5 rounded-full blur-[60px]" />
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute w-3/4 h-3/4 border border-white/5 rounded-full" />
            <div className="absolute w-1/2 h-1/2 border border-white/5 rounded-full" />
            <div className="absolute w-1/4 h-1/4 border border-white/5 rounded-full" />
            
            {/* Sweep */}
            <motion.div 
              className="absolute inset-0 origin-center"
              style={{ background: 'conic-gradient(from 0deg, transparent 0%, rgba(190, 242, 100, 0.2) 50%, rgba(190, 242, 100, 0.5) 100%)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <Radar className="text-neon-lime w-12 h-12" />
              <div className="mt-2 font-space text-[10px] text-neon-lime uppercase tracking-[0.3em] font-bold">Scanning</div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6 max-w-lg mx-auto">
          <h1 className="text-4xl md:text-5xl font-oswald font-bold text-white tracking-tight leading-none">
            Underwriting <span className="text-neon-lime">Reveal</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Precision assessment in progress. Our AI is parsing through billions of data points to generate your custom LIK policy.
          </p>

          <div className="glass rounded-xl p-6 shadow-2xl w-full max-w-md mx-auto overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-lime/40 to-transparent" />
            <div className="flex items-center gap-4 text-left">
              <div className="flex-1">
                <div className="font-space text-[10px] text-neon-lime uppercase tracking-widest mb-1">Status Report</div>
                <motion.div 
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-medium text-white text-sm"
                >
                  {messages[messageIndex]}
                </motion.div>
              </div>
              <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-neon-lime"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl border-l border-white/10 relative overflow-hidden group">
            <Shield className="text-neon-lime w-6 h-6 mb-3" />
            <div className="font-space text-xs text-white/40 uppercase tracking-wider mb-1">Risk Profile</div>
            <div className="text-xl font-oswald text-white">OPTIMAL</div>
          </div>
          <div className="glass p-6 rounded-xl border-l border-white/10 relative overflow-hidden group">
            <Heart className="text-vibrant-fuchsia w-6 h-6 mb-3" />
            <div className="font-space text-xs text-white/40 uppercase tracking-wider mb-1">Emotive Index</div>
            <div className="text-xl font-oswald text-white">STABLE</div>
          </div>
          <div className="glass p-6 rounded-xl border-l border-white/10 relative overflow-hidden group">
            <CircleDollarSign className="text-neon-lime w-6 h-6 mb-3" />
            <div className="font-space text-xs text-white/40 uppercase tracking-wider mb-1">Coverage Limit</div>
            <div className="text-xl font-oswald text-white">CALCULATING</div>
          </div>
        </div>
      </div>
    </div>
  );
};
