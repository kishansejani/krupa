import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw, Trash2, ArrowRight, Smartphone, Zap, ShieldCheck, Flame } from 'lucide-react';
import TiltCard from './TiltCard';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "Cross-Platform App Architect",
    "Flutter & Dart Developer",
    "Clean Code Advocate",
    "Firebase Integrator"
  ];
  
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'input', cmd: 'flutter doctor' },
    { type: 'output', content: `[✓] Flutter (Channel stable, 3.22.2, on macOS 14.5, locale en-IN)\n[✓] Android toolchain - develop for Android devices (Android SDK 34)\n[✓] Xcode - develop for iOS and macOS (Xcode 15.4)\n[✓] Connected device (2 available)\n\n• No issues found!` }
  ]);

  // Typing effect for subtitle
  useEffect(() => {
    let currentRole = roles[roleIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const tick = () => {
      if (!isDeleting) {
        setTypedText(currentRole.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentRole.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2000);
        } else {
          timer = setTimeout(tick, 100);
        }
      } else {
        setTypedText(currentRole.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setRoleIndex((prev) => (prev + 1) % roles.length);
          timer = setTimeout(tick, 500);
        } else {
          timer = setTimeout(tick, 50);
        }
      }
    };

    tick();
    return () => clearTimeout(timer);
  }, [roleIndex]);

  const runCommand = (cmd) => {
    let output = '';
    if (cmd === 'flutter doctor') {
      output = `[✓] Flutter (Channel stable, 3.22.2, on macOS 14.5, locale en-IN)\n[✓] Android toolchain - develop for Android devices (Android SDK 34)\n[✓] Xcode - develop for iOS and macOS (Xcode 15.4)\n[✓] Connected device (2 available)\n\n• No issues found!`;
    } else if (cmd === 'cat profile.json') {
      output = JSON.stringify({
        name: "Krupa Sejani",
        role: "Flutter Developer",
        location: "Vadodara, Gujarat",
        experience: "Arth Technology, Vadodara",
        apps_shipped: "10+ production apps",
        specialties: ["Clean Architecture", "REST APIs", "Firebase Real-time", "Push Notifications"]
      }, null, 2);
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      return;
    }

    setTerminalHistory(prev => [
      ...prev,
      { type: 'input', cmd },
      { type: 'output', content: output }
    ]);
  };

  return (
    <section id="home" className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Glowing Pink Mesh Blobs */}
      <div className="ambient-blob blob-1" />
      <div className="ambient-blob blob-2" />

      <div className="container hero-grid">
        <div className="hero-content">
          <span className="hero-greeting glow-badge">
            <Flame size={14} style={{ color: 'var(--accent-color)', marginRight: '6px' }} />
            Welcome to my space
          </span>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Krupa Sejani</span>
          </h1>
          <h2 style={{ fontSize: '1.8rem', height: '2.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
            <span style={{ color: 'var(--text-highlight)' }}>{typedText}</span>
            <span style={{ color: 'var(--accent-color)', animation: 'blink 1s step-end infinite' }}>|</span>
          </h2>
          <p className="hero-description">
            Flutter Developer with hands-on experience designing, building, and shipping 10+ production mobile applications. Specializing in robust architectures, push notifications, and seamless offline-first experiences.
          </p>

          {/* Quick Hero Stat Chips */}
          <div className="hero-stats-row">
            <div className="hero-stat-chip">
              <Smartphone size={18} style={{ color: 'var(--accent-color)' }} />
              <div>
                <strong>10+</strong>
                <span>Apps Shipped</span>
              </div>
            </div>
            <div className="hero-stat-chip">
              <Zap size={18} style={{ color: 'var(--accent-secondary)' }} />
              <div>
                <strong>2+ Years</strong>
                <span>Flutter & Dart</span>
              </div>
            </div>
            <div className="hero-stat-chip">
              <ShieldCheck size={18} style={{ color: 'var(--accent-color)' }} />
              <div>
                <strong>100%</strong>
                <span>Clean Code</span>
              </div>
            </div>
          </div>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary glow-btn">
              Explore Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Floating Floating Glass Badges */}
          <div className="floating-badge badge-top-left">
            <Smartphone size={16} /> 10+ Apps Live
          </div>
          <div className="floating-badge badge-bottom-right">
            ⚡ Flutter 3.22
          </div>

          <TiltCard className="terminal-widget">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="term-dot red"></span>
                <span className="term-dot yellow"></span>
                <span className="term-dot green"></span>
              </div>
              <div className="terminal-title">krupasejani@console: ~</div>
              <TerminalIcon size={16} style={{ color: '#8b949e' }} />
            </div>
            <div className="terminal-body">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className="terminal-line">
                  {line.type === 'input' ? (
                    <>
                      <span className="terminal-prompt">krupasejani:~$ </span>
                      <span className="terminal-cmd">{line.cmd}</span>
                    </>
                  ) : (
                    <pre className="terminal-output">{line.content}</pre>
                  )}
                </div>
              ))}
            </div>
            <div className="terminal-controls">
              <button onClick={() => runCommand('flutter doctor')} className="term-btn">
                flutter doctor
              </button>
              <button onClick={() => runCommand('cat profile.json')} className="term-btn">
                cat profile.json
              </button>
              <button onClick={() => runCommand('clear')} className="term-btn" title="Clear terminal">
                <Trash2 size={14} />
              </button>
            </div>
          </TiltCard>
        </div>
      </div>
      
      <style>{`
        @keyframes blink {
          from, to { color: transparent }
          50% { color: var(--accent-color) }
        }
        
        .ambient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          pointer-events: none;
          z-index: 0;
          animation: floatBlob 12s ease-in-out infinite alternate;
        }
        .blob-1 {
          width: 320px;
          height: 320px;
          background: var(--accent-color);
          top: -50px;
          left: -50px;
        }
        .blob-2 {
          width: 380px;
          height: 380px;
          background: var(--accent-secondary);
          bottom: -80px;
          right: -50px;
          animation-delay: -6s;
        }
        @keyframes floatBlob {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
          100% { transform: translate(-20px, 30px) scale(0.95); }
        }

        .glow-badge {
          display: inline-flex;
          align-items: center;
          background: var(--accent-muted);
          color: var(--accent-color);
          border: 1px solid var(--glass-border);
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 1.2rem;
          box-shadow: 0 4px 12px var(--accent-muted);
        }

        .hero-stats-row {
          display: flex;
          gap: 1.2rem;
          margin: 1.5rem 0 2rem 0;
          flex-wrap: wrap;
        }
        .hero-stat-chip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--glass-bg);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-color);
          padding: 0.6rem 1.1rem;
          border-radius: 14px;
          transition: all 0.3s ease;
        }
        .hero-stat-chip:hover {
          border-color: var(--accent-color);
          transform: translateY(-3px);
          box-shadow: 0 6px 16px var(--accent-glow);
        }
        .hero-stat-chip strong {
          display: block;
          font-size: 1rem;
          color: var(--text-highlight);
          line-height: 1.2;
        }
        .hero-stat-chip span {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .floating-badge {
          position: absolute;
          z-index: 10;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border: 1px solid var(--accent-color);
          color: var(--text-highlight);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 8px 24px var(--accent-glow);
          animation: badgeFloat 4s ease-in-out infinite alternate;
        }
        .badge-top-left {
          top: -20px;
          left: -15px;
        }
        .badge-bottom-right {
          bottom: -15px;
          right: -15px;
          animation-delay: -2s;
        }
        @keyframes badgeFloat {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }

        .glow-btn {
          box-shadow: 0 0 20px var(--accent-glow);
          transition: all 0.3s ease;
        }
        .glow-btn:hover {
          box-shadow: 0 0 30px var(--accent-color);
        }
      `}</style>
    </section>
  );
}
