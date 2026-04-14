import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUESTIONS } from '../constants';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface AssessmentProps {
  onComplete: (answers: number[]) => void;
}

export const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(50));
  const currentQuestion = QUESTIONS[currentIndex];

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const updateAnswer = (val: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = val;
    setAnswers(newAnswers);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-32 px-6">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-[60]">
        <motion.div 
          className="h-full bg-neon-lime shadow-[0_0_10px_#BEF264]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <span className="text-white/40 font-space text-xs tracking-widest uppercase">
            Question {String(currentIndex + 1).padStart(2, '0')} / {QUESTIONS.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-12"
          >
            <section className="space-y-4">
              <h1 className="text-4xl md:text-7xl font-oswald font-bold uppercase leading-none tracking-tighter text-white">
                {currentQuestion.text.split(' ').slice(0, 2).join(' ')} <br />
                <span className="text-vibrant-fuchsia italic">{currentQuestion.text.split(' ').slice(2).join(' ')}</span>
              </h1>
            </section>

            {/* Input Section */}
            {currentQuestion.type === 'slider' ? (
              <section className="glass rounded-3xl p-8 space-y-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-space uppercase tracking-widest text-white/40">Preference Scale</span>
                  <span className="text-neon-lime font-oswald text-lg md:text-xl">Score {answers[currentIndex]}</span>
                </div>
                <div className="relative pt-6">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={answers[currentIndex]}
                    onChange={(e) => updateAnswer(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-6">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[10px] text-white/40 uppercase tracking-tighter">{currentQuestion.labels?.min}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] text-white/40 uppercase tracking-tighter">{currentQuestion.labels?.max}</span>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <section className="space-y-4">
                <label className="text-xs font-space uppercase tracking-widest text-white/40 ml-2">Response Archetype</label>
                <div className="grid gap-3">
                  {currentQuestion.options?.map((option, idx) => {
                    const scaledValue = Math.round((idx / (currentQuestion.options!.length - 1)) * 100);
                    const isSelected = answers[currentIndex] === scaledValue;
                    return (
                      <button
                        key={idx}
                        onClick={() => updateAnswer(scaledValue)}
                        className={cn(
                          "group flex items-center justify-between glass p-6 rounded-2xl transition-all duration-300 text-left",
                          isSelected ? "bg-neon-lime/10 border-neon-lime/50 shadow-[0_0_15px_rgba(190,242,100,0.2)]" : "hover:bg-white/10 hover:border-neon-lime/30"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-full border flex items-center justify-center transition-colors font-space text-xs",
                            isSelected ? "bg-neon-lime border-neon-lime text-midnight font-bold" : "border-white/20 group-hover:border-neon-lime group-hover:text-neon-lime"
                          )}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className={cn("text-base md:text-lg font-medium leading-snug", isSelected ? "text-white" : "text-white/60")}>{option}</span>
                        </div>
                        <CheckCircle2 className={cn("w-6 h-6 transition-opacity", isSelected ? "opacity-100 text-neon-lime" : "opacity-0")} />
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex flex-col-reverse md:flex-row items-stretch md:items-center justify-between gap-6 pt-8 pb-16">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors disabled:opacity-0"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-space text-sm uppercase tracking-widest">Previous</span>
          </button>
          
          <button 
            onClick={handleNext}
            className="group relative px-8 py-4 bg-neon-lime text-midnight font-bold rounded-lg overflow-hidden transition-all duration-400 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(190,242,100,0.3)]"
          >
            <div className="relative z-10 flex items-center gap-3">
              <span className="font-space uppercase tracking-widest text-sm">
                {currentIndex === QUESTIONS.length - 1 ? 'Finalize Policy' : 'Next Insight'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
