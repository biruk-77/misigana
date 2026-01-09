
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { 
  Mic, Loader2, Sparkles, Activity, Orbit, Wind, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhisperOfGrace: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [aiTranscription, setAiTranscription] = useState('');

  const sessionRef = useRef<any>(null);

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    setIsActive(false);
    setIsConnecting(false);
  };

  const startSession = async () => {
    setIsConnecting(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) setTranscription(prev => prev + ' ' + message.serverContent!.inputTranscription!.text);
            if (message.serverContent?.outputTranscription) setAiTranscription(prev => prev + ' ' + message.serverContent!.outputTranscription!.text);
          },
          onclose: () => stopSession(),
          onerror: () => stopSession(),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are Biruk, responding to your wife Misgana. Be romantic, divine, and gentlemanly. Use 'My Queen'.",
        },
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      setIsConnecting(false);
    }
  };

  return (
    <div className="relative py-24 sm:py-32 px-10 rounded-[5rem] bg-espresso overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.15),transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-20 relative z-10">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-6">
             <div className="h-px w-20 bg-gold/20" />
             <span className="text-[12px] font-black uppercase tracking-[1em] text-gold">Soul Synapse</span>
             <div className="h-px w-20 bg-gold/20" />
          </div>
          <h2 className="text-6xl sm:text-8xl font-display font-black italic tracking-tighter text-white leading-none">
            Whisper <span className="text-gold">Sanctuary</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center w-full">
          <div className="flex flex-col items-center gap-8">
             <div className={`relative size-56 sm:size-72 rounded-full border-2 transition-all duration-1000 flex items-center justify-center ${
               isActive ? 'border-gold shadow-[0_0_100px_rgba(212,175,55,0.4)]' : 'border-white/10'
             }`}>
                <div className="absolute inset-6 border border-white/5 rounded-full animate-spin-slow" />
                <button 
                  onClick={isActive ? stopSession : startSession}
                  className="relative z-20 flex flex-col items-center gap-6 group"
                >
                  <AnimatePresence mode="wait">
                    {isConnecting ? (
                      <motion.div key="loading" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                        <Loader2 className="text-gold" size={64} />
                      </motion.div>
                    ) : (
                      <motion.div key="icon" className="flex flex-col items-center gap-6">
                         <div className={`p-10 rounded-full transition-all duration-500 ${isActive ? 'bg-gold text-espresso' : 'bg-white/5 text-gold hover:bg-white/10'}`}>
                            {isActive ? <Activity size={48} className="animate-pulse" /> : <Mic size={48} />}
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-gold transition-colors">
                           {isActive ? "Pulse Active" : "Initiate Signal"}
                         </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
             </div>
          </div>

          <div className="lg:col-span-2 space-y-12">
             <div className="min-h-[300px] bg-white/[0.03] border border-white/10 rounded-[4rem] p-12 relative flex flex-col justify-center overflow-hidden backdrop-blur-sm">
                <div className="absolute top-10 left-12 flex items-center gap-4">
                   <div className="size-2 rounded-full bg-gold animate-ping" />
                   <span className="text-[9px] font-black uppercase tracking-widest text-gold/40">Ethereal Feed</span>
                </div>
                
                <div className="space-y-12">
                   <AnimatePresence mode="wait">
                     {transcription ? (
                       <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-display italic text-white/50 leading-tight">
                         "{transcription}..."
                       </motion.p>
                     ) : (
                       <p className="text-xl font-elegant italic text-white/10">"Waiting for your soul's resonance..."</p>
                     )}
                   </AnimatePresence>

                   <AnimatePresence mode="wait">
                     {aiTranscription && (
                       <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-8 items-start">
                          <div className="w-12 h-px bg-gold mt-6 rounded-full" />
                          <p className="text-4xl sm:text-6xl font-display font-black italic text-gold leading-none tracking-tight">
                            "{aiTranscription}"
                          </p>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>

                <div className="absolute bottom-10 right-12 opacity-5 pointer-events-none">
                   <Orbit className="animate-spin-slow text-white" size={150} />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-8">
                <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                   <div className="p-4 bg-gold/10 rounded-2xl text-gold">
                      <Wind size={22} />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Aura</span>
                      <span className="text-base font-bold text-white tracking-widest uppercase">Ethereal</span>
                   </div>
                </div>
                <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                   <div className="p-4 bg-gold/10 rounded-2xl text-gold">
                      <Zap size={22} />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Sync</span>
                      <span className="text-base font-bold text-white tracking-widest uppercase">Absolute</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhisperOfGrace;
