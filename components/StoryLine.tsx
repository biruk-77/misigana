import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useSpring, motion, useTransform, AnimatePresence } from 'framer-motion';
import {
  Heart, Star, ChevronDown, Sparkles, Flower2, Gem, Crown,
  MessageCircle, Cloud, MapPin, Play, Pause, BookOpen,
  Music2, Volume2, Share2
} from 'lucide-react';
import { MEMORIES } from '../constants';
import { Memory } from '../types';

// --- VISUAL ASSETS & STYLES ---

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Montserrat:wght@200;300;400;500&family=Great+Vibes&display=swap');
    
    .font-display { font-family: 'Cormorant Garamond', serif; }
    .font-body { font-family: 'Montserrat', sans-serif; }
    .font-script { font-family: 'Great Vibes', cursive; }
    
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    /* 3D UTILITIES */
    .perspective-1000 { perspective: 1000px; }
    .preserve-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; }
  `}</style>
);

// --- COMPONENT: DECORATIVE STICKER ---
const DecorativeSticker = ({ type = 'flower', delay = 0, x = 0 || '0%', y = 0 || '0%', scale = 1, rotate = 0 }) => {
  const icons = {
    flower: <Flower2 size={56} className="text-rose-300 drop-shadow-sm" strokeWidth={1} />,
    heart: <Heart size={40} className="text-rose-400 drop-shadow-sm" fill="rgba(244, 63, 94, 0.1)" />,
    star: <Star size={32} className="text-amber-300 drop-shadow-sm" fill="rgba(252, 211, 77, 0.2)" />,
    sparkle: <Sparkles size={40} className="text-amber-400 drop-shadow-sm" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: scale }}
      transition={{ delay, duration: 0.8, type: "spring" }}
      className="absolute pointer-events-none z-0 opacity-90"
      style={{ left: x, top: y, rotate }}
    >
      {icons[type as keyof typeof icons] || icons.flower}
    </motion.div>
  );
};

// --- COMPONENT: MEMORY SECTION ---
const MemorySection: React.FC<{ memory: Memory; index: number; isActive: boolean }> = ({ memory, index, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="h-[100dvh] w-full snap-start snap-always relative flex items-center justify-center overflow-hidden bg-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 via-white to-amber-50/30" />

      {/* Animated Stickers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <DecorativeSticker type="flower" x="5%" y="15%" rotate={10} delay={0.1} scale={1.2} />
        <DecorativeSticker type="heart" x="90%" y="70%" rotate={-15} delay={0.3} scale={1.5} />
        <DecorativeSticker type="star" x="15%" y="85%" rotate={45} delay={0.5} />
        <DecorativeSticker type="sparkle" x="85%" y="20%" rotate={-10} delay={0.7} scale={0.8} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/snow.png')] opacity-[0.05]" />
      </div>

      <div className="w-full h-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20 items-center px-6 lg:px-20 relative z-10">

        {/* LEFT: 360 ROTATING IMAGE PRISM */}
        <div className="w-full h-[50vh] lg:h-full flex items-center justify-center perspective-1000">
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="relative w-[70vw] lg:w-[400px] aspect-[3/4] preserve-3d group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* FRONT FACE (Main Image) */}
            <div className="absolute inset-0 rounded-[3rem] border-[12px] border-white/80 bg-white shadow-2xl overflow-hidden backface-hidden">
              <img
                src={memory.image}
                alt={memory.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x1200/fae8ff/be185d?text=${memory.title.split(' ')[0]}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-transparent pointer-events-none" />

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-150%] animate-shine pointer-events-none" />
            </div>

            {/* BACK FACE (Decorative) */}
            <div
              className="absolute inset-0 rounded-[3rem] border-[12px] border-white/80 bg-rose-100/50 backdrop-blur-md shadow-2xl flex items-center justify-center backface-hidden"
              style={{ transform: "rotateY(180deg)" }}
            >
              <div className="text-center p-8">
                <Heart size={64} className="text-rose-400 mx-auto mb-4 animate-pulse" fill="#f43f5e" />
                <p className="font-script text-3xl text-rose-600">Forever & Always</p>
                <p className="font-display text-lg text-rose-400 mt-2">{memory.date}</p>
              </div>
            </div>

            {/* Floating Elements Orbiting */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-20 z-[-1]"
            >
              <Sparkles className="absolute top-0 left-1/2 text-amber-300" size={32} />
              <Star className="absolute bottom-0 right-1/2 text-rose-300" size={24} />
            </motion.div>
          </motion.div>

          {/* Floor Reflection Shadow */}
          <div className="absolute bottom-[10%] w-[300px] h-[20px] bg-black/20 blur-xl rounded-full" />
        </div>

        {/* RIGHT: CONTENT & CHAT */}
        <div className="w-full h-full lg:h-auto flex flex-col justify-center pb-20 lg:pb-0">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:pl-10 relative"
          >
            {/* Vertical Line Decoration */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-300 to-transparent hidden lg:block" />

            {/* Header Data */}
            <div className="flex items-center gap-4 text-rose-400 font-body text-xs font-bold tracking-widest uppercase">
              <span>Chapter {index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
              <span className="w-12 h-px bg-rose-300" />
              <span>{memory.date}</span>
            </div>

            {/* Title & Desc */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium text-rose-950 leading-[0.9] tracking-tight">
              {memory.title}
            </h2>
            <p className="text-lg text-slate-600 font-body font-light leading-relaxed max-w-xl">
              {memory.description}
            </p>

            {/* Chat Bubbles */}
            <div className="pt-6 space-y-4 max-w-xl">
              {memory.chatHistory?.map((chat, cIdx) => (
                <motion.div
                  key={cIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (cIdx * 0.15) }}
                  className={`flex items-end gap-3 ${chat.sender.includes('Bura') ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Sender Badge */}
                  <div className={`
                     w-8 h-8 rounded-full flex items-center justify-center shadow-md
                     ${chat.sender.includes('Bura') ? 'bg-rose-500 text-white' : 'bg-amber-400 text-white'}
                   `}>
                    <span className="text-[10px] font-bold">{chat.sender[0]}</span>
                  </div>

                  {/* Message Glass */}
                  <div className={`
                     relative p-4 rounded-2xl shadow-sm border backdrop-blur-sm
                     ${chat.sender.includes('Bura')
                      ? 'bg-white/80 border-rose-100 rounded-bl-none text-rose-900'
                      : 'bg-amber-50/80 border-amber-100 rounded-br-none text-amber-900'}
                   `}>
                    <p className="font-display italic text-lg leading-snug">"{chat.text}"</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- MAIN COMPONENT ---
