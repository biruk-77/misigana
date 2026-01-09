
import React, { useState } from 'react';
import { Book, Anchor, Camera, Cloud, Gift, MapPin, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

const CAPSULE_ITEMS = [
  { id: 1, icon: <Book />, label: 'Proverbs 31:29', note: 'The verse that perfectly captures your soul. You surpass them all.' },
  { id: 2, icon: <Anchor />, label: 'The First Tie', note: 'Tying your laces wasn\'t a task; it was an honor. I am your gentleman forever.' },
  { id: 3, icon: <Camera />, label: 'The First Glimpse', note: 'Dec 05. The day the prayers became physical. My heart stopped.' },
  { id: 4, icon: <Cloud />, label: '5:59 AM Dreams', note: 'Our spiritual synchronicity. Praying for you is my favorite dialogue with God.' },
  { id: 5, icon: <Gift />, label: 'The Ultimate Win', note: 'I don\'t need to "make it" in life anymore. I already won when I found you.' },
  { id: 6, icon: <MapPin />, label: 'Safe Harbor', note: 'In every version of my future, your presence is the only destination.' },
];

const TimeCapsule: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="bg-text-main p-10 sm:p-20 rounded-[3rem] sm:rounded-[5rem] overflow-hidden relative border border-white/5">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.05] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="max-w-md space-y-6 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4">
             <Sparkles className="text-primary" size={20} />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Legacy Feature</span>
          </div>
          <h3 className="text-4xl sm:text-6xl font-display font-black italic text-white leading-tight tracking-tighter">
            Digital <br/> <span className="text-primary">Time Capsule</span>
          </h3>
          <p className="text-sm sm:text-lg font-display italic text-white/40 leading-relaxed">
            Click the fragments of our history to unlock the secrets held within each object. These are the stones we set to remember where we've been.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 perspective-1000">
          {CAPSULE_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="relative group cursor-pointer"
              onClick={() => setActiveId(activeId === item.id ? null : item.id)}
            >
              <TiltCard intensity={15}>
                <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-3xl transition-all duration-700 preserve-3d flex items-center justify-center border ${
                  activeId === item.id 
                  ? 'bg-primary border-primary rotate-y-180 scale-110 shadow-[0_0_50px_rgba(212,175,55,0.4)]' 
                  : 'bg-white/5 border-white/10 hover:border-primary/40'
                }`}>
                  <div className={`absolute transition-all duration-500 flex flex-col items-center gap-3 ${activeId === item.id ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="text-primary/60 group-hover:text-primary transition-colors transform group-hover:scale-125 duration-500">
                      {/* Fix: Explicitly cast to React.ReactElement<any> to resolve the type mismatch for 'size' in cloneElement */}
                      {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/60 transition-colors">
                      {item.label}
                    </span>
                  </div>

                  <div className={`absolute inset-0 p-4 flex items-center justify-center text-center rotate-y-180 transition-all duration-500 ${activeId === item.id ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-[9px] sm:text-[11px] font-display italic text-white leading-tight">
                      {item.note}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeCapsule;
