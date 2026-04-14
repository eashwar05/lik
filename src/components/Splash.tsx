import React from 'react';
import { motion } from 'motion/react';

interface SplashProps {
  onStart: () => void;
  isInvitedUser?: boolean;
}

export const Splash: React.FC<SplashProps> = ({ onStart, isInvitedUser }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6 pb-20">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <span className="text-neon-lime font-space text-xs uppercase tracking-[0.4em] mb-4 block">Secure Underwriting Protocol</span>
            <h1 className="font-oswald text-6xl md:text-[12rem] leading-none text-neon-lime font-bold tracking-tighter cinematic-glow select-none">
              LIK
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 max-w-md"
          >
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              {isInvitedUser 
                ? "You have been invited to a secure LIK policy evaluation. Initiate your assessment to complete the underwriting protocol."
                : "Initiate high-fidelity protection for your digital assets. The LIK protocol generates a sovereign policy ID backed by cinematic-grade risk assessment."}
            </p>
            
            <button 
              onClick={onStart}
              className="group relative px-6 py-3 md:px-8 md:py-4 bg-neon-lime text-midnight font-oswald font-bold text-lg md:text-xl uppercase tracking-widest rounded-md overflow-hidden transition-all duration-400 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(190,242,100,0.3)]"
            >
              <span className="relative z-10">{isInvitedUser ? 'Start Evaluation' : 'Start Underwriting'}</span>
            </button>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-space mb-1">Trust Latency</p>
              <p className="text-2xl font-oswald text-vibrant-fuchsia">0.04ms</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-space mb-1">Risk Vector</p>
              <p className="text-2xl font-oswald text-neon-lime">Stable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Image Texture */}
      <div className="fixed top-0 right-0 w-1/3 h-1/2 overflow-hidden pointer-events-none opacity-40 -z-10">
        <img 
          src="https://picsum.photos/seed/tech/1920/1080?blur=10" 
          alt="Abstract texture" 
          className="w-full h-full object-cover mix-blend-overlay grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};
