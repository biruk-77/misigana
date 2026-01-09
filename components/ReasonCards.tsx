
import React, { useState, useCallback } from 'react';
import { RefreshCw, Heart, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_REASONS } from '../constants';
import { generateLoveReason } from '../services/geminiService';

const ReasonCards: React.FC = () => {
  const [currentReason, setCurrentReason] = useState(INITIAL_REASONS[0].text);
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const spawnParticles = useCallback(() => {
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * -100 - 50,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  }, []);

  const getNextReason = async () => {
    setLoading(true);
    spawnParticles();
    const newReason = await generateLoveReason();
    setCurrentReason(newReason);
    setLoading(false);
  }

  return (
    <div className="bg-white p-12 sm:p-20 rounded-[4rem] h-full flex flex-col justify-between space-y-16 relative overflow-hidden group border border-gold/10 luxury-shadow">
      <div className="absolute -top-20 -right-20 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-[3s] rotate-12">
        <Heart size={600} fill="currentColor" className="text-gold" />
      </div>

      <div className="space-y-10 relative z-10">
        <div className="flex items-center gap-6">
           <div className="h-px w-10 bg-gold/20" />
           <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gold/40 italic">The Sacred Reason</span>
        </div>
        
        <div className="relative">
          <Quote size={40} className="absolute -left-12 -top-8 text-gold/5 group-hover:text-gold/10 transition-colors" />
          <AnimatePresence mode="wait">
            <motion.p 
              key={currentReason}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl font-display font-black italic text-espresso tracking-tighter leading-[1.1]"
            >
              "{currentReason}"
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between relative z-10 pt-12 border-t border-gold/10">
        <div className="flex items-center gap-6">
           <div className="relative">
             <div className="absolute inset-0 bg-gold/10 blur-2xl rounded-full scale-150 animate-pulse" />
             <div className="relative w-16 h-16 rounded-full bg-white border border-gold/10 flex items-center justify-center shadow-xl">
               <Heart size={24} className="text-gold fill-gold/5" />
             </div>
           </div>
           <div className="space-y-1">
             <p className="text-[10px] font-black uppercase tracking-widest text-espresso/40">Devoted To</p>
             <p className="text-xl text-espresso font-elegant italic tracking-wide">Misgana</p>
           </div>
        </div>

        {/* Particle Container */}
        <div className="relative">
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute text-gold pointer-events-none"
              >
                <Heart size={16} fill="currentColor" />
              </motion.div>
            ))}
          </AnimatePresence>

          <button
            onClick={getNextReason}
            disabled={loading}
            className="size-16 rounded-full bg-espresso text-white hover:bg-gold transition-all duration-700 flex items-center justify-center shadow-2xl active:scale-90 group/btn relative overflow-hidden"
          >
            <motion.div
              animate={loading ? { rotate: 360 } : { rotate: 0 }}
              transition={{ repeat: loading ? Infinity : 0, duration: 1, ease: "linear" }}
              className="relative z-10"
            >
              <RefreshCw size={20} />
            </motion.div>
            <div className="absolute inset-0 bg-gold translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReasonCards;