const StoryLine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] w-full bg-white overflow-y-auto snap-y snap-mandatory scroll-smooth"
    >
      <GlobalStyles />

      {/* COVER PAGE */}
      <section className="h-[100dvh] w-full snap-start flex flex-col items-center justify-center relative overflow-hidden bg-white">
        {/* Animated Background Stickers */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <DecorativeSticker
              key={i}
              type={i % 3 === 0 ? 'flower' : i % 3 === 1 ? 'heart' : 'star'}
              x={`${Math.random() * 80 + 10}%`}
              y={`${Math.random() * 80 + 10}%`}
              rotate={Math.random() * 360}
              scale={Math.random() * 0.8 + 0.5}
              delay={i * 0.2}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 space-y-2"
        >
          <div className="flex justify-center gap-2 mb-6">
            <Crown size={32} className="text-amber-400" />
            <Gem size={32} className="text-rose-400" />
          </div>
          <h1 className="text-[12vw] sm:text-[10vw] font-display font-bold text-rose-950 leading-[0.8] tracking-tighter">
            Our Story
          </h1>
          <p className="text-2xl sm:text-3xl font-script text-rose-500 mt-4">
            Biruk & Misgana
          </p>
        </motion.div>

        {/* SCROLL DOWN INDICATOR */}
        <motion.button
          onClick={() => {
            containerRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-32 flex flex-col items-center gap-2 text-rose-500 hover:text-rose-700 transition-colors cursor-pointer z-[99999]"
        >
          <span className="text-sm font-body uppercase tracking-[0.25em] font-semibold drop-shadow-sm">
            Scroll Down
          </span>
          <ChevronDown size={36} strokeWidth={2.5} />
        </motion.button>
      </section>

      {/* MEMORY SCROLL */}
      {MEMORIES.map((memory, index) => (
        <MemorySection
          key={memory.id}
          memory={memory}
          index={index}
          isActive={true}
        />
      ))}

      {/* FINAL PAGE - FROM YOUR GENTLEMAN */}
      <section className="h-[100dvh] w-full snap-start flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-white via-rose-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center z-10 space-y-8 max-w-2xl px-8"
        >
          <div className="flex justify-center gap-3 mb-4">
            <Heart size={28} className="text-rose-400" fill="#f43f5e" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-rose-950 leading-tight">
            From Your Gentleman
          </h2>

          <div className="space-y-6 text-lg sm:text-xl font-body text-slate-700 leading-relaxed">
            <p>
              Ma Q, every moment with you is a gift from God.
              I thank Him daily for placing you in my life.
            </p>
            <p>
              This is not just a memory book—it's my promise to you.
              To love you, protect you, and cherish you always.
            </p>
            <p className="font-script text-2xl sm:text-3xl text-rose-500 pt-4">
              With all my heart,<br />
              Bura ❤️
            </p>
          </div>

          <div className="pt-8">
            <p className="text-xs font-body uppercase tracking-widest text-rose-300">
              Built with love • 2025
            </p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <DecorativeSticker type="flower" x="10%" y="20%" rotate={15} delay={0.2} />
          <DecorativeSticker type="heart" x="85%" y="75%" rotate={-10} delay={0.4} scale={1.2} />
          <DecorativeSticker type="star" x="90%" y="15%" rotate={30} delay={0.6} />
        </div>
      </section>

      {/* GLOBAL PROGRESS BAR (Left) */}
      <div className="fixed left-0 top-0 bottom-0 w-1.5 bg-rose-50 z-50">
        <motion.div
          className="w-full bg-gradient-to-b from-rose-300 to-rose-500"
          style={{ height: "100%", originY: 0, scaleY }}
        />
      </div>

    </div>
  );
};

export default StoryLine;
