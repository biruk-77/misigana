
import React from 'react';
import { Heart, ShieldCheck, Crown, Star, Sparkles, Anchor, Cross } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const ProfileCard = ({ name, role, description, icon: Icon, color, subRole, alignment = "left" }) => (
  <div className={`flex flex-col ${alignment === "right" ? "items-end text-right" : "items-start text-left"} space-y-8 preserve-3d group w-full lg:w-auto`}>
    <div className="relative">
      {/* Ornate Background Halo */}
      <div className={`absolute -inset-20 opacity-[0.03] animate-pulse-gentle pointer-events-none ${alignment === 'left' ? 'text-espresso' : 'text-gold'}`}>
        <Sparkles size={400} />
      </div>
      
      <TiltCard intensity={12}>
        <div className="relative w-full sm:w-[450px] min-h-[550px] bg-white rounded-[4rem] shadow-[0_60px_100px_rgba(0,0,0,0.08)] border border-gold/10 overflow-hidden preserve-3d p-12 sm:p-20 flex flex-col items-center justify-center space-y-10">
          
          {/* Top Decorative Line */}
          <div className="w-16 h-px bg-gold/20" />

          {/* Icon Badge */}
          <div className={`relative p-8 rounded-full ${alignment === "left" ? "bg-espresso text-white" : "bg-gold text-white"} shadow-[0_20px_40px_rgba(0,0,0,0.2)]`}>
            <Icon size={48} strokeWidth={1} />
            <div className="absolute inset-0 rounded-full border border-white/20 scale-110" />
          </div>
          
          <div className="space-y-4 text-center">
            <h4 className="text-[10px] font-black uppercase tracking-[0.8em] text-gold/60">{subRole}</h4>
            <h3 className="text-5xl sm:text-7xl font-display italic font-black text-espresso leading-none">{name}</h3>
          </div>
          
          <div className="w-24 h-px bg-gold/10" />
          
          <p className="text-xl sm:text-2xl font-elegant italic text-espresso/40 leading-relaxed text-center max-w-xs">
            "{description}"
          </p>

          {/* Luxury Badge Tag */}
          <div className={`absolute bottom-10 ${alignment === "left" ? "right-10" : "left-10"}`}>
             <div className="bg-champagne px-6 py-3 rounded-full border border-gold/10 flex items-center gap-3 shadow-lg group-hover:scale-110 transition-transform">
                <Star size={12} className="text-gold" fill="currentColor" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-espresso/60">{role}</span>
             </div>
          </div>
        </div>
      </TiltCard>
    </div>
  </div>
);

const TheSouls: React.FC = () => {
  return (
    <div className="w-full py-32 px-6 sm:px-12 preserve-3d relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
         <h1 className="text-[25vw] font-display font-black italic text-espresso">Devotion</h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-32 relative z-10">
        
        {/* Biruk Section */}
        <ProfileCard 
          name="Biruk"
          role="The Gentleman"
          subRole="The Protector"
          description="A soul anchored in the silence of dawn, finding strength in a whisper and home in your name."
          icon={Anchor}
          color="text-espresso"
          alignment="left"
        />

        {/* The Connection Altar */}
        <div className="hidden lg:flex flex-col items-center gap-12">
          <motion.div 
            animate={{ height: [40, 120, 40] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" 
          />
          <div className="relative group">
            <div className="absolute inset-0 bg-gold/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="size-24 rounded-full border border-gold/20 bg-white flex items-center justify-center relative shadow-2xl">
              <Heart size={32} className="text-gold fill-gold/5 group-hover:scale-125 transition-transform" />
            </div>
            <div className="absolute -top-4 -right-4 bg-gold text-white p-2 rounded-full shadow-lg border-2 border-white">
               <Cross size={12} />
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[1em] text-gold/30 rotate-90 whitespace-nowrap">Unified Grace</p>
          <motion.div 
            animate={{ height: [40, 120, 40] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-px bg-gradient-to-t from-transparent via-gold/40 to-transparent" 
          />
        </div>

        {/* Misgana Section */}
        <ProfileCard 
          name="Misgana"
          role="The Queen"
          subRole="The Miracle"
          description="The masterpiece of Proverbs 31, whose grace is the heartbeat of this entire digital sanctuary."
          icon={Crown}
          color="text-gold"
          alignment="right"
        />
        
      </div>
    </div>
  );
};

export default TheSouls;
