
import React, { useState } from 'react';
import { MailOpen, Heart, Sparkles, X, Send } from 'lucide-react';

const LETTERS = [
  { 
    id: 1, 
    title: "Open when you miss me", 
    content: "My Love, I'm always just a heartbeat away. Close your eyes, breathe in, and remember Dec 5th—the day my prayers took physical form. I am right there with you, holding your hand forever, shielding you with my devotion. You are never alone.",
    tag: "Eternal Presence"
  },
  { 
    id: 2, 
    title: "Open when you feel tired", 
    content: "Misgana, you are the strongest woman I know, a true Proverbs 31 masterpiece. But even a Queen needs a sanctuary. Lean on me. Let my love be the pillow for your soul. You are doing amazing, and I am so proud of your strength. Rest now, my love.",
    tag: "Divine Sanctuary"
  },
  { 
    id: 3, 
    title: "Open when you need a smile", 
    content: "Remember the way I tied your laces? I'd do it a thousand times just to see that Monaliza smile—it's the only art I need. You are the miracle I didn't know I could ask for, the grace that fixed my broken rhythm. Smile for me, my Queen.",
    tag: "Pure Joy"
  },
];

const OpenWhen: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <div className="flex items-center justify-center gap-4 text-rose-gold">
          <Heart size={16} fill="currentColor" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.6em] text-espresso/40">Sacred Correspondence</span>
          <Heart size={16} fill="currentColor" />
        </div>
        <h2 className="text-4xl sm:text-7xl font-display italic font-black text-espresso tracking-tight">
          Open When...
        </h2>
        <p className="font-display italic text-espresso/40 text-lg">Letters written in the ink of my soul for your eyes only.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-20">
        {LETTERS.map((letter) => (
          <div key={letter.id} className="flex flex-col items-center">
            <div 
              onClick={() => setOpenId(letter.id)}
              className="envelope-wrapper group cursor-pointer transition-all duration-500 hover:scale-105"
            >
              <div className={`envelope ${openId === letter.id ? 'open' : ''} glass-card !bg-[#f3ebd3] rounded-sm relative shadow-2xl`}>
                <div className="envelope-flap"></div>
                
                {/* Visual Seal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                   <div className="size-12 rounded-full bg-rose-gold border-4 border-white shadow-lg flex items-center justify-center text-white rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <Heart size={20} fill="currentColor" />
                   </div>
                </div>

                <div className="letter font-handwritten text-espresso text-xl leading-relaxed overflow-hidden p-8">
                   <div className="border-b border-espresso/10 pb-4 mb-4">
                      <p className="text-xs uppercase tracking-widest font-sans font-bold opacity-30">To: My Queen</p>
                   </div>
                   {letter.content}
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-end z-10 pb-6 pointer-events-none">
                  <div className="text-center px-6">
                    <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-espresso/40 mb-1">
                      {letter.tag}
                    </p>
                    <p className="text-sm font-display italic font-black text-espresso">
                      {letter.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-espresso/40 backdrop-blur-xl animate-reveal-up">
          <div className="max-w-2xl w-full glass-card p-12 sm:p-20 relative rounded-[3rem] text-center space-y-8 shadow-[0_50px_100px_rgba(0,0,0,0.3)]">
            <button 
              onClick={() => setOpenId(null)}
              className="absolute top-8 right-8 text-espresso/40 hover:text-espresso transition-colors p-2"
            >
              <X size={32} strokeWidth={1} />
            </button>
            
            <div className="flex justify-center mb-4">
               <div className="p-6 bg-rose-gold/10 rounded-full border border-rose-gold/20">
                  <MailOpen size={48} className="text-rose-gold" strokeWidth={1} />
               </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.6em] text-rose-gold">A Private Vow</span>
              <h3 className="text-3xl sm:text-5xl font-display italic font-black text-espresso">
                {LETTERS.find(l => l.id === openId)?.title}
              </h3>
            </div>

            <div className="relative py-12 px-6">
               <div className="absolute top-0 left-0 text-rose-gold opacity-10">
                  <Sparkles size={60} />
               </div>
               <p className="text-xl sm:text-3xl font-handwritten text-espresso leading-relaxed italic relative z-10">
                 "{LETTERS.find(l => l.id === openId)?.content}"
               </p>
               <div className="absolute bottom-0 right-0 text-rose-gold opacity-10">
                  <Sparkles size={60} />
               </div>
            </div>

            <div className="pt-8 flex flex-col items-center gap-4 border-t border-espresso/5">
               <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-rose-gold/30" />
                  <p className="text-[11px] font-sans font-bold uppercase tracking-[0.5em] text-rose-gold">Yours Eternally, Biruk</p>
                  <div className="h-px w-12 bg-rose-gold/30" />
               </div>
               <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-espresso/20 italic">A Gentleman's Honor</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenWhen;
