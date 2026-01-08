
import React from 'react';
import { Heart, Camera, Calendar } from 'lucide-react';
import { MEMORIES } from '../constants';
import TiltCard from './TiltCard';

const Timeline: React.FC = () => {
  return (
    <section className="py-40 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32 reveal">
          <span className="font-serif-premium tracking-[0.5em] text-rose-400 uppercase text-xs">The Chronicles of Us</span>
          <h2 className="font-serif-premium text-6xl md:text-8xl text-rose-950 italic mt-6 leading-tight">
            Our Shared <br /> <span className="text-rose-600">Sanctuary</span>
          </h2>
          <div className="w-16 h-[1px] bg-rose-200 mx-auto mt-12"></div>
        </div>
        
        <div className="space-y-64">
          {MEMORIES.map((memory, index) => (
            <div 
              key={memory.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 md:gap-24 items-center reveal`}
            >
              <div className="w-full md:w-3/5">
                <TiltCard className="w-full">
                  <div className="relative p-6 bg-white shadow-[0_40px_100px_-20px_rgba(44,24,16,0.12)] rounded-lg group">
                    <div className="overflow-hidden rounded-md relative aspect-[4/3]">
                      <img 
                        src={memory.image} 
                        alt={memory.title} 
                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                    <div className="mt-8 flex justify-between items-center px-2">
                      <div className="font-romantic text-4xl text-rose-800 opacity-70">
                        {memory.date}
                      </div>
                      <Camera className="w-5 h-5 text-rose-200" />
                    </div>
                    {/* Shadow depth effect */}
                    <div className="absolute -z-10 -inset-4 bg-rose-50/50 rounded-xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </TiltCard>
              </div>

              <div className="w-full md:w-2/5 space-y-8 text-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-rose-300 font-serif-premium tracking-widest text-xs uppercase">
                    <span className="w-8 h-px bg-rose-200"></span>
                    Chapter {index + 1}
                  </div>
                  <h3 className="font-serif-premium text-4xl md:text-5xl text-rose-950 leading-tight italic">
                    {memory.title}
                  </h3>
                </div>
                
                <p className="text-rose-900/60 font-serif-premium text-2xl leading-relaxed italic border-l-2 border-rose-100 pl-8">
                  "{memory.description}"
                </p>
                
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-12 rounded-full border border-rose-100 flex items-center justify-center text-rose-300">
                    <Heart className="w-4 h-4 fill-rose-100" />
                  </div>
                  <div className="font-serif-premium text-rose-950/40 text-sm tracking-widest uppercase italic">
                    Forever & Ever
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
