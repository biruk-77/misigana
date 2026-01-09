
import React, { useState } from 'react';
import { BookOpen, Cross, Loader2, Sparkles, HelpingHand } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SpiritualLegacy: React.FC = () => {
  const [prayer, setPrayer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePrayer = async () => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Write a one-sentence powerful, spiritual prayer/blessing from Biruk for his wife-to-be Misgana. Focus on protection, grace, and her being a Proverbs 31 woman. Keep it high-end and deeply moving.",
      });
      setPrayer(response.text || "May His light always dance in your eyes, and His peace guard your beautiful soul.");
    } catch (e) {
      setPrayer("May God keep you safe under His wings, my Proverbs 31 Queen.");
    }
    setLoading(false);
  };

  return (
    <div className="relative py-20 px-10 rounded-[4rem] bg-gradient-to-br from-[#fdfbf7] to-[#f5f0e8] border border-primary/10 overflow-hidden group">
      <div className="absolute top-0 right-0 p-20 opacity-[0.02] group-hover:rotate-12 transition-transform duration-[3s]">
        <Cross size={400} />
      </div>

      <div className="max-w-3xl mx-auto text-center space-y-10 relative z-10">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white rounded-full shadow-lg text-primary border border-primary/5">
            <BookOpen size={24} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">The Foundation</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl font-display font-black italic text-text-main leading-tight">
            Proverbs 31:29
          </h2>
          <p className="text-xl sm:text-2xl font-display italic text-text-main/60 max-w-xl mx-auto">
            "Many women do noble things, but you surpass them all."
          </p>
        </div>

        <div className="pt-10">
          {!prayer ? (
            <button
              onClick={generatePrayer}
              disabled={loading}
              className="px-10 py-5 bg-text-main text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-primary transition-all flex items-center justify-center gap-4 mx-auto shadow-2xl disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <HelpingHand size={16} />}
              Receive Today's Blessing
            </button>
          ) : (
            <div className="animate-reveal-up space-y-6">
              <p className="text-2xl sm:text-4xl font-display italic text-primary leading-tight">
                {prayer}
              </p>
              <button 
                onClick={() => setPrayer(null)}
                className="text-[9px] font-black uppercase tracking-[0.4em] text-text-main/30 hover:text-primary transition-colors"
              >
                <Sparkles size={10} className="inline mr-2" /> Renew The Vow
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpiritualLegacy;
