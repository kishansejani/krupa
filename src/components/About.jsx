import React from 'react';
import { Smartphone, Shield, Code, Award, CheckCircle } from 'lucide-react';
import TiltCard from './TiltCard';

export default function About() {
  const coreAnchors = [
    {
      icon: <Smartphone size={24} />,
      title: "Cross-Platform Precision",
      description: "Crafting beautiful, high-fidelity iOS and Android interfaces from a single Dart codebase with native execution speed."
    },
    {
      icon: <Shield size={24} />,
      title: "Clean Architecture",
      description: "Structuring codebases using clean patterns (BLoC, Provider, Repository pattern) for readability, testing, and scalability."
    },
    {
      icon: <Code size={24} />,
      title: "Integration Expertise",
      description: "Connecting mobile experiences to backend systems via secure RESTful APIs, third-party SDKs, and real-time Firebase services."
    }
  ];

  const stats = [
    { value: "2+", label: "Years Exp" },
    { value: "10+", label: "Apps Shipped" },
    { value: "100%", label: "Satisfaction" },
    { value: "99.9%", label: "Crash-free Rate" }
  ];

  return (
    <section id="about" className="section" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Biography</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          <div className="about-bio">
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
              Building the Future of Mobile Innovation
            </h3>
            <p>
              I am a Flutter Developer passionate about designing and shipping cross-platform mobile apps. With hands-on experience across multiple branded deployments, I excel at turning complex product wireframes into fluid, responsive, and production-ready applications.
            </p>
            <p>
              From CRM and society management apps to local delivery portals, my work highlights a deep commitment to clean structure, performance optimizations, and offline-first functionalities. I thrive in collaborative environments where performance, accessibility, and clean architecture are top priorities.
            </p>
            
            <div className="about-info-grid">
              <div className="info-item">
                <span>Location</span>
                <strong>Vadodara, Gujarat</strong>
              </div>
              <div className="info-item">
                <span>Email</span>
                <strong>krupasejani104@gmail.com</strong>
              </div>
              <div className="info-item">
                <span>Phone</span>
                <strong>+91 93130 47009</strong>
              </div>
              <div className="info-item">
                <span>Current Role</span>
                <strong>Flutter App Developer</strong>
              </div>
            </div>
          </div>

          <div className="about-cards">
            {coreAnchors.map((anchor, idx) => (
              <TiltCard key={idx} className="glass-card about-card">
                <div className="about-card-icon">
                  {anchor.icon}
                </div>
                <div className="about-card-info">
                  <h3>{anchor.title}</h3>
                  <p>{anchor.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        <div className="stats-container">
          {stats.map((stat, idx) => (
            <TiltCard key={idx} className="glass-card stat-item">
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
