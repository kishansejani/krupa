import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    // Only enable on pointer fine devices (non-touch)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animationFrame;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, select, .term-btn, .tab-btn, .tilt-card');
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = (e) => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);

      // Create spark particles
      const newSparks = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        size: Math.random() * 6 + 3,
        alpha: 1
      }));

      setSparks((prev) => [...prev, ...newSparks]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    // Smooth trailing animation loop
    const followCursor = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2
      }));
      animationFrame = requestAnimationFrame(followCursor);
    };

    animationFrame = requestAnimationFrame(followCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrame);
    };
  }, [position.x, position.y]);

  // Clean up old sparks
  useEffect(() => {
    if (sparks.length === 0) return;
    const timer = setTimeout(() => {
      setSparks((prev) => prev.filter((s) => Date.now() - s.id < 600));
    }, 100);
    return () => clearTimeout(timer);
  }, [sparks]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Inner Precision Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--accent-color)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${isClicked ? 1.8 : isHovered ? 1.4 : 1})`,
          transition: 'transform 0.15s ease, background-color 0.2s ease',
          boxShadow: '0 0 10px var(--accent-glow)'
        }}
      />

      {/* Outer Glowing Ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '46px' : '28px',
          height: isHovered ? '46px' : '28px',
          border: '1.5px solid var(--accent-color)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: `translate3d(${trailingPos.x - (isHovered ? 23 : 14)}px, ${trailingPos.y - (isHovered ? 23 : 14)}px, 0) scale(${isClicked ? 0.8 : 1})`,
          backgroundColor: isHovered ? 'var(--accent-muted)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px var(--accent-glow)' : 'none',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease'
        }}
      />

      {/* Spark Particle Explosion */}
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="cursor-spark"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: 'var(--accent-secondary)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9997,
            transform: `translate3d(${spark.x + spark.vx * 4}px, ${spark.y + spark.vy * 4}px, 0)`,
            opacity: Math.max(0, 1 - (Date.now() - spark.id) / 600),
            boxShadow: '0 0 8px var(--accent-color)',
            transition: 'transform 0.6s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.6s ease'
          }}
        />
      ))}
    </>
  );
}
