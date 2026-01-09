
import React, { useRef } from 'react';
import { MEMORIES } from '../constants';
import { Camera, Heart, Sparkles, Film, ArrowRight } from 'lucide-react';

const FilmStrip: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-32 overflow-hidden relative">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-0 w-full h-[300px] bg-rose-gold/5 -translate-y-1/2 -rotate-3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-16 flex items-end justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-rose-gold">
             <Film size={18} />
             <span className="text-[10px] font-sans font-bold uppercase tracking-[0.8em] text-espresso/40">The Cinematic Archive</span>
          </div>
          <h2 className="text-5xl sm:text-8xl font-display italic font-black text-espresso tracking-tighter">
            Our Infinite <br/> <span className="luxury-text-gradient">Love Strip</span>
          </h2>
        </div>
        
        <button 
          onClick={scrollRight}
          className="group flex flex-col items-center gap-4 transition-all hover:translate-x-2"
        >
          <div className="size-16 rounded-full border border-espresso/10 flex items-center justify-center group-hover:bg-espresso group-hover:text-white transition-all">
            <ArrowRight size={24} />
          </div>
          <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-espresso/30">Next Chapter</span>
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-10 px-6 sm:px-12 overflow-x-auto no-scrollbar snap-x snap-mandatory py-10 relative z-10"
      >
        {MEMORIES.map((memory, i) => (
          <div 
            key={memory.id} 
            className="flex-shrink-0 w-[320px] sm:w-[500px] group snap-center"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] sm:rounded-[5rem] bg-espresso/5 border border-white/20 luxury-shadow group-hover:scale-[1.03] transition-all duration-700">
              
              {/* Image with Filter Effect */}
              <img 
                src={memory.image} 
                alt={memory.title}
                className="w-full h-full object-cover grayscale-[20%] sepia-[15%] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-1000 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/10 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
              
              {/* Content Box */}
              <div className="absolute bottom-12 left-12 right-12 text-white space-y-3 translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                <div className="flex items-center gap-4 mb-2">
                   <div className="h-px w-12 bg-rose-gold/40" />
                   <span className="text-[9px] font-sans font-bold uppercase tracking-[0.4em] text-white/60">{memory.date}</span>
                </div>
                <h4 className="text-3xl sm:text-5xl font-display italic font-black leading-none tracking-tight">
                  {memory.title}
                </h4>
                <p className="text-sm font-display italic text-white/40 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                   {memory.description}
                </p>
                
                <div className="flex items-center gap-3 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-full">
                     <Heart size={14} fill="white" className="text-white" />
                  </div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-rose-gold">Memory Archived</span>
                </div>
              </div>

              {/* Film Strip Holes Decoration - Vertical */}
              <div className="absolute top-0 bottom-0 left-6 flex flex-col justify-around py-8 opacity-10 group-hover:opacity-30 transition-opacity">
                 {[...Array(12)].map((_, idx) => (
                    <div key={idx} className="w-3 h-5 bg-white rounded-sm border border-black/10" />
                 ))}
              </div>
              <div className="absolute top-0 bottom-0 right-6 flex flex-col justify-around py-8 opacity-10 group-hover:opacity-30 transition-opacity">
                 {[...Array(12)].map((_, idx) => (
                    <div key={idx} className="w-3 h-5 bg-white rounded-sm border border-black/10" />
                 ))}
              </div>
            </div>
          </div>
        ))}
        
        {/* End Cinematic Message */}
        <div className="flex-shrink-0 w-[320px] sm:w-[600px] flex items-center justify-center snap-center px-12">
           <div className="text-center space-y-8 animate-float-slow">
              <div className="size-24 rounded-full bg-rose-gold/10 border border-rose-gold/20 flex items-center justify-center mx-auto mb-10">
                 <Sparkles size={40} className="text-rose-gold" />
              </div>
              <h3 className="text-4xl sm:text-6xl font-display italic font-black text-espresso leading-tight">
                To Be <br/> Continued...
              </h3>
              <p className="text-lg font-display italic text-espresso/30 max-w-sm mx-auto">
                Every second with you is a new frame in the greatest movie ever lived.
              </p>
              <div className="pt-10">
                 <p className="text-[11px] font-sans font-bold uppercase tracking-[0.6em] text-rose-gold">Infinite Sequel Incoming</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FilmStrip;
