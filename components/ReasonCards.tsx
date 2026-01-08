
import React, { useState } from 'react';
import { Heart, RefreshCw, Quote } from 'lucide-react';
import { INITIAL_REASONS } from '../constants';
import { generateLoveReason } from '../services/geminiService';
import TiltCard from './TiltCard';

const ReasonCards: React.FC = () => {
  const [currentReason, setCurrentReason] = useState(INITIAL_REASONS[0].text);
  const [loading, setLoading] = useState(false);

  const getNextReason = async () => {
    setLoading(true);
    const newReason = await generateLoveReason();
    setCurrentReason(newReason);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto text-center py-52 px-6 reveal">
      <div className="inline-flex flex-col items-center gap-6 mb-20">
        <span className="text-rose-300 uppercase tracking-[0.4em] text-[10px] font-serif-premium">Infinite Reasons</span>
        <h2 className="font-serif-premium text-5xl text-rose-950 italic">Why My Soul Chose Yours</h2>
        <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-rose-100"></div>
            <Heart className="fill-rose-400 text-rose-400 w-3 h-3" />
            <div className="h-[1px] w-12 bg-rose-100"></div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <TiltCard>
          <div className="glass-premium p-16 md:p-28 rounded-[4rem] relative overflow-hidden group">
            <Quote className="absolute top-12 left-12 w-20 h-20 text-rose-100/40 -rotate-12" />
            <div className="relative z-10 space-y-12">
              <p className={`text-rose-950 text-3xl md:text-5xl font-serif-premium italic leading-relaxed transition-all duration-1000 ${loading ? 'opacity-0 blur-lg scale-95' : 'opacity-100 blur-0 scale-100'}`}>
                {currentReason}
              </p>
              <div className="w-12 h-1 bg-rose-100 mx-auto rounded-full"></div>
            </div>
            
            {/* Background elements */}
            <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-rose-100/20 rounded-full blur-[80px]" />
          </div>
        </TiltCard>
      </div>
      
      <button
        onClick={getNextReason}
        disabled={loading}
        className="mt-20 group flex flex-col items-center gap-6 mx-auto outline-none"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-rose-200 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
          <div className="relative p-6 bg-white rounded-full shadow-2xl border border-rose-50 group-hover:scale-110 group-active:scale-95 transition-all duration-500">
            <RefreshCw className={`w-6 h-6 text-rose-400 ${loading ? 'animate-spin' : ''}`} />
          </div>
        </div>
        <span className="font-serif-premium text-rose-300 tracking-[0.3em] text-[10px] uppercase">A new whisper from my heart</span>
      </button>
    </div>
  );
};

export default ReasonCards;
