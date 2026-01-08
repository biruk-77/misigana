
import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import FloatingHearts from './components/FloatingHearts';
import FallingPetals from './components/FallingPetals';
import GlowParticles from './components/GlowParticles';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import PoemGenerator from './components/PoemGenerator';
import ReasonCards from './components/ReasonCards';
import { Heart, Volume2, VolumeX, ArrowUp } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('splash');
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnter = () => {
    setState('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative selection:bg-rose-200 selection:text-rose-950">
      <GlowParticles />
      <FloatingHearts />
      {state === 'main' && <FallingPetals />}

      {/* Floating Utilities */}
      <div className="fixed bottom-12 right-12 z-[100] flex flex-col gap-4">
        {scrolled && (
            <button 
                onClick={scrollToTop}
                className="p-5 glass-premium rounded-full hover:scale-110 transition-all duration-500 text-rose-500 shadow-xl reveal active"
            >
                <ArrowUp size={20} />
            </button>
        )}
        <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-5 glass-premium rounded-full hover:scale-110 transition-all duration-500 text-rose-400 shadow-xl"
        >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="animate-pulse" />}
        </button>
      </div>

      {state === 'splash' ? (
        <Hero onEnter={handleEnter} />
      ) : (
        <main className="relative z-10 animate-[fadeIn_3s_cubic-bezier(0.22,1,0.36,1)] overflow-hidden">
          {/* Elite Navigation Bar */}
          <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-[1.2s] px-12 py-10 ${scrolled ? 'bg-white/10 backdrop-blur-3xl py-6 translate-y-0' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="font-serif-premium italic text-3xl text-rose-950/80 flex items-center gap-4 group">
                <Heart className="w-6 h-6 fill-rose-500 text-rose-500 group-hover:scale-125 transition-transform duration-700" />
                <span className="tracking-[0.4em] uppercase text-[10px] font-bold opacity-60">Biruk & Misgana</span>
              </div>
              <button 
                onClick={() => setState('splash')}
                className="text-rose-400 hover:text-rose-950 transition-colors font-serif-premium italic text-sm tracking-[0.3em] uppercase"
              >
                Back to Entrance
              </button>
            </div>
          </header>

          <div className="pt-60">
            {/* Elite Intro */}
            <div className="max-w-5xl mx-auto px-12 text-center mb-60 reveal">
              <span className="font-serif-premium text-rose-300 uppercase tracking-[0.6em] text-[10px] block mb-12">The Gentleman's Confession</span>
              <h1 className="font-serif-premium text-7xl md:text-[10rem] text-rose-950 mb-16 italic leading-none">My peace in <br /> every storm.</h1>
              <div className="w-px h-32 bg-gradient-to-b from-rose-200 to-transparent mx-auto mb-16" />
              <p className="font-serif-premium text-3xl text-rose-900/30 leading-relaxed italic max-w-3xl mx-auto">
                "Misgana, they say a soulmate is an answer to a prayer you didn't know you were saying. Every detail here is a tribute to our God-given path."
              </p>
            </div>

            <Timeline />
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-50/20 to-transparent pointer-events-none" />
              <PoemGenerator />
              <ReasonCards />
            </div>

            {/* Cinematic Finale */}
            <footer className="py-60 text-center px-12 bg-rose-950 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[50rem] h-[50rem] bg-rose-400 rounded-full blur-[200px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[50rem] h-[50rem] bg-rose-600 rounded-full blur-[200px]" />
              </div>
              
              <div className="max-w-4xl mx-auto relative z-10 space-y-20">
                <div className="p-8 glass-premium inline-block rounded-full animate-float-slow">
                    <Heart className="w-16 h-16 text-rose-400 fill-rose-400/20 stroke-[1px]" />
                </div>
                
                <div className="space-y-8">
                    <h2 className="font-serif-premium text-7xl md:text-[9rem] italic leading-tight">Always Your <br /> Gentleman.</h2>
                    <div className="h-px w-32 bg-rose-800 mx-auto" />
                </div>

                <p className="font-serif-premium text-3xl md:text-4xl italic opacity-60 leading-relaxed max-w-2xl mx-auto">
                  "In every prayer, in every breath, <br /> and in every version of eternity... <br /> I will find you."
                </p>
                
                <div className="pt-40 space-y-4">
                    <div className="font-serif-premium italic tracking-[0.6em] text-[10px] uppercase text-rose-400/60">
                        Misgana & Biruk &bull; A Digital Covenant
                    </div>
                    <div className="font-serif-premium italic text-[12px] text-rose-400/30">
                        Est. November 22, 2024
                    </div>
                </div>
              </div>
            </footer>
          </div>
        </main>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; filter: blur(30px); transform: scale(1.05); }
          to { opacity: 1; filter: blur(0); transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default App;
