import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Diamond, Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { PolicyResult } from '../hooks/useLIK';

interface ResultsProps {
  results: PolicyResult;
}

export const ResultsDashboard: React.FC<ResultsProps> = ({ results }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = results.score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= results.score) {
        setCount(results.score);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [results.score]);

  return (
    <div className="relative pt-12 pb-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column */}
        <div className="space-y-12">
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h2 className="font-space text-neon-lime uppercase tracking-[0.3em] text-xs mb-4">Integrity Quotient</h2>
            <div className="relative inline-block">
              <span className="font-oswald font-bold text-7xl md:text-[120px] leading-none text-neon-lime tracking-tighter drop-shadow-[0_0_30px_rgba(190,242,100,0.3)]">
                {count.toFixed(1)}%
              </span>
              <div className="absolute -top-4 -right-8 glass px-3 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="text-neon-lime w-3 h-3" />
                <span className="font-space text-[10px] text-neon-lime">+2.4%</span>
              </div>
            </div>
            <p className="text-white/60 max-w-md mt-6 leading-relaxed">
              Your emotional asset-to-risk ratio is performing in the top 5th percentile of global sanctuaries. Your core stability remains unyielding.
            </p>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 aspect-square flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#BEF264_0%,_transparent_70%)]" />
            <h3 className="font-space text-xs uppercase tracking-widest text-white/40 absolute top-8 left-8">Core Analysis Spectrum</h3>
            
            <div className="w-full h-full flex items-center justify-center p-4">
              <div className="relative w-full max-w-[300px] aspect-square">
                <svg className="w-full h-full drop-shadow-[0_0_15px_rgba(190,242,100,0.2)]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeOpacity="0.05" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeOpacity="0.05" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeOpacity="0.05" strokeDasharray="2 2" />
                  <line x1="50" y1="5" x2="50" y2="95" stroke="white" strokeOpacity="0.05" />
                  <line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeOpacity="0.05" />
                  <motion.path 
                    d="M50 15 L85 50 L50 85 L15 50 Z" 
                    fill="#BEF264" 
                    fillOpacity="0.2" 
                    stroke="#BEF264" 
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <circle cx="50" cy="15" r="1.5" fill="#BEF264" />
                  <circle cx="85" cy="50" r="1.5" fill="#BEF264" />
                  <circle cx="50" cy="85" r="1.5" fill="#BEF264" />
                  <circle cx="15" cy="50" r="1.5" fill="#BEF264" />
                </svg>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 font-space text-[10px] text-white tracking-widest uppercase">Lifestyle</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-space text-[10px] text-white tracking-widest uppercase">Stability</div>
                <div className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 font-space text-[10px] text-white tracking-widest uppercase rotate-90">Risk</div>
                <div className="absolute top-1/2 left-0 -translate-x-1/4 -translate-y-1/2 font-space text-[10px] text-white tracking-widest uppercase -rotate-90">Core</div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Column */}
        <div className="grid gap-6">
          <h3 className="font-space text-xs uppercase tracking-widest text-white/40 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-white/20" />
            Strategic Insights
          </h3>

          <div className="space-y-6">
            {results.assets.map((asset, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="glass rounded-2xl p-6 border-l-4 border-l-neon-lime group hover:scale-[1.02] transition-transform duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-neon-lime/10 rounded-xl">
                    {asset.icon === 'diamond' ? <Diamond className="text-neon-lime w-5 h-5" /> : <Zap className="text-neon-lime w-5 h-5" />}
                  </div>
                  <span className="font-space text-[10px] text-neon-lime uppercase bg-neon-lime/10 px-2 py-1 rounded">Asset Detected</span>
                </div>
                <h4 className="font-oswald text-xl text-white tracking-tight mb-2">{asset.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{asset.description}</p>
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-neon-lime shadow-[0_0_10px_#BEF264]"
                    initial={{ width: 0 }}
                    animate={{ width: `${asset.value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}

            {results.risks.map((risk, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="glass rounded-2xl p-6 border-l-4 border-l-vibrant-fuchsia group hover:scale-[1.02] transition-transform duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-vibrant-fuchsia/10 rounded-xl">
                    <Shield className="text-vibrant-fuchsia w-5 h-5" />
                  </div>
                  <span className="font-space text-[10px] text-vibrant-fuchsia uppercase bg-vibrant-fuchsia/10 px-2 py-1 rounded">Anomaly Check</span>
                </div>
                <h4 className="font-oswald text-xl text-white tracking-tight mb-2">{risk.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{risk.description}</p>
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-vibrant-fuchsia shadow-[0_0_10px_#D946EF]"
                    initial={{ width: 0 }}
                    animate={{ width: `${risk.value}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </motion.div>
            ))}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/5 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="relative z-10">
                <h4 className="font-oswald text-2xl text-white mb-2">Initialize Protection Layer?</h4>
                <p className="text-white/60 text-sm mb-8 max-w-xs">Secure this score with an immutable LIK premium contract today.</p>
                <button className="bg-neon-lime text-midnight font-space font-bold px-6 py-3 md:px-8 md:py-4 w-full md:w-auto justify-center rounded-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(190,242,100,0.3)]">
                  ACTIVATE POLICY
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 grayscale pointer-events-none">
                <img 
                  src="https://picsum.photos/seed/shield/400/400" 
                  alt="Digital Shield" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Signature */}
      <footer className="w-full py-12 flex flex-col items-center justify-center gap-4 opacity-50">
        <div className="h-[1px] w-32 bg-white/10 mb-4" />
        <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-center">
          Verification Signature: <span className="text-neon-lime">LK-8992-B-DELTA-RES-FINAL</span>
        </div>
        <div className="font-mono text-[10px] text-white/40">
          ENCRYPTED TIMESTAMP: {new Date().toISOString()}
        </div>
      </footer>
    </div>
  );
};
