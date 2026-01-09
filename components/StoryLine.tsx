
import React, { useRef } from 'react';
import { MEMORIES } from '../constants';
import { Memory } from '../types';
import { Heart, Star, ChevronDown, Sparkles } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

const StoryLine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div 
      className="w-full h-full bg-espresso overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar relative" 
      ref={containerRef}
    >
      {/* GLOBAL ARCHIVE TRACKER - SIDEBAR */}
      <div className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 h-64 w-px bg-white/10 z-[5000] flex flex-col items-center pointer-events-none hidden sm:flex">
         <motion.div 
           className="w-1 bg-gold shadow-[0_0_20px_#D4AF37] origin-top rounded-full"
           style={{ scaleY }}
         />
         <div className="absolute top-0 text-[8px] font-black uppercase tracking-[1em] text-gold/40 -rotate-90 origin-left -translate-y-12 whitespace-nowrap">Genesis</div>
         <div className="absolute bottom-0 text-[8px] font-black uppercase tracking-[1em] text-gold/40 -rotate-90 origin-left translate-y-12 whitespace-nowrap">Infinity</div>
      </div>

      {/* RENDER ALL 41 MEMORIES ONE BY ONE */}
      {MEMORIES.map((memory, index) => (
        <MemorySection key={memory.id} memory={memory} index={index} />
      ))}

      {/* FINAL SLIDE: THE ETERNAL PROMISE */}
      <section className="h-[100dvh] w-full snap-start snap-always flex flex-col items-center justify-center p-8 text-center bg-espresso relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent)] pointer-events-none" />
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="space-y-8 max-w-4xl relative z-10"
         >
            <div className="size-20 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
               <Star size={32} className="text-gold animate-spin-slow" />
            </div>
            <h2 className="text-6xl sm:text-[8vw] font-display italic font-black text-white tracking-tighter leading-none">
              Infinite <br/> <span className="text-gold">Sovereignty</span>
            </h2>
            <p className="text-xl sm:text-2xl font-elegant italic text-white/40 leading-relaxed px-6">
              "Every scroll is a witness to our grace. 41 memories archived, a lifetime of magic remains to be written."
            </p>
            <div className="pt-10 flex flex-col items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[1em] text-gold/40">Ma Q & Bura</span>
              <div className="flex gap-2">
                {[1,2,3].map(i => <Heart key={i} size={10} className="text-gold/20" fill="currentColor" />)}
              </div>
            </div>
         </motion.div>
      </section>
    </div>
  );
};

const MemorySection: React.FC<{ memory: Memory; index: number }> = ({ memory, index }) => {
  return (
    <section 
      className="w-full h-[100dvh] snap-start snap-always flex items-center justify-center relative overflow-hidden bg-espresso border-b border-white/[0.02]"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05] pointer-events-none" />
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center h-full py-12 px-6 sm:px-20 relative z-10">
        
        {/* 360-DEGREE ROTATING IMAGE PRISM */}
        <div className="relative group scene-3d preserve-3d h-full flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[400px] aspect-[3/4] preserve-3d"
          >
            <motion.div 
              animate={{ rotateY: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-[8px] border-white/10 preserve-3d bg-white/5 backdrop-blur-md relative"
            >
              <img 
                src={memory.image} 
                alt={memory.title} 
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518199266791-739d6ffc8ec6?auto=format&fit=crop&q=80&w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5 pointer-events-none" />
            </motion.div>

            {/* Floating Date Tag */}
            <div className="absolute -bottom-6 -right-6 bg-gold text-white px-6 py-2 rounded-full shadow-2xl border-2 border-white/10 z-20">
               <span className="text-[10px] font-black uppercase tracking-widest">{memory.date}</span>
            </div>
          </motion.div>

          {/* LARGE BACKGROUND NUMBER */}
          <div className="absolute -z-10 text-[35vw] font-display font-black italic text-white/[0.02] select-none pointer-events-none translate-x-[-10%]">
             {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </div>
        </div>

        {/* MEMORY CONTENT */}
        <div className="space-y-8 lg:pl-10 flex flex-col justify-center">
          <div className="space-y-4">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              className="h-0.5 bg-gold/50 shadow-[0_0_15px_#D4AF37]" 
            />
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-gold/80 block">Chapter {index + 1}</span>
            <h3 className="text-5xl sm:text-6xl md:text-[5vw] font-display font-black italic text-white leading-[0.9] tracking-tighter">
              {memory.title}
            </h3>
            <p className="text-lg sm:text-xl font-elegant italic text-white/40 leading-tight max-w-lg">
              {memory.description}
            </p>
          </div>

          <div className="space-y-8 pl-10 border-l border-gold/20 relative">
            <div className="absolute top-0 left-[-1px] h-full w-[2px] bg-gradient-to-b from-gold via-gold/5 to-transparent" />
            
            {memory.chatHistory?.map((chat, cIdx) => (
              <motion.div 
                key={cIdx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (cIdx * 0.15) }}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-2">
                   <div className={`size-1.5 rounded-full ${chat.sender.includes('Bura') ? 'bg-white shadow-[0_0_8px_white]' : 'bg-gold shadow-[0_0_8px_#D4AF37]'}`} />
                   <span className="text-[8px] font-black uppercase tracking-widest text-white/30">{chat.sender}</span>
                </div>
                <p className={`text-xl sm:text-3xl font-display italic leading-none tracking-tight ${chat.sender.includes('Bura') ? 'text-white/90' : 'text-gold'}`}>
                  "{chat.text}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* SCROLL HINT */}
          <motion.div 
            animate={{ y: [0, 10, 0], opacity: [0.3, 0.7, 0.3] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="pt-6 flex items-center gap-6"
          >
             <div className="size-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                <ChevronDown size={20} />
             </div>
             <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gold/60">Next Fragment</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/10">{index + 1} / {MEMORIES.length}</span>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StoryLine;
