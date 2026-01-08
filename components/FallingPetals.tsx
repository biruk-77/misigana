
import React, { useEffect, useState, useMemo } from 'react';

interface PetalConfig {
  id: number;
  left: string;
  duration: string;
  delay: string;
  size: string;
  opacity: number;
  blur: string;
  rotation: string;
}

const FallingPetals: React.FC = () => {
  const [petals, setPetals] = useState<PetalConfig[]>([]);

  const generatePetal = (id: number, initial = false): PetalConfig => ({
    id,
    left: `${Math.random() * 100}%`,
    duration: `${15 + Math.random() * 20}s`,
    delay: initial ? `${Math.random() * 10}s` : '0s',
    size: `${10 + Math.random() * 25}px`,
    opacity: 0.2 + Math.random() * 0.5,
    blur: Math.random() > 0.7 ? 'blur(2px)' : 'none', // Depth of field
    rotation: `${Math.random() * 360}deg`,
  });

  useEffect(() => {
    const initial = Array.from({ length: 20 }).map((_, i) => generatePetal(i, true));
    setPetals(initial);

    const interval = setInterval(() => {
      setPetals(prev => {
        const next = [...prev.slice(-30), generatePetal(Date.now())];
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {petals.map(p => (
        <svg
          key={p.id}
          className="petal absolute animate-drift"
          style={{
            left: p.left,
            top: '-50px',
            animation: `drift ${p.duration} linear ${p.delay} infinite`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: p.blur,
            transform: `rotate(${p.rotation})`,
          }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#fecdd3"
          />
        </svg>
      ))}
      <style>{`
        @keyframes drift {
          0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0; }
          10% { opacity: var(--tw-opacity); }
          50% { transform: translateY(50vh) rotate(180deg) translateX(50px); }
          90% { opacity: var(--tw-opacity); }
          100% { transform: translateY(110vh) rotate(360deg) translateX(-20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FallingPetals;
