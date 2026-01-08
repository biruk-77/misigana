
import React, { useState } from 'react';
import { Sparkles, Loader2, Music, Feather } from 'lucide-react';
import { generateLovePoem } from '../services/geminiService';

const PoemGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [fav, setFav] = useState('');
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !fav) return;
    setLoading(true);
    const result = await generateLovePoem(name, fav);
    setPoem(result);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto my-52 px-6 reveal">
      <div className="glass-premium p-16 md:p-32 rounded-[5rem] relative overflow-hidden text-center group border-white/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-12">
            <div className="flex flex-col items-center gap-4">
                <Feather className="w-10 h-10 text-rose-200" />
                <h2 className="font-serif-premium text-5xl md:text-7xl text-rose-950 italic">Eternal Verses</h2>
                <p className="text-rose-400 font-serif-premium tracking-widest text-[10px] uppercase">Handwritten by the Stars</p>
            </div>
            
            {!poem ? (
            <form onSubmit={handleGenerate} className="space-y-16 max-w-xl mx-auto pt-8">
                <div className="space-y-4">
                    <label className="font-serif-premium text-rose-300 text-xs uppercase tracking-widest">Her Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-b border-rose-100 py-6 focus:border-rose-400 outline-none font-serif-premium text-4xl placeholder:text-rose-100 transition-all text-center selection:bg-rose-100"
                        placeholder="Misgana..."
                        required
                    />
                </div>
                <div className="space-y-4">
                    <label className="font-serif-premium text-rose-300 text-xs uppercase tracking-widest">Something she loves</label>
                    <input
                        type="text"
                        value={fav}
                        onChange={(e) => setFav(e.target.value)}
                        className="w-full bg-transparent border-b border-rose-100 py-6 focus:border-rose-400 outline-none font-serif-premium text-4xl placeholder:text-rose-100 transition-all text-center selection:bg-rose-100"
                        placeholder="God's presence..."
                        required
                    />
                </div>
                <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-20 py-8 bg-rose-950 text-white rounded-full font-serif-premium italic text-2xl shadow-2xl hover:shadow-rose-900/40 transition-all disabled:opacity-50 relative overflow-hidden group/btn"
                >
                <span className="relative z-10 flex items-center justify-center gap-4">
                    {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Sparkles className="w-6 h-6 text-rose-300" />}
                    Compose for Her
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-900 to-rose-950 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-700" />
                </button>
            </form>
            ) : (
            <div className="animate-[fadeIn_2s_ease-out] space-y-16 py-12">
                <div className="font-romantic text-4xl md:text-6xl text-rose-900 leading-[1.8] whitespace-pre-wrap italic drop-shadow-sm selection:bg-rose-100">
                {poem}
                </div>
                <div className="pt-8">
                    <button
                    onClick={() => setPoem('')}
                    className="text-rose-300 font-serif-premium italic border-b border-rose-100 hover:text-rose-500 hover:border-rose-500 transition-all text-xl"
                    >
                    Ask for another verse
                    </button>
                </div>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PoemGenerator;
