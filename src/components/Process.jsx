import React from 'react';
import { Target, HardDrive, Edit3, ShieldAlert, Rocket } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      step: "01",
      icon: <Target size={20} />,
      title: "Define Goal",
      description: "Analyzing wireframes, product specs, and core workflows to establish layout requirements and milestones."
    },
    {
      step: "02",
      icon: <HardDrive size={20} />,
      title: "Architect Scheme",
      description: "Modeling localized data stores (Hive/SQLite), state management layers (BLoC), and REST API route interfaces."
    },
    {
      step: "03",
      icon: <Edit3 size={20} />,
      title: "Build System",
      description: "Writing clean, structured Dart files and building custom integrations with push notifications."
    },
    {
      step: "04",
      icon: <ShieldAlert size={20} />,
      title: "Device Testing",
      description: "Executing integration tests, testing push payloads, and validating UI layouts on Android and iOS devices."
    },
    {
      step: "05",
      icon: <Rocket size={20} />,
      title: "Release & Support",
      description: "Publishing releases, monitoring crash metrics, and configuring over-the-air updates."
    }
  ];

  return (
    <section id="process" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Workflow</span>
          <h2 className="section-title">Development Process</h2>
        </div>

        <div className="process-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="glass-card process-card">
              <span className="process-step">{step.step}</span>
              <div 
                className="service-icon" 
                style={{ 
                  margin: '0 auto 1rem auto', 
                  padding: '0.8rem', 
                  borderRadius: '50%',
                  background: 'var(--accent-muted)',
                  color: 'var(--accent-color)'
                }}
              >
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
