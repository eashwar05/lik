import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Copy, Check, RefreshCw } from 'lucide-react';

interface ShareProps {
  policyId: string;
  onCheckResults: () => void;
  isChecking: boolean;
}

export const Share: React.FC<ShareProps> = ({ policyId, onCheckResults, isChecking }) => {
  const [copied, setCopied] = useState(false);
  const shareLink = `${window.location.origin}/?policyId=${policyId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6 pb-20">
      <div className="w-full max-w-4xl flex flex-col items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <span className="text-neon-lime font-space text-xs uppercase tracking-[0.4em] mb-4 block">Phase 1 Complete</span>
          <h1 className="font-oswald text-5xl sm:text-6xl md:text-8xl leading-none text-white font-bold tracking-tighter">
            Policy <span className="text-neon-lime">Initialized</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-lg mx-auto">
            Your assessment answers have been securely encrypted into a new policy. Invite your co-beneficiary to complete the underwriting.
          </p>
        </motion.div>

        <div className="w-full max-w-lg space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-2xl p-8 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-lime/10 rounded-full blur-3xl" />
            <div className="flex flex-col gap-2 relative z-10">
              <label className="text-white/40 font-space text-[10px] uppercase tracking-widest">Active Generation Phase</label>
              <div className="text-3xl sm:text-4xl font-oswald text-white tracking-widest border-b border-neon-lime/20 pb-2">
                LIK-<span className="text-neon-lime">{policyId.split('-')[0]}</span>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
                <span className="text-xs text-neon-lime/60 font-space">SYST_CRYPT_WAITING_CO_SIGN</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 shadow-2xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-oswald text-lg uppercase tracking-wider text-white">Vault Access</h3>
                <ShieldAlert className="text-vibrant-fuchsia w-5 h-5" />
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Extend the sanctuary. Share this encrypted link to invite your partner to complete the assessment.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 border border-white/5 overflow-hidden">
                  <span className="text-xs font-mono text-white/40 truncate mr-4">{shareLink}</span>
                  <button 
                    onClick={copyLink}
                    className="group flex items-center gap-2 text-neon-lime font-space text-xs uppercase font-bold tracking-wider hover:text-white transition-colors whitespace-nowrap"
                  >
                    {copied ? 'Copied' : 'Copy'}
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center pt-4"
          >
            <button 
              onClick={onCheckResults}
              disabled={isChecking}
              className="group relative px-6 py-3 bg-white/5 border border-white/10 text-white font-space text-xs uppercase tracking-widest rounded-md hover:bg-white/10 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
              Check Readiness
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
