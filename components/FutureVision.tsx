
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, Camera, Map, Heart, Share2 } from 'lucide-react';
import TiltCard from './TiltCard';

const FutureVision: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateVision = async () => {
    if (!prompt) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: `A cinematic, ultra-high-definition, romantic vision of Biruk and Misgana's future: ${prompt}. Style: Golden hour lighting, elegant, spiritual, ethereal atmosphere, 8k resolution, masterpiece painting style.` }
          ]
        },
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Vision Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-6 sm:px-10 rounded-[4rem] bg-white border border-primary/10 luxury-shadow overflow-hidden relative group">
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 text-primary/40">
            <Camera size={16} />
            <span className="text-[10px] font-black uppercase tracking-[1em]">The Lens of Destiny</span>
          </div>
          <h2 className="text-4xl sm:text-7xl font-display font-black italic text-text-main tracking-tighter">
            Visualize <span className="text-primary">Our Future</span>
          </h2>
          <p className="text-sm sm:text-lg font-display italic text-text-main/40 max-w-xl mx-auto">
            Describe a dream you have for us—a wedding, a home, a quiet moment—and let the AI paint our tomorrow.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-10">
          {!imageUrl ? (
            <div className="w-full max-w-2xl space-y-6">
              <div className="relative group">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Our wedding day in a garden filled with white roses..."
                  className="w-full bg-primary/5 border-2 border-primary/10 rounded-[2rem] p-8 text-xl font-display italic text-text-main placeholder:text-text-main/10 focus:border-primary outline-none transition-all h-32 resize-none"
                />
              </div>

              <button
                onClick={generateVision}
                disabled={loading || !prompt}
                className="w-full py-6 bg-text-main text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-primary transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-30 group"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Map size={18} />}
                Manifest The Vision
              </button>
            </div>
          ) : (
            <div className="w-full animate-reveal-up space-y-10">
              <TiltCard intensity={5}>
                <div className="relative rounded-[3rem] overflow-hidden border-[15px] border-primary/5 shadow-2xl bg-primary/5 aspect-video">
                  <img src={imageUrl} alt="Future Vision" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-10">
                    <p className="text-xl sm:text-2xl font-display italic text-white/80">"{prompt}"</p>
                  </div>
                </div>
              </TiltCard>
              
              <div className="flex justify-center gap-6">
                <button 
                  onClick={() => setImageUrl(null)}
                  className="px-10 py-4 border border-text-main/10 rounded-full text-[9px] font-black uppercase tracking-[0.4em] hover:bg-primary/5 transition-all text-text-main"
                >
                  Dream Another Day
                </button>
                <button className="px-10 py-4 bg-primary text-white rounded-full text-[9px] font-black uppercase tracking-[0.4em] hover:scale-105 transition-all flex items-center gap-3">
                  <Share2 size={12} /> Save Promise
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FutureVision;
