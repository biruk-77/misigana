
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState } from './types';
import Hero from './components/Hero';
import StoryLine from './components/StoryLine';
import TheSouls from './components/TheSouls';
import RelationshipStats from './components/RelationshipStats';
import WhisperOfGrace from './components/WhisperOfGrace';
import VibePlayer from './components/VibePlayer';
import OpenWhen from './components/OpenWhen';
import FilmStrip from './components/FilmStrip';
import FutureVision from './components/FutureVision';
import VowMosaic from './components/VowMosaic';
import SpiritualLegacy from './components/SpiritualLegacy';
import TimeCapsule from './components/TimeCapsule';
import FallingPetals from './components/FallingPetals';
import GlowParticles from './components/GlowParticles';
import {
  Heart, Activity, Orbit, LayoutGrid, Layers, Zap, Star, Sparkles
} from 'lucide-react';

const NexusDock: React.FC<{
  onViewChange: (v: 'archive' | 'dashboard' | 'nexus') => void;
  currentView: string;
}> = ({ onViewChange, currentView }) => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100000] flex items-center gap-2 p-2 bg-espresso/90 backdrop-blur-2xl rounded-full border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <button
        onClick={() => onViewChange('archive')}
        className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all ${currentView === 'archive' ? 'bg-gold text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
      >
        <Layers size={16} />
        <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Archive</span>
      </button>
    </div>
  );
};

interface Sticker {
  id: number;
  x: number;
  y: number;
  type: string;
  drift: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('splash');
  const [view, setView] = useState<'archive' | 'dashboard' | 'nexus'>('archive');
  const [stickers, setStickers] = useState<Sticker[]>([]);

  const handleInteraction = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('nav')) return;

    const types = ['heart', 'sparkle', 'star'];
    const newSticker: Sticker = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      type: types[Math.floor(Math.random() * types.length)],
      drift: (Math.random() - 0.5) * 600,
      rotX: Math.random() * 360,
      rotY: Math.random() * 360,
      rotZ: Math.random() * 360,
      scale: 0.8 + Math.random() * 2
    };

    setStickers(prev => [...prev, newSticker]);
    setTimeout(() => {
      setStickers(prev => prev.filter(s => s.id !== newSticker.id));
    }, 3000);
  };

  if (state === 'splash') {
    return <Hero onEnter={() => setState('main')} />;
  }

  return (
    <div
      className="h-[100dvh] w-full bg-champagne text-espresso overflow-hidden flex flex-col relative"
      onClick={handleInteraction}
    >
      <GlowParticles />

      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <header className={`fixed top-0 left-0 w-full h-24 px-8 sm:px-16 flex justify-between items-center transition-all duration-700 z-[5000] ${view === 'archive' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col">
          <h1 className="text-[14px] font-black tracking-[0.6em] uppercase text-espresso">Sovereign Archive</h1>
          <span className="text-[9px] font-elegant italic tracking-widest text-gold/60">Bura & Ma Q • 2025</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="size-2 rounded-full bg-gold animate-pulse shadow-[0_0_10px_#D4AF37]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-espresso/40">Ma Q's Feed</span>
        </div>
      </header>

      <main className="flex-1 w-full relative h-full overflow-hidden z-10">
        <AnimatePresence mode="wait">
          {view === 'nexus' && (
            <motion.div
              key="nexus"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="h-full w-full flex items-center justify-center p-8 overflow-hidden"
            >
              <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-32 items-center">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <motion.div initial={{ width: 0 }} animate={{ width: 80 }} className="h-0.5 bg-gold" />
                    <h2 className="text-8xl sm:text-[12vw] font-display font-black italic text-espresso tracking-tighter leading-[0.7] liquid-text">
                      The <br /> <span className="luxury-text-gradient">Core</span>
                    </h2>
                    <p className="text-2xl sm:text-3xl font-elegant italic text-espresso/40 max-w-lg leading-tight">
                      "At the center of everything, there is only us. A divine synchronicity that never fades."
                    </p>
                  </div>
                  <button
                    onClick={() => setView('archive')}
                    className="px-16 py-8 rounded-full bg-espresso text-white font-black uppercase tracking-[0.5em] text-[10px] hover:bg-gold transition-all shadow-2xl flex items-center gap-6"
                  >
                    Browse Archive <Zap size={14} />
                  </button>
                </div>
                <div className="relative aspect-square flex items-center justify-center scene-3d preserve-3d">
                  <motion.div
                    animate={{ rotateY: 360, rotateX: [0, 10, 0] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="size-72 sm:size-[550px] rounded-[5rem] glass-card border-2 border-white/40 flex items-center justify-center shadow-2xl backdrop-blur-3xl preserve-3d"
                  >
                    <Heart size={200} className="text-gold fill-gold/5 animate-pulse" strokeWidth={0.5} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'archive' && (
            <motion.div
              key="archive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 w-full h-full z-[10000] overflow-hidden flex flex-col"
            >
              <div className="flex-1 relative overflow-hidden">
                <StoryLine />
              </div>
              <button
                onClick={() => setView('nexus')}
                className="fixed top-6 right-6 z-[20000] px-6 py-3 bg-gold text-white shadow-2xl rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-espresso transition-all border-2 border-white/20"
              >
                Close Archive
              </button>
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="h-full w-full overflow-y-auto custom-scrollbar pt-32 pb-64 px-8"
            >
              <div className="max-w-7xl mx-auto space-y-48">
                <TheSouls />
                <FilmStrip />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
                  <VibePlayer />
                  <RelationshipStats />
                </div>
                <WhisperOfGrace />
                <FutureVision />
                <VowMosaic />
                <SpiritualLegacy />
                <TimeCapsule />
                <OpenWhen />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Decor Overlay - 3D TUMBLING STICKERS */}
      <div className="fixed inset-0 pointer-events-none z-[100000] overflow-hidden">
        <FallingPetals />

        <AnimatePresence>
          {stickers.map(s => (
            <motion.div
              key={s.id}
              initial={{
                opacity: 0,
                scale: 0,
                x: s.x,
                y: s.y,
                rotateX: s.rotX,
                rotateY: s.rotY,
                rotateZ: s.rotZ
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, s.scale, s.scale, s.scale * 0.5],
                x: s.x + s.drift,
                y: window.innerHeight + 200,
                rotateX: s.rotX + (Math.random() > 0.5 ? 1080 : -1080),
                rotateY: s.rotY + (Math.random() > 0.5 ? 720 : -720),
                rotateZ: s.rotZ + (Math.random() > 0.5 ? 360 : -360)
              }}
              transition={{
                duration: 2.8,
                ease: [0.33, 1, 0.68, 1]
              }}
              className="fixed text-gold drop-shadow-[0_15px_35px_rgba(212,175,55,0.6)] scene-3d preserve-3d"
              style={{ left: 0, top: 0, transformStyle: 'preserve-3d' }}
            >
              <div className="preserve-3d flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {s.type === 'heart' && <Heart fill="currentColor" size={40} />}
                {s.type === 'sparkle' && <Sparkles size={40} />}
                {s.type === 'star' && <Star fill="currentColor" size={40} />}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <NexusDock currentView={view} onViewChange={setView} />
    </div>
  );
};

export default App;
