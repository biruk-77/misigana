
import React, { useMemo, useState } from 'react';
import { Sparkles, Star, Heart } from 'lucide-react';
import TiltCard from './TiltCard';

const SOUL_TRAITS = [
  { id: 1, trait: "Resilient Grace", note: "The way you bloom even in the coldest seasons of life." },
  { id: 2, trait: "Gentle Strength", note: "Your soft words carry more power than any shout." },
  { id: 3, trait: "God's Masterpiece", note: "Every detail of your soul was painted with divine intent." },
  { id: 4, trait: "Anchored Faith", note: "You are the root that keeps our future steady." },
  { id: 5, trait: "Infinite Kindness", note: "A heart that sees beauty in everyone, including me." },
  { id: 6, trait: "Ma Queen", note: "The one and only who wears the crown of my heart." },
];

const Constellation: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const stars = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 2 + Math.random() * 6,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="py-20 relative overflow-hidden bg-background-light rounded-[4rem] border border-primary/10">
      {/* Background Stars */}
      <div className="absolute inset-0 z-0">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-primary/20 animate-pulse"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="text-primary/40" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[1em] text-text-main/30">The Soul Map</span>
            <Sparkles className="text-primary/40" size={16} />
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-black italic text-text-main">
            Constellation <span className="text-primary">of Ma Q</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {SOUL_TRAITS.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <TiltCard intensity={10}>
                <div 
                  onClick={() => setSelected(selected === item.id ? null : item.id)}
                  className={`p-10 rounded-[3rem] transition-all duration-700 h-full flex flex-col items-center justify-center text-center space-y-6 border ${
                    selected === item.id 
                    ? 'bg-text-main text-white border-text-main shadow-2xl scale-105' 
                    : 'bg-white border-primary/5 hover:border-primary/20 hover:shadow-xl'
                  }`}
                >
                  <div className={`p-4 rounded-2xl transition-colors ${selected === item.id ? 'bg-primary/20 text-primary' : 'bg-primary/5 text-primary/40 group-hover:text-primary'}`}>
                    <Star size={24} fill={selected === item.id ? "currentColor" : "none"} />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className={`text-xl font-display font-black italic ${selected === item.id ? 'text-white' : 'text-text-main'}`}>
                      {item.trait}
                    </h4>
                    {selected === item.id && (
                      <p className="text-xs font-display italic text-white/60 animate-reveal-up">
                        {item.note}
                      </p>
                    )}
                  </div>

                  {selected !== item.id && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Heart size={8} fill="currentColor" className="text-primary" />
                       <span className="text-[8px] font-black uppercase tracking-widest text-primary">Explore Soul</span>
                    </div>
                  )}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Constellation;
