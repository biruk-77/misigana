
import React, { useState } from 'react';
import { Music, Play, SkipForward, Repeat, Heart, Wind, Sun, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';

const TRACKS = [
  { id: 1, title: "The 5:59 Silence", vibe: "Spiritual Peace", icon: <Wind size={14} />, desc: "The quiet weight of prayers before the sun rises.", color: "#D1D8C5" },
  { id: 2, title: "Echoes of Dec 5", vibe: "Pure Euphoria", icon: <Sun size={14} />, desc: "The vibrant color of the first second I saw you.", color: "#E2B1B1" },
  { id: 3, title: "The Gentleman's Vow", vibe: "Eternal Devotion", icon: <Heart size={14} />, desc: "The steady rhythm of a heart that chose you forever.", color: "#d4af37" },
];

const VibePlayer: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loveVolume, setLoveVolume] = useState(100);

  const currentTrack = TRACKS[activeTrack];

  return (
    <div className="bg-white p-10 sm:p-16 rounded-[4rem] border border-primary/10 luxury-shadow flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden group">
      <div className="absolute -bottom-20 -left-20 opacity-[0.02] group-hover:scale-110 transition-transform duration-[5s]">
        <Music size={500} />
      </div>

      {/* Spinning Vinyl Visual */}
      <div className="relative flex-shrink-0">
        <div className={`relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-espresso shadow-2xl flex items-center justify-center border-[8px] border-espresso/10 ${isPlaying ? 'animate-spin-vinyl' : ''}`}>
          {/* Record Grooves */}
          <div className="absolute inset-4 rounded-full border border-white/5" />
          <div className="absolute inset-8 rounded-full border border-white/5" />
          <div className="absolute inset-12 rounded-full border border-white/5" />
          <div className="absolute inset-16 rounded-full border border-white/5" />
          
          {/* Record Label */}
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white flex flex-col items-center justify-center p-4 text-center shadow-inner relative z-10">
            <div className="absolute inset-1 rounded-full border border-primary/20" />
            <Heart size={16} fill={currentTrack.color} className="text-transparent mb-1" />
            <span className="text-[8px] font-black uppercase tracking-tighter text-espresso/40">Side A</span>
            <span className="text-[7px] font-sans font-bold uppercase text-espresso leading-tight">{currentTrack.vibe}</span>
          </div>
          
          {/* Hole */}
          <div className="absolute size-2 rounded-full bg-espresso z-20 shadow-inner" />
        </div>
        
        {/* Playback Needle (Stylized) */}
        <div className={`absolute -top-4 -right-8 w-32 h-2 origin-left transition-transform duration-700 pointer-events-none ${isPlaying ? 'rotate-[20deg]' : 'rotate-0'}`}>
          <div className="h-full w-full bg-gradient-to-r from-espresso/40 to-espresso rounded-full shadow-lg" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 size-4 bg-espresso rounded-sm" />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-8 relative z-10 w-full">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
             <div className="space-y-1">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={currentTrack.vibe}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-[8px] font-black uppercase tracking-[0.4em] text-primary"
                  >
                    {currentTrack.vibe}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.h4 
                    key={currentTrack.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-3xl sm:text-4xl font-display font-black italic text-text-main leading-none"
                  >
                    {currentTrack.title}
                  </motion.h4>
                </AnimatePresence>
             </div>
             <div className="flex gap-1 h-6 items-end">
                {[1,2,3,4,5].map(i => (
                  <motion.div 
                    key={i} 
                    animate={isPlaying ? { height: [10, 24, 12, 20, 8] } : { height: 4 }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                    className="w-1 bg-primary rounded-full" 
                  />
                ))}
             </div>
          </div>
          <p className="text-sm font-display italic text-text-main/40 max-w-sm">{currentTrack.desc}</p>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="space-y-3">
          <div className="h-1 w-full bg-primary/10 rounded-full relative overflow-hidden cursor-pointer">
             <motion.div 
               animate={isPlaying ? { x: ["-100%", "100%"] } : { x: "-30%" }}
               transition={isPlaying ? { repeat: Infinity, duration: 240, ease: "linear" } : {}}
               className="absolute inset-y-0 left-0 bg-primary w-full rounded-full" 
             />
          </div>
          <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-text-main/20">
             <span>05:59</span>
             <span>Infinity</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)} 
              className="text-text-main/20 hover:text-primary transition-colors"
            >
              <SkipForward size={20} className="rotate-180" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="size-16 rounded-full bg-text-main text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group/btn relative overflow-hidden"
            >
               <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
               <div className="relative z-10">
                 {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
               </div>
            </button>
            <button 
              onClick={() => setActiveTrack((prev) => (prev + 1) % TRACKS.length)} 
              className="text-text-main/20 hover:text-primary transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <Repeat size={14} className={`transition-colors ${isPlaying ? 'text-primary' : 'text-text-main/20'}`} />
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black uppercase tracking-widest text-text-main/40">Devotion Level</span>
              <span className="text-[10px] font-black italic text-primary">{loveVolume}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibePlayer;
