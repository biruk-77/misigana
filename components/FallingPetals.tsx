import React, { useEffect, useState, useRef, useCallback } from 'react';

// --- ENHANCED ROMANTIC CONFIGURATION ---
const CONFIG = {
  particleCount: 90,                // Increased for lush density
  minSize: 10,                     // More delicate
  maxSize: 42,                     // Varied sizes
  gravity: 0.4,                    // Gentle fall
  wind: 0.12,                      // Soft breeze
  turbulence: 0.5,                 // Dreamy movement
  spawnRate: 0.25,                 // Continuous flow
  heartRatio: 0.65,                // Mostly hearts
  mouseInfluence: 0.4,             // Interactive romance
  glowIntensity: 1.4,
  twinkleSpeed: 0.015,
  depthRange: 500,                 // Enhanced 3D
  rotationDecay: 0.98,             // Smoother rotation
};

interface Particle {
  id: number;
  type: 'white-pink-heart' | 'diamond-sparkle' | 'petal';
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  rotation: { x: number; y: number; z: number };
  rotVelocity: { x: number; y: number; z: number };
  drag: number;
  scale: number;
  opacity: number;
  phase: number;
  twinklePhase: number;
  life: number;
  maxLife: number;
  targetOpacity: number;
}

const FallingPetals: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(0);
  const particleIdRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false, influence: 0 });
  const touchRef = useRef({ x: 0, y: 0, active: false });

  // Enhanced mouse/touch interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
        influence: 1
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.influence *= 0.95;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true
        };
      }
    };

    const handleTouchEnd = () => {
      touchRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Particle creation with emotional weighting
  const createParticle = useCallback((startY?: number): Particle => {
    const rand = Math.random();
    let type: 'white-pink-heart' | 'diamond-sparkle' | 'petal';
    
    if (rand < CONFIG.heartRatio) {
      type = 'white-pink-heart';
    } else if (rand < 0.9) {
      type = 'diamond-sparkle';
    } else {
      type = 'petal'; // Special romantic petals
    }

    const screenW = window.innerWidth;
    const z = (Math.random() - 0.5) * CONFIG.depthRange;
    const life = 250 + Math.random() * 200;
    const scale = 0.3 + Math.random() * 0.7;

    return {
      id: particleIdRef.current++,
      type,
      x: Math.random() * screenW,
      y: startY ?? -100 - Math.random() * 400,
      z,
      vx: (Math.random() - 0.5) * 0.8,
      vy: Math.random() * 0.3,
      rotation: {
        x: Math.random() * 360,
        y: Math.random() * 360,
        z: Math.random() * 360
      },
      rotVelocity: {
        x: (Math.random() - 0.5) * 1.2,
        y: (Math.random() - 0.5) * 1.2,
        z: (Math.random() - 0.5) * 0.6
      },
      drag: type === 'diamond-sparkle' ? 0.96 : 0.94,
      scale,
      opacity: 0,
      targetOpacity: 0.8 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      twinklePhase: Math.random() * 100,
      life,
      maxLife: life
    };
  }, []);

  // Initialize with beautiful entry
  useEffect(() => {
    const initial = Array.from({ length: CONFIG.particleCount }, (_, i) => {
      const p = createParticle(Math.random() * window.innerHeight);
      return { ...p, id: i, opacity: 0.3 + Math.random() * 0.5 };
    });
    setParticles(initial);

    const animate = (time: number) => {
      timeRef.current = time * 0.001;
      
      const screenH = window.innerHeight;
      const screenW = window.innerWidth;
      
      // Emotional wind patterns
      const windWave1 = Math.sin(timeRef.current * 0.15) * CONFIG.wind;
      const windWave2 = Math.cos(timeRef.current * 0.23) * CONFIG.wind * 0.7;
      const globalWind = windWave1 + windWave2;

      setParticles(prev => {
        let nextParticles = prev.map(p => {
          // Life progression with emotional curve
          const lifeProgress = 1 - (p.life / p.maxLife);
          const ageFactor = Math.sin(lifeProgress * Math.PI); // Soft bell curve
          
          // Current interaction point
          const interactPoint = touchRef.current.active ? touchRef.current : mouseRef.current;
          
          // Mouse/touch influence (gentle attraction)
          let interactForceX = 0;
          let interactForceY = 0;
          if (interactPoint.active) {
            const dx = p.x - interactPoint.x;
            const dy = p.y - interactPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const influenceRadius = 180;
            
            if (distance < influenceRadius) {
              // Gentle attraction with romantic curve
              const strength = Math.pow(1 - distance / influenceRadius, 2) * CONFIG.mouseInfluence;
              const angle = Math.atan2(dy, dx) + Math.PI; // Attract toward cursor
              interactForceX += Math.cos(angle) * strength * 0.3;
              interactForceY += Math.sin(angle) * strength * 0.3;
            }
          }

          // Organic dream turbulence
          const noiseX = Math.sin(timeRef.current * 0.6 + p.phase) * 
                        Math.cos(timeRef.current * 0.45 + p.y * 0.002) *
                        (0.5 + p.scale * 0.5);
          
          const noiseY = Math.cos(timeRef.current * 0.7 + p.x * 0.002) *
                        Math.sin(timeRef.current * 0.35 + p.z * 0.001);

          // Update velocity with romantic physics
          let nextVx = p.vx;
          let nextVy = p.vy;

          // Gentle gravity with easing
          const gravity = CONFIG.gravity * (0.08 + ageFactor * 0.12);
          nextVy += gravity;
          
          // Wind and turbulence
          nextVx += (noiseX * CONFIG.turbulence + globalWind) * 0.07;
          nextVy += noiseY * CONFIG.turbulence * 0.03;
          
          // Interaction forces
          nextVx += interactForceX;
          nextVy += interactForceY;

          // Apply drag with depth consideration
          const depthDrag = 1 - (Math.abs(p.z) / CONFIG.depthRange) * 0.1;
          nextVx *= p.drag * depthDrag;
          nextVy *= p.drag * depthDrag;

          // Heart-specific romantic flutter
          if (p.type === 'white-pink-heart') {
            const flutter = Math.sin(timeRef.current * 2 + p.phase) * 0.02;
            const lift = Math.sin(p.rotation.z * (Math.PI / 180) + timeRef.current) * nextVy * 0.04;
            nextVx += lift + flutter;
          }

          // Petal-specific spinning
          if (p.type === 'petal') {
            const spin = Math.cos(timeRef.current + p.phase) * 0.01;
            nextVx += spin;
          }

          // Update rotation with decay
          const nextRot = {
            x: p.rotation.x + p.rotVelocity.x * 0.6 + nextVy * 0.2,
            y: p.rotation.y + p.rotVelocity.y * 0.6 + nextVx * 0.2,
            z: p.rotation.z + p.rotVelocity.z * 0.4
          };

          // Apply rotation decay
          p.rotVelocity.x *= CONFIG.rotationDecay;
          p.rotVelocity.y *= CONFIG.rotationDecay;
          p.rotVelocity.z *= CONFIG.rotationDecay;

          // Twinkling opacity
          const twinkle = 0.75 + 0.25 * Math.sin(timeRef.current * CONFIG.twinkleSpeed + p.twinklePhase);
          
          // Update position
          let nextX = p.x + nextVx;
          let nextY = p.y + nextVy;
          let nextOpacity = Math.min(p.targetOpacity, p.opacity + 0.02) * twinkle;
          let nextLife = p.life - 0.5;

          // Respawn with romantic timing
          const shouldRespawn = nextY > screenH + 80 || 
                              nextX < -80 || 
                              nextX > screenW + 80 ||
                              nextLife <= 0;

          if (shouldRespawn && Math.random() < CONFIG.spawnRate) {
            return {
              ...createParticle(),
              id: p.id
            };
          }

          // Boundary wrapping with smooth edges
          if (nextX > screenW + 30) nextX = -30;
          if (nextX < -30) nextX = screenW + 30;

          return {
            ...p,
            x: nextX,
            y: nextY,
            vx: nextVx,
            vy: nextVy,
            rotation: nextRot,
            opacity: nextOpacity,
            life: nextLife,
            twinklePhase: p.twinklePhase + 0.03
          };
        });

        // Add new particles occasionally for continuous romance
        if (Math.random() < 0.015 && nextParticles.length < CONFIG.particleCount * 1.3) {
          nextParticles.push(createParticle());
        }

        return nextParticles;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [createParticle]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ 
        perspective: '1600px',
        background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(255, 182, 193, 0.02) 70%, rgba(255, 105, 180, 0.03) 100%)'
      }}
    >
      {/* Enhanced SVG Definitions */}
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Romantic White-Pink Gradient */}
          <linearGradient id="romanticWhitePink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#FFE4E9" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FFC0CB" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FF69B4" stopOpacity="0.8" />
          </linearGradient>

          {/* Diamond Sparkle with Iridescence */}
          <radialGradient id="iridescentDiamond">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F8F8FF" />
            <stop offset="60%" stopColor="#E6E6FA" />
            <stop offset="100%" stopColor="#D8BFD8" />
          </radialGradient>

          {/* Romantic Petal Gradient */}
          <linearGradient id="romanticPetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE4E1" />
            <stop offset="100%" stopColor="#FFB6C1" />
          </linearGradient>

          {/* Romantic Glow Filter */}
          <filter id="romanticGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feFlood floodColor="#FF69B4" floodOpacity="0.2" result="pinkBlur" />
            <feComposite in="pinkBlur" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft Sparkle Filter */}
          <filter id="softSparkle">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
          </filter>
        </defs>
      </svg>

      {/* Dreamy Background Glows */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-pink-300/5 to-rose-300/5 rounded-full blur-[100px] animate-float" 
             style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-l from-rose-300/5 to-pink-300/5 rounded-full blur-[80px] animate-float" 
             style={{ animationDuration: '25s', animationDelay: '3s' }} />
      </div>

      {/* Emotional Quote Overlay */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-auto opacity-80">
        <div className="text-sm text-pink-200/70 font-light tracking-widest mb-1">
          THE ANSWERED PRAYER
        </div>
        <div className="text-xs text-pink-300/60 font-light italic">
          God hears our whispers
        </div>
      </div>

      {/* Falling Particles */}
      {particles.map(p => {
        const size = CONFIG.minSize + (p.scale * (CONFIG.maxSize - CONFIG.minSize));
        const depthFactor = 1 - Math.abs(p.z) / CONFIG.depthRange;
        const depthBlur = (1 - depthFactor) * 2.5;
        const depthScale = 0.7 + depthFactor * 0.6;
        const lifeOpacity = (p.life / p.maxLife) * p.opacity;
        const floatOffset = Math.sin(timeRef.current * 0.8 + p.id * 0.1) * 3;

        return (
          <div
            key={p.id}
            className="absolute will-change-transform transition-all duration-100 ease-out"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: lifeOpacity,
              filter: `
                blur(${depthBlur}px)
                drop-shadow(0 0 ${3 + depthFactor * 4}px rgba(255, 182, 193, ${0.2 * lifeOpacity}))
              `,
              transform: `
                translate3d(${p.x}px, ${p.y + floatOffset}px, ${p.z}px)
                rotateX(${p.rotation.x}deg)
                rotateY(${p.rotation.y}deg)
                rotateZ(${p.rotation.z}deg)
                scale(${depthScale})
              `,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1), opacity 0.3s ease-out'
            }}
          >
            <VisualContent type={p.type} />
          </div>
        );
      })}
    </div>
  );
};

