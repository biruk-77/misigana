
import React, { useState } from 'react';
import { Flower, Loader2, Sparkles, Heart } from 'lucide-react';
import { generateLoveNote } from '../services/geminiService';

const FLOWERS = [
  { id: 1, icon: '🌸', color: 'text-rose-400', prompt: 'Our first touch' },
  { id: 2, icon: '🌹', color: 'text-red-500', prompt: 'Our future home' },
  { id: 3, icon: '🌻', color: 'text-amber-400', prompt: 'Your beautiful smile' },
  { id: 4, icon: '🌷', color: 'text-pink-400', prompt: 'Our morning prayers' },
  { id: 5, icon: '🌺', color: 'text-fuchsia-400', prompt: 'Choosing us daily' },
  { id: 6, icon: '🌼', color: 'text-yellow-400', prompt: 'Growing old together' },
];

const GardenOfLove: React.FC = () => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [loading, setLoading] = useState<number | null>(null);

  const handlePick = async (flowerId: number, prompt: string) => {
    setLoading(flowerId);
    const note = await generateLoveNote(prompt);
    setActiveNote(note);
    setLoading(null);
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl p-8 sm:p-12 rounded-[3rem] luxury-shadow border border-primary/10 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-3xl font-display italic font-black text-text-main">Our Secret Garden</h3>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/40">Pick a blossom to find a message</p>
        </div>
        <div className="p-3 bg-primary/5 rounded-full border border-primary/10">
          <Flower className="text-primary" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 sm:gap-10">
        {FLOWERS.map((f) => (
          <button
            key={f.id}
            onClick={() => handlePick(f.id, f.prompt)}
            disabled={loading !== null}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-white/50 border border-transparent hover:border-primary/20 hover:bg-white transition-all transform hover:-translate-y-2 active:scale-95 group/flower relative ${loading === f.id ? 'animate-pulse' : ''}`}
          >
            <span className={`text-4xl sm:text-5xl mb-3 drop-shadow-sm ${loading === f.id ? 'opacity-20' : 'opacity-100'}`}>
              {f.icon}
            </span>
            {loading === f.id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 size={24} className="animate-spin text-primary" />
              </div>
            )}
            <div className="h-1 w-8 bg-primary/10 rounded-full group-hover/flower:w-12 group-hover/flower:bg-primary transition-all" />
          </button>
        ))}
      </div>

      {activeNote && (
        <div className="mt-12 p-8 bg-text-main rounded-[2rem] text-white animate-reveal-up relative">
            <div className="absolute -top-4 -right-4 bg-primary p-3 rounded-full shadow-xl">
                <Heart size={16} fill="white" className="text-white" />
            </div>
            <p className="font-display italic text-xl sm:text-2xl leading-relaxed">"{activeNote}"</p>
            <button 
              onClick={() => setActiveNote(null)}
              className="mt-6 text-[8px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-2"
            >
              <Sparkles size={10} /> Let it bloom again
            </button>
        </div>
      )}
    </div>
  );
};

export default GardenOfLove;
