import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function SparkleBurst() {
  const [particles, setParticles] = useState([]);

  const triggerBurst = () => {
    const symbols = ['💕', '💖', '✨', '🌸', '💖', '✨', '⚡'];
    const newParticles = Array.from({ length: 16 }).map((_, i) => {
      const startX = window.innerWidth - 70 + (Math.random() - 0.5) * 30;
      const startY = window.innerHeight - 70 + (Math.random() - 0.5) * 30;
      return {
        id: Date.now() + i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 200,
        vy: -Math.random() * 250 - 100, // float upwards
        scale: Math.random() * 0.6 + 0.8,
        rotate: (Math.random() - 0.5) * 60
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up after animation finishes
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 1500);
  };

  return (
    <>
      {/* Floating Burst Button */}
      <button
        onClick={triggerBurst}
        title="Send Pink Sparkles & Love!"
        className="sparkle-burst-btn"
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '75px', // Next to back-to-top button
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-color)',
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px var(--accent-glow)',
          zIndex: 999,
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s ease'
        }}
      >
        <Sparkles size={20} className="sparkle-icon" />
      </button>

      {/* Render Particles Floating across Screen */}
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'fixed',
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${18 * p.scale}px`,
            pointerEvents: 'none',
            zIndex: 9999,
            transform: `translate3d(${p.vx * 1.2}px, ${p.vy * 1.2}px, 0) rotate(${p.rotate}deg)`,
            opacity: 0,
            transition: 'transform 1.4s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.4s ease-out'
          }}
          ref={(el) => {
            if (el) {
              requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = `translate3d(${p.vx * 2.5}px, ${p.vy * 2.5 - 100}px, 0) rotate(${p.rotate * 2}deg) scale(1.3)`;
              });
            }
          }}
        >
          {p.symbol}
        </span>
      ))}

      <style>{`
        .sparkle-burst-btn:hover {
          transform: scale(1.15) rotate(12deg);
          box-shadow: 0 6px 20px var(--accent-glow);
        }
        .sparkle-burst-btn:active {
          transform: scale(0.95);
        }
        .sparkle-icon {
          animation: pulseSparkle 2s ease-in-out infinite;
        }
        @keyframes pulseSparkle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2) rotate(15deg); }
        }
      `}</style>
    </>
  );
}
