
import React, { useState } from 'react';
import { MapPin, Navigation, Heart, Calendar, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

const MILESTONES = [
  { id: 1, title: "The First Prayer", desc: "Where the whispers began in the spirit.", date: "Pre-Dec 2025", icon: <Sparkles size={18} />, pos: { x: '10%', y: '20%' } },
  { id: 2, title: "The Dec 5th Intersection", desc: "When our physical worlds finally collided.", date: "Dec 05, 2025", icon: <MapPin size={18} />, pos: { x: '35%', y: '50%' } },
  { id: 3, title: "The Tie Ceremony", desc: "A gentleman's vow at your feet.", date: "Dec 24, 2025", icon: <Heart size={18} />, pos: { x: '60%', y: '30%' } },
  { id: 4, title: "The Forever Horizon", desc: "Our destination. Christ-centered and eternal.", date: "Infinity", icon: <Navigation size={18} />, pos: { x: '85%', y: '70%' } },
];

const EternalMap: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="py-24 space-y-16">
      <div className="text-center space-y-4">
        <span className="text-[10px] font-black uppercase tracking-[1em] text-primary/40">The Journey Coordinates</span>
        <h2 className="text-4xl sm:text-6xl font-display font-black italic text-text-main">Eternal <span className="text-primary">Navigation</span></h2>
      </div>

      <div className="relative h-[500px] w-full bg-white/40 rounded-[4rem] border border-primary/5 overflow-hidden preserve-3d">
        {/* Connection Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
          <path d="M 100 100 Q 300 400 500 150 T 900 350" fill="none" stroke="#d4af37" strokeWidth="2" strokeDasharray="10 10" className="animate-pulse" />
        </svg>

        {MILESTONES.map((m) => (
          <div 
            key={m.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
            style={{ left: m.pos.x, top: m.pos.y }}
          >
            <button
              onMouseEnter={() => setActive(m.id)}
              onMouseLeave={() => setActive(null)}
              className={`relative size-16 sm:size-20 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                active === m.id ? 'bg-primary border-primary scale-125 shadow-2xl' : 'bg-white border-primary/20 scale-100'
              }`}
            >
              <div className={`${active === m.id ? 'text-white' : 'text-primary'} transition-colors`}>
                {m.icon}
              </div>
              
              {/* Tooltip Card */}
              <div className={`absolute bottom-full mb-6 left-1/2 -translate-x-1/2 w-64 transition-all duration-500 pointer-events-none ${
                active === m.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
              }`}>
                <div className="bg-text-main p-6 rounded-[2rem] shadow-2xl text-center space-y-2 border border-primary/20">
                  <span className="text-[8px] font-black uppercase tracking-widest text-primary">{m.date}</span>
                  <h4 className="text-lg font-display font-black italic text-white">{m.title}</h4>
                  <p className="text-xs font-display italic text-white/40 leading-tight">{m.desc}</p>
                </div>
                <div className="w-px h-6 bg-primary mx-auto" />
              </div>
            </button>
          </div>
        ))}

        {/* Floating Background Accents */}
        <div className="absolute top-10 right-10 opacity-5 layer-back">
          <Navigation size={300} className="text-primary rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default EternalMap;
