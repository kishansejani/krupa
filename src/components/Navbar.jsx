import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Send } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Case Study', href: '#case-study' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          KRUPA<span className="logo-dot">.</span>
          <span className="live-ping-dot" title="Available for Opportunities" />
        </div>
        
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href}
                className={activeSection === item.href.slice(1) ? 'active' : ''}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <a href="#contact" className="btn btn-primary nav-cta glow-pulse-btn" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
            Let's Talk <Send size={14} />
          </a>

          <button onClick={() => setIsOpen(!isOpen)} className="menu-btn" aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <style>{`
        .live-ping-dot {
          width: 8px;
          height: 8px;
          background-color: var(--accent-color);
          border-radius: 50%;
          display: inline-block;
          position: relative;
          box-shadow: 0 0 10px var(--accent-color);
          margin-left: 2px;
        }
        .live-ping-dot::after {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border: 1.5px solid var(--accent-color);
          border-radius: 50%;
          animation: pingPulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes pingPulse {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        .glow-pulse-btn {
          box-shadow: 0 0 15px var(--accent-glow);
          transition: all 0.3s ease;
        }
        .glow-pulse-btn:hover {
          box-shadow: 0 0 25px var(--accent-color);
          transform: translateY(-2px);
        }
      `}</style>
    </nav>
  );
}
