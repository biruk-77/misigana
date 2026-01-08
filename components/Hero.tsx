
import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface HeroProps {
  onEnter: () => void;
}

const Hero: React.FC<HeroProps> = ({ onEnter }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative z-20 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div 
        className="absolute w-[800px] h-[800px] bg-rose-200/20 rounded-full blur-[160px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      />
      
      <div className="relative z-30 space-y-12 max-w-5xl">
        <div className="flex flex-col items-center reveal active" style={{ transitionDelay: '0.2s' }}>
          <div className="mb-10 p-6 glass-premium rounded-full animate-float-slow">
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500/10 stroke-[1.5px]" />
          </div>
          <p className="font-serif-premium italic text-rose-400 tracking-[0.6em] uppercase text-[10px] mb-4">
            A Digital Covenant
          </p>
        </div>
        
        <h1 className="font-serif-premium text-7xl md:text-[9rem] text-rose-950 leading-[0.9] reveal active" style={{ transitionDelay: '0.5s' }}>
          Misgana, <br />
          <span className="font-romantic text-rose-600 block mt-8 drop-shadow-sm">Yemiwedish.</span>
        </h1>

        <div className="h-px w-32 bg-gradient-to-r from-transparent via-rose-200 to-transparent mx-auto my-16 reveal active" style={{ transitionDelay: '0.8s' }} />

        <p className="font-serif-premium text-2xl md:text-3xl text-rose-800/50 italic max-w-3xl mx-auto leading-relaxed reveal active" style={{ transitionDelay: '1.1s' }}>
          "In a world of noise, you are my favorite silence. Built by hand, lead by faith, for my only Queen."
        </p>

        <div className="pt-16 reveal active" style={{ transitionDelay: '1.4s' }}>
          <button
            onClick={onEnter}
            className="group relative px-16 py-6 bg-rose-950 text-white rounded-full font-serif-premium italic text-xl shadow-[0_30px_60px_-15px_rgba(44,24,16,0.3)] hover:shadow-[0_40px_80px_-15px_rgba(44,24,16,0.4)] transition-all duration-700 hover:-translate-y-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              Enter My Heart
              <Sparkles className="w-5 h-5 text-rose-300 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-900 to-rose-950 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shine-effect" />
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-0 right-0 text-center reveal active" style={{ transitionDelay: '1.8s' }}>
        <p className="font-serif-premium text-[10px] tracking-[0.4em] text-rose-900/30 uppercase">
          Private Collection &bull; The Gentleman Biruk &bull; Forever
        </p>
      </div>
    </div>
  );
};

export default Hero;
