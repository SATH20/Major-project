'use client';

import { useEffect, useState } from 'react';

export default function BackgroundGrid() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 4 + 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {/* Gradient overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1F] via-[#0D1428] to-[#0A0F1F]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4F7FFF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9B6BFF]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4F7FFF]/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `
            linear-gradient(rgba(79, 127, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 127, 255, 0.5) 1px, transparent 1px)
          `, 
          backgroundSize: '60px 60px' 
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-[#4F7FFF]/30 particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Scan line effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(79, 127, 255, 0.1) 2px, rgba(79, 127, 255, 0.1) 4px)',
          }}
        />
      </div>
    </>
  );
}
