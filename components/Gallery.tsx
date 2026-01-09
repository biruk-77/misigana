
import React from 'react';
import { Camera, Heart, Sparkles, Image as ImageIcon } from 'lucide-react';

const Gallery: React.FC = () => {
  return (
    <div className="py-20 relative">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-rose-gold/20 blur-2xl rounded-full scale-150 animate-pulse" />
          <div className="relative p-6 bg-white rounded-full border border-rose-gold/20 shadow-xl">
            <ImageIcon size={32} className="text-rose-gold" />
          </div>
        </div>
        <div className="space-y-2">
           <h3 className="text-3xl font-display italic font-black text-espresso">The Visual Soul</h3>
           <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-espresso/40 italic">Captured Fragments of Grace</p>
        </div>
        <div className="flex gap-4">
           {[1,2,3].map(i => <Heart key={i} size={10} className="text-rose-gold/30" fill="currentColor" />)}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
