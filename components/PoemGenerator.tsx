
import React, { useState } from 'react';
import { Feather, Loader2, Sparkles, RefreshCw, Music, Heart, Wind, Star } from 'lucide-react';
import { generateLovePoem } from '../services/geminiService';

const MOODS = [
  { name: 'Cinematic', icon: <Star size={12} />, prompt: 'cinematic and grand' },
  { name: 'Ethereal', icon: <Wind size={12} />, prompt: 'dreamy and ethereal' },
  { name: 'Classic', icon: <Music size={12} />, prompt: 'classic, like a sonnet' },
];

const PoemGenerator: React.FC = () => {
  const [fav, setFav] = useState('');
  const [mood, setMood] = useState(MOODS[0]);
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fav) return;
    setLoading(true);
    const result = await generateLovePoem('Misgana', fav, mood.prompt);
    setPoem(result);
    setLoading(false);
  };

  return (
    <div className="bg-white p-10 sm:p-20 rounded-[3rem] sm:rounded-[5rem] h-full flex flex-col space-y-8 relative overflow-hidden luxury-shadow border border-primary/10">
      <div className="flex items-center gap-6 relative z-10">
        <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
            <Feather size={28} strokeWidth={1} />
        </div>
        <div>
          <h3 className="text-3xl font-display italic font-black text-text-main">Poetry Oracle</h3>
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-text-main/20">Divine Calligraphy</p>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {!poem ? (
          <form onSubmit={handleGenerate} className="space-y-10 flex-1 flex flex-col justify-center">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-text-main/30 ml-4">The Muse</label>
              <input
                type="text"
                value={fav}
                onChange={(e) => setFav(e.target.value)}
                className="w-full border-b-2 border-primary/10 focus:border-primary px-4 py-6 outline-none transition-all text-text-main placeholder:text-text-main/10 font-display italic text-2xl sm:text-3xl bg-transparent"
                placeholder="The synchronicity of 5:59..."
                required
              />
            </div>

            <div className="flex flex-wrap gap-4">
              {MOODS.map((m) => (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${mood.name === m.name ? 'bg-primary text-white shadow-lg' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}
                >
                  {m.icon} {m.name}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-text-main text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-primary transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-50 group mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              Write Her Soul
            </button>
          </form>
        ) : (
          <div className="flex flex-col justify-between h-full space-y-8 animate-reveal-up">
            <div className="font-display text-2xl sm:text-4xl text-text-main leading-[1.4] italic text-center py-12 px-6 bg-primary/[0.02] rounded-[3rem] border border-primary/5 relative">
              <div className="absolute top-6 left-6 opacity-5">
                <Heart size={80} fill="currentColor" />
              </div>
              <span className="relative z-10 whitespace-pre-wrap block max-w-lg mx-auto">{poem}</span>
            </div>
            <button
              onClick={() => setPoem('')}
              className="flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-[0.5em] text-primary hover:opacity-50 transition-all py-4"
            >
              <RefreshCw size={12} /> New Manuscript
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoemGenerator;
