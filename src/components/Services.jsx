import React from 'react';
import { Smartphone, Cpu, Cloud, Settings, Layers, PlaySquare } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Smartphone size={24} />,
      title: "Cross-Platform App Dev",
      description: "Developing robust, native-quality Android and iOS apps from a single codebase using Flutter and Dart, reducing development costs and time-to-market."
    },
    {
      icon: <Cpu size={24} />,
      title: "REST API Integration",
      description: "Connecting apps to existing backend web services with clean JSON parsing, structured HTTP clients, request interceptors, and error handling."
    },
    {
      icon: <Cloud size={24} />,
      title: "Firebase Cloud Services",
      description: "Integrating secure Firebase solutions including Authentication, Cloud Firestore, Realtime Database, Cloud Storage, and Analytics."
    },
    {
      icon: <Settings size={24} />,
      title: "Push Notification Systems",
      description: "Setting up background messaging and rich push notifications through FCM (Firebase Cloud Messaging) and Apple Push Notification service (APNs)."
    },
    {
      icon: <Layers size={24} />,
      title: "App State Management",
      description: "Implementing optimized architectures using BLoC or Provider to decouple business logic from UI, resulting in highly responsive interactions."
    },
    {
      icon: <PlaySquare size={24} />,
      title: "App Store Publishing",
      description: "Handling the entire release cycle: from setting up Developer Accounts and provisioning profiles, to building, uploading, and beta testing via TestFlight."
    }
  ];

  return (
    <section id="services" className="section" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Services</span>
          <h2 className="section-title">What I Offer</h2>
        </div>

        <div className="services-grid">
          {services.map((service, idx) => (
            <div key={idx} className="glass-card service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
