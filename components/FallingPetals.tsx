import React, { useEffect, useState, useRef, useCallback } from 'react';

const CONFIG = {
  particleCount: 40,
  gravity: 0.08,
  wind: 0.03,
  depthRange: 800,
};

interface Particle {
  id: number;
  type: 'rose' | 'daisy' | 'lily';
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  rotation: { x: number; y: number; z: number };
  rotVelocity: { x: number; y: number; z: number };
  scale: number;
  opacity: number;
  targetOpacity: number;
  phase: number;
  wobble: number;
}

const WeddingPetalsBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number>();
  const timeRef = useRef(0);
  const particleIdRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const createParticle = useCallback((startY?: number): Particle => {
    const rand = Math.random();
    let type: Particle['type'];
    if (rand < 0.33) type = 'rose';
    else if (rand < 0.66) type = 'daisy';
    else type = 'lily';

    const screenW = window.innerWidth;
    const z = (Math.random() - 0.5) * CONFIG.depthRange;

    return {
      id: particleIdRef.current++,
      type,
      x: Math.random() * screenW,
      y: startY ?? -150 - Math.random() * 300,
      z,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.15 + 0.05,
      rotation: {
        x: Math.random() * 360,
        y: Math.random() * 360,
        z: Math.random() * 360
      },
      rotVelocity: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.3
      },
      scale: 0.6 + Math.random() * 0.4,
      opacity: 0,
      targetOpacity: 0.90 + Math.random() * 0.10,
      phase: Math.random() * Math.PI * 2,
      wobble: Math.random() * Math.PI * 2,
    };
  }, []);

  useEffect(() => {
    const initial = Array.from({ length: CONFIG.particleCount }, (_, i) => {
      const p = createParticle(Math.random() * window.innerHeight);
      return { ...p, id: i, opacity: p.targetOpacity };
    });
    setParticles(initial);
  }, [createParticle]);

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.016;
      const screenH = window.innerHeight;
      const screenW = window.innerWidth;

      setParticles(prev => {
        let nextParticles = prev.map(p => {
          let nextVx = p.vx;
          let nextVy = p.vy;

          nextVy += CONFIG.gravity * 0.008;

          const drag = 0.98;
          nextVy *= drag;
          nextVx *= drag;

          const wobbleSpeed = 0.002;
          const newWobble = p.wobble + wobbleSpeed;
          nextVx += Math.sin(timeRef.current * 0.5 + p.phase) * 0.008;
          nextVx += Math.cos(newWobble) * 0.005;

          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 250) {
              const force = (1 - dist / 250) * 0.01;
              nextVx += (dx / dist) * force;
              nextVy += (dy / dist) * force * 0.5;
            }
          }

          const NextRot = {
            x: p.rotation.x + p.rotVelocity.x * 0.7,
            y: p.rotation.y + p.rotVelocity.y * 0.7,
            z: p.rotation.z + p.rotVelocity.z * 0.7
          };

          let nextY = p.y + nextVy;
          let nextX = p.x + nextVx;

          if (nextX > screenW + 100) nextX = -100;
          if (nextX < -100) nextX = screenW + 100;

          const isOffScreen = nextY > screenH + 200;
          if (isOffScreen) {
            return createParticle();
          }

          return {
            ...p,
            x: nextX,
            y: nextY,
            vx: nextVx,
            vy: nextVy,
            rotation: NextRot,
            wobble: newWobble,
            opacity: Math.min(p.targetOpacity, p.opacity + 0.015)
          };
        });

        while (nextParticles.length < CONFIG.particleCount) {
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

  const renderFlower = (type: string) => {
    if (type === 'rose') {
      return (
        <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none">
          <defs>
            <radialGradient id="roseGrad" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#ff9ebc" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="25" fill="url(#roseGrad)" opacity="0.9" />
          <circle cx="50" cy="55" r="18" fill="url(#roseGrad)" opacity="0.8" />
          <circle cx="70" cy="55" r="18" fill="url(#roseGrad)" opacity="0.8" />
          <circle cx="60" cy="45" r="20" fill="url(#roseGrad)" opacity="0.85" />
          <circle cx="60" cy="60" r="12" fill="#ff4477" opacity="0.95" />
        </svg>
      );
    }

    if (type === 'daisy') {
      return (
        <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="12" fill="#ffd700" opacity="0.95" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <ellipse
              key={angle}
              cx="60"
              cy="60"
              rx="8"
              ry="22"
              fill="white"
              opacity="0.9"
              transform={`rotate(${angle} 60 60)`}
            />
          ))}
        </svg>
      );
    }

    return (
      <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="lilyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff5ff" />
            <stop offset="100%" stopColor="#f0d9ff" />
          </linearGradient>
        </defs>
        <ellipse cx="60" cy="60" rx="15" ry="35" fill="url(#lilyGrad)" opacity="0.9" />
        <ellipse cx="60" cy="60" rx="15" ry="35" fill="url(#lilyGrad)" opacity="0.9" transform="rotate(60 60 60)" />
        <ellipse cx="60" cy="60" rx="15" ry="35" fill="url(#lilyGrad)" opacity="0.9" transform="rotate(120 60 60)" />
        <circle cx="60" cy="60" r="8" fill="#ffeb99" opacity="0.95" />
      </svg>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
      // background removed to be transparent
    }}>
      {particles.map(p => {
        const depthScale = 1 + (p.z / CONFIG.depthRange);
        const size = (30 + p.scale * 40) * depthScale;
        const zIndex = Math.floor(p.z + 500);

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: p.opacity * (p.z > 0 ? 1 : 0.6),
              transform: `
                translate(-50%, -50%)
                rotateX(${p.rotation.x}deg)
                rotateY(${p.rotation.y}deg)
                rotateZ(${p.rotation.z}deg)
                scale(${depthScale})
              `,
              zIndex,
              pointerEvents: 'none',
              filter: `blur(${p.z < 0 ? Math.abs(p.z) / 200 : 0}px)`,
            }}
          >
            {renderFlower(p.type)}
          </div>
        );
      })}
    </div>
  );
};

export default WeddingPetalsBackground;