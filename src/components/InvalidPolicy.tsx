import React from 'react';
import { ShieldAlert, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface InvalidPolicyProps {
  onRestart: () => void;
}

export const InvalidPolicy: React.FC<InvalidPolicyProps> = ({ onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-12 max-w-lg text-center space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-vibrant-fuchsia shadow-[0_0_15px_#D946EF]" />
        
        <div className="mx-auto w-20 h-20 bg-vibrant-fuchsia/10 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="w-10 h-10 text-vibrant-fuchsia" />
        </div>
        
        <div className="space-y-4">
          <h2 className="font-oswald text-4xl text-white font-bold tracking-tighter uppercase">Policy Voided</h2>
          <p className="text-white/60 leading-relaxed font-space text-sm">
            The underwriting contract you attempted to access is either expired, corrupted, or does not exist. 
            Digital assets are secure, but this specific policy cannot be retrieved.
          </p>
        </div>

        <button 
          onClick={onRestart}
          className="group relative px-8 py-4 bg-white/5 border border-white/10 hover:border-vibrant-fuchsia/50 text-white font-space font-bold uppercase tracking-widest rounded-md overflow-hidden transition-all flex items-center justify-center w-full gap-3"
        >
          <RefreshCcw className="w-4 h-4 text-vibrant-fuchsia" />
          Initialize New Protocol
        </button>
      </motion.div>
    </div>
  );
};
