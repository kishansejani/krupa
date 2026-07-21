import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw, Trash2, ArrowRight } from 'lucide-react';

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
          timer = setTimeout(tick, 2000); // Wait before starting delete
        } else {
          timer = setTimeout(tick, 100);
        }
      } else {
        setTypedText(currentRole.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setRoleIndex((prev) => (prev + 1) % roles.length);
          timer = setTimeout(tick, 500); // Pause before next word
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
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="hero-greeting">Welcome to my space</span>
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
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              Explore Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>

        <div className="terminal-widget">
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
        </div>
      </div>
      
      <style>{`
        @keyframes blink {
          from, to { color: transparent }
          50% { color: var(--accent-color) }
        }
      `}</style>
    </section>
  );
}