const VisualContent: React.FC<{ type: string }> = ({ type }) => {
  const common = "absolute inset-0 w-full h-full";

  if (type === 'white-pink-heart') {
    return (
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {/* Front - Animated Romantic Heart */}
        <div className={common} style={{ 
          animation: 'heartFloat 3s ease-in-out infinite',
          filter: 'url(#romanticGlow)'
        }}>
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              fill="url(#romanticWhitePink)"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="0.4"
              className="drop-shadow-[0_0_8px_rgba(255,182,193,0.6)]"
            />
            {/* Inner shine */}
            <path
              d="M12 6L14 9L17 9.5L15 12L15.5 15L12 13L8.5 15L9 12L7 9.5L10 9L12 6Z"
              fill="rgba(255, 255, 255, 0.4)"
              className="animate-pulse"
              style={{ animationDuration: '2s' }}
            />
          </svg>
        </div>

        {/* Back - Soft Pink Shimmer */}
        <div className={common} style={{ 
          transform: 'rotateY(180deg) translateZ(1px)',
          opacity: 0.3,
          filter: 'blur(1px)'
        }}>
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path
              fill="rgba(255, 105, 180, 0.3)"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'diamond-sparkle') {
    return (
      <div className="w-full h-full animate-pulse" style={{ 
        animationDuration: '1.8s',
        filter: 'url(#softSparkle)'
      }}>
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path
            fill="url(#iridescentDiamond)"
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            className="drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
          />
          {/* Inner sparkle animation */}
          <path
            d="M12 5L13.5 8.5L17 9L14 11.5L14.5 15L12 13L9.5 15L10 11.5L7 9L10.5 8.5L12 5Z"
            fill="rgba(255, 255, 255, 0.9)"
            className="animate-spin"
            style={{ animationDuration: '4s', transformOrigin: 'center' }}
          />
        </svg>
      </div>
    );
  }

  // Romantic Petal
  return (
    <div className="w-full h-full animate-float" style={{ animationDuration: '6s' }}>
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
          fill="url(#romanticPetal)"
          d="M12 3C10 3 8 5 8 7C8 9 10 11 12 13C14 11 16 9 16 7C16 5 14 3 12 3Z"
          stroke="rgba(255, 182, 193, 0.4)"
          strokeWidth="0.3"
          className="drop-shadow-[0_0_4px_rgba(255,182,193,0.3)]"
        />
        <ellipse cx="12" cy="7" rx="1" ry="0.8" fill="rgba(255, 255, 255, 0.7)" />
      </svg>
    </div>
  );
};

// Add romantic global animations
const globalStyles = `
  @keyframes heartFloat {
    0%, 100% { 
      transform: translateY(0px) scale(1) rotate(0deg); 
    }
    33% { 
      transform: translateY(-3px) scale(1.03) rotate(1deg); 
    }
    66% { 
      transform: translateY(2px) scale(0.98) rotate(-1deg); 
    }
  }
  
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg); 
    }
    50% { 
      transform: translateY(-15px) rotate(3deg); 
    }
  }
  
  @keyframes gentleSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-float {
    animation: float ease-in-out infinite;
  }
  
  .animate-spin {
    animation: gentleSpin linear infinite;
  }
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = globalStyles;
  document.head.appendChild(styleSheet);
}

export default FallingPetals;