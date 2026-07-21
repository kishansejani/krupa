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
        <div className="logo">
          KRUPA<span>.</span>
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
          
          <a href="#contact" className="btn btn-primary nav-cta" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
            Let's Talk <Send size={14} />
          </a>

          <button onClick={() => setIsOpen(!isOpen)} className="menu-btn" aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
