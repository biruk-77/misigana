
import React from 'react';
import { Shield, Sparkles, Heart, Anchor, Sun, Moon } from 'lucide-react';
import TiltCard from './TiltCard';

const VOWS = [
  { icon: <Shield size={16} />, text: "I will be your silent shield in every storm." },
  { icon: <Anchor size={16} />, text: "I will keep our home anchored in His grace." },
  { icon: <Sun size={16} />, text: "I will choose effort over my own ego, every sunrise." },
  { icon: <Moon size={16} />, text: "I will pray for you at 5:59 AM until my last breath." },
  { icon: <Heart size={16} />, text: "I will treat you as the Queen you were born to be." },
  { icon: <Sparkles size={16} />, text: "I will never let the magic of 'us' fade into the mundane." },
];

const VowMosaic: React.FC = () => {
  return (
    <div className="py-10">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1 bg-primary/20" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.8em] text-primary/60">The Sacred Mosaic</h3>
        <div className="h-px flex-1 bg-primary/20" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VOWS.map((vow, i) => (
          <TiltCard key={i} intensity={5}>
            <div className="p-8 rounded-[2.5rem] bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group h-full flex flex-col justify-between">
              <div className="p-3 bg-primary/5 rounded-2xl w-fit text-primary mb-6 group-hover:scale-110 transition-transform">
                {vow.icon}
              </div>
              <p className="font-display italic text-xl sm:text-2xl text-text-main leading-tight">
                "{vow.text}"
              </p>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
};

export default VowMosaic;
