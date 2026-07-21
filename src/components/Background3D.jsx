import React, { useEffect, useRef } from 'react';

export default function Background3D({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class for 3D simulation
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        // Position in 3D space
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.z = Math.random() * 2000; // Depth
        this.size = Math.random() * 2 + 1;
        
        // Speed in 3D space
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = -Math.random() * 1.5 - 0.5; // Moving forward towards the viewer
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Reset if it gets too close or goes past the screen
        if (this.z <= 0) {
          this.reset();
          this.z = 2000;
        }
      }

      draw(ctx, width, height, mouseX, mouseY, color) {
        // Project 3D coordinates to 2D screen
        const fov = 400; // Field of view
        const scale = fov / (fov + this.z);
        
        // Add parallax effect from mouse
        const projX = (this.x + (mouseX - width / 2) * 0.1) * scale + width / 2;
        const projY = (this.y + (mouseY - height / 2) * 0.1) * scale + height / 2;

        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          const alpha = (1 - this.z / 2000) * 0.8;
          ctx.beginPath();
          ctx.arc(projX, projY, this.size * scale * 2, 0, Math.PI * 2);
          ctx.fillStyle = color.replace('1)', `${alpha})`);
          ctx.fill();
        }
      }
    }

    // Initialize particles
    const particleCount = 180;
    const particles = Array.from({ length: particleCount }, () => new Particle());

    // Mouse coordinates
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Dynamic color depending on theme
    const getThemeColors = () => {
      return theme === 'dark' 
        ? 'rgba(102, 252, 241, 1)'  // Glowing Cyan for Dark Mode
        : 'rgba(13, 148, 136, 1)';   // Deep Teal for Light Mode
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const color = getThemeColors();

      // Connect particles that are close in 3D projection space
      const screenPoints = [];

      particles.forEach((p) => {
        p.update();
        p.draw(ctx, width, height, mouseX, mouseY, color);

        // Store projected screen coordinates for connecting lines
        const fov = 400;
        const scale = fov / (fov + p.z);
        const projX = (p.x + (mouseX - width / 2) * 0.1) * scale + width / 2;
        const projY = (p.y + (mouseY - height / 2) * 0.1) * scale + height / 2;
        
        screenPoints.push({ x: projX, y: projY, z: p.z });
      });

      // Draw constellation lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < screenPoints.length; i++) {
        for (let j = i + 1; j < screenPoints.length; j++) {
          const dx = screenPoints[i].x - screenPoints[j].x;
          const dy = screenPoints[i].y - screenPoints[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Only connect if close on screen AND close in depth
          if (dist < 100 && Math.abs(screenPoints[i].z - screenPoints[j].z) < 150) {
            const alpha = (1 - screenPoints[i].z / 2000) * (1 - dist / 100) * 0.25;
            ctx.beginPath();
            ctx.moveTo(screenPoints[i].x, screenPoints[i].y);
            ctx.lineTo(screenPoints[j].x, screenPoints[j].y);
            ctx.strokeStyle = color.replace('1)', `${alpha})`);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
}
