import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ChevronDown } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "What makes Flutter superior to standard Native app development?",
      a: "Flutter allows us to compile native iOS and Android apps from a single codebase, which reduces developer maintenance costs by up to 50% while guaranteeing consistent UI styling and 60 FPS performance."
    },
    {
      q: "Are you open to freelance projects or full-time opportunities?",
      a: "Yes! I am actively looking for full-time Flutter developer roles and remote freelance projects. I would be happy to discuss how I can help bring your mobile ideas to life."
    },
    {
      q: "Can you handle App Store and Play Store releases?",
      a: "Absolutely. I configure provisioning profiles, app identifiers, release signing certificates, Android bundles, and manage submissions to both Apple App Store Connect and Google Play Console."
    },
    {
      q: "What state management tools do you prefer?",
      a: "For large scalable CRM apps, I prefer Flutter BLoC due to its strict unidirectional flow and testability. For simpler apps or utilities, I use Provider for lightweight and fast prototyping."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been simulated successfully.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Reach Out</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-highlight)' }}>
              Let's build something epic!
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Have an idea for a mobile application, CRM portal, or custom software dashboard? Reach out directly using the form or standard contact channels.
            </p>

            <div className="contact-card">
              <div className="contact-icon">
                <Mail size={20} />
              </div>
              <div className="contact-details">
                <span>Email Address</span>
                <a href="mailto:krupasejani104@gmail.com">krupasejani104@gmail.com</a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Phone size={20} />
              </div>
              <div className="contact-details">
                <span>Call / WhatsApp</span>
                <a href="tel:+919313047009">+91 93130 47009</a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <MapPin size={20} />
              </div>
              <div className="contact-details">
                <span>Current Location</span>
                <p>Vadodara, Gujarat, India</p>
              </div>
            </div>
          </div>

          <div className="glass-card contact-form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="form-control"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  className="form-control"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
              >
                <button className="faq-question" onClick={() => toggleFaq(idx)}>
                  {faq.q}
                  <ChevronDown size={18} className="faq-icon" />
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
