
import React from 'react';
import { Sparkles, Heart, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onEnter: () => void;
}

const Hero: React.FC<HeroProps> = ({ onEnter }) => {
  return (
    <div className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-champagne p-4 sm:p-8 scene-3d preserve-3d">
      
      {/* Dynamic Texture Layer */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.1] pointer-events-none" />
      
      {/* Background Floating Typography */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none overflow-hidden">
        <h2 className="text-[50vw] font-display font-black italic text-espresso leading-none whitespace-nowrap">Eternal</h2>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center max-w-6xl mx-auto w-full space-y-8 sm:space-y-12">
        
        {/* Entrance Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
           <div className="w-px h-16 sm:h-24 bg-gradient-to-b from-transparent to-gold mb-6" />
           <div className="flex items-center gap-4">
             <Heart size={14} className="text-gold fill-gold/20" />
             <span className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.8em] sm:tracking-[1em] text-gold/60">A Sovereign Sanctuary</span>
             <Heart size={14} className="text-gold fill-gold/20" />
           </div>
        </motion.div>
        
        {/* Main Branding */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="relative group w-full"
        >
          <div className="absolute -top-16 -left-16 opacity-10 animate-float-slow pointer-events-none hidden sm:block">
            <Sparkles size={180} className="text-gold" />
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[10vw] font-display italic font-black text-espresso tracking-tighter leading-[0.85] py-2 select-none">
            Biruk <br/>
            <span className="luxury-text-gradient py-1 inline-block">&</span> <br/>
            Misgana
          </h1>
          
          <div className="absolute -bottom-10 -right-6 sm:-right-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
             <div className="bg-white/95 backdrop-blur-2xl p-4 sm:p-6 rounded-3xl shadow-2xl border border-gold/10 rotate-12">
                <Star size={28} className="text-gold fill-gold/5 animate-pulse" />
             </div>
          </div>
        </motion.div>

        {/* Action Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="space-y-8 sm:space-y-12 w-full px-4"
        >
          <p className="text-lg sm:text-2xl text-espresso/40 font-elegant italic tracking-wide max-w-2xl mx-auto leading-tight sm:leading-relaxed">
            "Every pixel is a promise, every scroll is a prayer answered. Welcome to our sanctuary."
          </p>
          
          <div className="flex flex-col items-center">
            <button 
              onClick={onEnter}
              className="group relative h-16 sm:h-20 px-12 sm:px-20 rounded-full bg-espresso text-white font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[10px] sm:text-[11px] flex items-center justify-center overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gold/20 blur-3xl group-hover:opacity-100 opacity-0 transition-opacity" />
              <span className="relative z-10 flex items-center gap-4 sm:gap-6">
                Unlock Archive <Zap size={16} className="text-gold animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1)" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <div className="flex gap-4">
          {[1,2,3].map(i => (
            <motion.div 
              key={i} 
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} 
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
            >
              <Heart size={10} fill="currentColor" className="text-gold/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
