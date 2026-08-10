import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to Top"
      className="scroll-to-top-btn"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        backgroundColor: 'var(--accent-color)',
        color: '#ffffff',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 20px var(--accent-glow)',
        zIndex: 999,
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        animation: 'fadeInUp 0.3s ease-out forwards'
      }}
    >
      <ArrowUp size={22} className="arrow-icon" />

      <style>{`
        .scroll-to-top-btn:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 25px var(--accent-color);
          background-color: var(--accent-color);
        }
        .scroll-to-top-btn:active {
          transform: translateY(-1px) scale(0.95);
        }
        .arrow-icon {
          transition: transform 0.3s ease;
        }
        .scroll-to-top-btn:hover .arrow-icon {
          transform: translateY(-3px);
        }
      `}</style>
    </button>
  );
}
