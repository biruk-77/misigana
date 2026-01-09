
import React, { useEffect, useState } from 'react';

interface ParticleConfig {
  id: number;
  type: 'petal' | 'heart' | 'sparkle' | 'gold-leaf';
  left: string;
  duration: string;
  delay: string;
  size: string;
  opacity: number;
  blur: string;
  rotation: string;
  driftX: string;
}

const FallingParticles: React.FC = () => {
  const [particles, setParticles] = useState<ParticleConfig[]>([]);

  const generateParticle = (id: number, initial = false): ParticleConfig => {
    const types: ParticleConfig['type'][] = ['petal', 'heart', 'sparkle', 'gold-leaf'];
    return {
      id,
      type: types[Math.floor(Math.random() * types.length)],
      left: `${Math.random() * 120 - 10}%`,
      duration: `${15 + Math.random() * 20}s`,
      delay: initial ? `${Math.random() * 10}s` : '0s',
      size: `${10 + Math.random() * 20}px`,
      opacity: 0.4 + Math.random() * 0.5,
      blur: Math.random() > 0.9 ? `blur(${Math.random() * 1}px)` : 'none',
      rotation: `${Math.random() * 360}deg`,
      driftX: `${Math.random() * 200 - 100}px`,
    };
  };

  useEffect(() => {
    const initial = Array.from({ length: 50 }).map((_, i) => generateParticle(i, true));
    setParticles(initial);

    const interval = setInterval(() => {
      setParticles(prev => {
        const next = [...prev.slice(-60), generateParticle(Date.now())];
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: '-50px',
            // @ts-ignore
            "--drift-x": p.driftX,
            animation: `fall-slow ${p.duration} linear ${p.delay} infinite`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: p.blur,
          }}
        >
          {p.type === 'heart' && (
            <svg viewBox="0 0 24 24" fill="#D4AF37" className="drop-shadow-lg opacity-80">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          {p.type === 'sparkle' && (
            <div className="w-full h-full bg-gold/50 rounded-full animate-pulse blur-[1px] shadow-[0_0_15px_#D4AF37]" />
          )}
          {p.type === 'gold-leaf' && (
            <div className="w-full h-full bg-gold opacity-60 rounded-full scale-x-50 rotate-45" />
          )}
          {p.type === 'petal' && (
            <div className="w-full h-full rounded-tl-full rounded-br-full bg-rose-200/50 rotate-45 shadow-sm" />
          )}
        </div>
      ))}
      <style>{`
        @keyframes fall-slow {
          0% { 
            transform: translateY(0) rotate(0deg) translateX(0); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(110vh) rotate(720deg) translateX(var(--drift-x)); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  );
};

export default FallingParticles;
