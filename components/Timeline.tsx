
import React from 'react';
import { Calendar, Quote, Heart } from 'lucide-react';
import { MEMORIES } from '../constants';

const Timeline: React.FC = () => {
  return (
    <section className="space-y-16">
      <div className="text-center space-y-3">
        <span className="text-[#a8bfa1] font-bold text-[10px] uppercase tracking-[0.5em]">The Chronicles</span>
        <h2 className="text-4xl md:text-6xl font-serif italic">Beautiful Moments.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {MEMORIES.map((memory, index) => (
          <div 
            key={memory.id} 
            className="scrapbook-card group rounded-3xl overflow-hidden animate-soft-reveal flex flex-col"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="h-80 overflow-hidden relative p-4">
              <div className="w-full h-full overflow-hidden rounded-2xl relative">
                 <img 
                  src={memory.image} 
                  alt={memory.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-[#e8939c]/20 text-[10px] font-bold uppercase tracking-widest text-[#4a3f3f]">
                {memory.date}
              </div>
            </div>
            <div className="p-10 space-y-4 pt-4">
              <h3 className="text-3xl font-serif italic text-[#4a3f3f]">{memory.title}</h3>
              <p className="text-[#4a3f3f]/60 font-medium leading-relaxed text-sm">
                {memory.description}
              </p>
              <div className="pt-6 flex items-center gap-2 text-[#e8939c]">
                <Heart size={14} className="fill-current" />
                <div className="h-px w-8 bg-[#e8939c]/30"></div>
                <span className="text-[10px] uppercase tracking-widest font-bold">Unforgettable</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
