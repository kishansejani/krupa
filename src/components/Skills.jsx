import React, { useState } from 'react';
import { Code2, Cpu, HelpCircle, Laptop, Settings } from 'lucide-react';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('languages');

  const skillsData = {
    languages: [
      { name: "Flutter SDK", level: 95 },
      { name: "Dart Programming", level: 92 },
      { name: "Xcode Toolchain", level: 80 },
      { name: "Objective-C / Swift", level: 60 },
    ],
    platforms: [
      { name: "iOS Deployment", level: 88 },
      { name: "Android SDK", level: 85 },
      { name: "Mobile Web Integration", level: 75 },
      { name: "macOS Desktop Support", level: 70 },
    ],
    integrations: [
      { name: "RESTful API Integration", level: 95 },
      { name: "Firebase (Auth, DB, Firestore)", level: 90 },
      { name: "Firebase Cloud Messaging (FCM)", level: 92 },
      { name: "Third-Party SDKs & Plugins", level: 90 },
    ],
    tools: [
      { name: "Git & Version Control", level: 90 },
      { name: "State Management (BLoC/Provider)", level: 95 },
      { name: "Clean Architecture Patterns", level: 92 },
      { name: "Local Storage (Shared Preferences, Hive)", level: 88 },
    ]
  };

  const tabs = [
    { id: 'languages', label: 'Languages & Frameworks' },
    { id: 'platforms', label: 'Platforms' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'tools', label: 'Tools & Practices' },
  ];

  const technologies = [
    { name: "Flutter", category: "Core" },
    { name: "Dart", category: "Core" },
    { name: "iOS", category: "Platform" },
    { name: "Android", category: "Platform" },
    { name: "Firebase", category: "Backend" },
    { name: "REST APIs", category: "Network" },
    { name: "Git", category: "DevOps" },
    { name: "Xcode", category: "IDE" },
    { name: "Android Studio", category: "IDE" },
    { name: "SQLite / Hive", category: "Storage" },
    { name: "BLoC", category: "Architecture" },
    { name: "Provider", category: "Architecture" },
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Expertise</span>
          <h2 className="section-title">My Skills</h2>
        </div>

        <div className="skills-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {skillsData[activeTab].map((skill, idx) => (
            <div key={idx} className="skill-bar-container">
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar-bg">
                <div 
                  className="skill-bar-fill" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="tech-section">
          <h3>Technologies I Work With</h3>
          <div className="tech-grid">
            {technologies.map((tech, idx) => (
              <div key={idx} className="tech-tag">
                <Code2 size={16} className="tech-icon" />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
