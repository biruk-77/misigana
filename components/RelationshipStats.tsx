
import React, { useEffect, useState } from 'react';
// Fix: Added missing 'Layers' import from lucide-react to resolve the reference error on line 79.
import { Heart, Calendar, Hourglass, Infinity as InfinityIcon, Zap, Shield, Sparkles, Star, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="relative group p-10 rounded-[3.5rem] bg-white border border-gold/10 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700"
  >
    <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-150 transition-transform duration-[3s] text-gold">
       <Icon size={200} />
    </div>
    
    <div className="relative z-10 space-y-8">
      <div className="size-16 rounded-[1.5rem] bg-gold/5 border border-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
        <Icon size={24} />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-gold/60">{label}</h4>
        <div className="flex items-baseline gap-3">
          <span className="text-5xl font-display font-black italic text-espresso">{value}</span>
          <div className="flex gap-1">
             {[1,2,3].map(i => <div key={i} className="size-1 rounded-full bg-gold/20" />)}
          </div>
        </div>
      </div>

      <div className="pt-4 flex items-center gap-4 border-t border-gold/5">
         <span className="text-[8px] font-black uppercase tracking-widest text-espresso/20">Metric Synchronized</span>
         <Zap size={10} className="text-gold/20" />
      </div>
    </div>
  </motion.div>
);

const RelationshipStats: React.FC = () => {
  const [days, setDays] = useState(0);
  const startDate = new Date('2025-12-05');

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    const target = calculateDays();
    let count = 0;
    const interval = setInterval(() => {
      if (count >= target) {
        setDays(target);
        clearInterval(interval);
      } else {
        count += Math.ceil((target - count) / 10) + 1;
        if (count > target) count = target;
        setDays(count);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-16">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="flex items-center gap-6">
           <Star size={14} className="text-gold" />
           <span className="text-[10px] font-black uppercase tracking-[0.8em] text-espresso/40 italic">Neural Devotion Metrics</span>
           <Star size={14} className="text-gold" />
        </div>
        <h3 className="text-4xl sm:text-7xl font-display font-black italic tracking-tighter">The Sovereign <span className="luxury-text-gradient">Ledger</span></h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="Eternal Days" value={days} icon={Calendar} delay={0.1} />
        <StatCard label="Memory Layers" value="128+" icon={Layers} delay={0.2} />
        <StatCard label="Prayer Cycles" value="∞" icon={Sparkles} delay={0.3} />
        <StatCard label="Soul Alignment" value="100%" icon={Shield} delay={0.4} />
      </div>

      {/* Advanced "Synapse" Visualization Placeholder */}
      <div className="w-full h-32 bg-gold/[0.03] rounded-[3rem] border border-gold/5 flex items-center justify-center relative overflow-hidden group">
         <div className="absolute inset-0 flex items-center justify-around opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ height: [20, 60, 20], opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                className="w-px bg-gold"
              />
            ))}
         </div>
         <span className="text-[10px] font-black uppercase tracking-[1em] text-gold animate-pulse">Neural Path Active</span>
      </div>
    </div>
  );
};

export default RelationshipStats;
