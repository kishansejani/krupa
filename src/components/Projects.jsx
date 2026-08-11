import React, { useState } from 'react';
import { ExternalLink, Layers } from 'lucide-react';
import TiltCard from './TiltCard';

const GithubIcon = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const projectsData = [
    {
      title: "LinkArise CRM App",
      subtitle: "Service, Lead, Task, Sales & Location Management — All-in-One",
      description: "Unified CRM system covering lead tracking, client scheduling, task management, sales reporting, and employee location tracking. Integrates real-time notifications using Firebase Cloud Messaging.",
      tags: ["Flutter", "Dart", "Background Location", "Firebase FCM", "REST APIs", "Hive DB"],
      category: "crm",
      demoLink: "#",
      githubLink: "#",
      featureBox: {
        title: "⚙️ BACKGROUND LOCATION TRACKING ENGINE",
        features: [
          { icon: "📍", title: "1-Min GPS Fetch", text: "Automatically fetches device location every 1 minute" },
          { icon: "💾", title: "Local Persistence", text: "Stores lat, lng, accuracy, timestamp & user ID locally" },
          { icon: "☁️", title: "5-Min Server Sync", text: "Uploads accumulated location records every 5 minutes" },
          { icon: "🔄", title: "Background Service", text: "Continuous tracking while app is in background (Android/iOS)" },
          { icon: "🔐", title: "Explicit Rationale", text: "Asks user for permission with clear explanation" },
          { icon: "📊", title: "Manager History", text: "Server maintains location history for authorized managers" }
        ]
      }
    },
    {
      title: "LinkArise Telecalling CRM",
      subtitle: "CRM with In-App Calling & Analytics",
      description: "Telecalling client featuring SIM-based dialer routing, lead logs, follow-up scheduler, and automatic call duration analytics. Supports customizable light/dark themes.",
      tags: ["Flutter", "Dart", "Local Storage", "Method Channels"],
      category: "crm",
      demoLink: "#",
      githubLink: "#",
      featureBox: {
        title: "📞 TELECALLING & ANALYTICS ENGINE",
        features: [
          { icon: "📱", title: "SIM Dialer Routing", text: "Direct SIM call routing via native Method Channels" },
          { icon: "📋", title: "Lead Log Tracking", text: "Real-time call status updates and activity history" },
          { icon: "⏰", title: "Follow-up Scheduler", text: "Automated call reminders & follow-up queue engine" },
          { icon: "📊", title: "Call Duration Analytics", text: "Automatic call duration logging and agent performance metrics" },
          { icon: "💾", title: "Offline Storage", text: "Hive DB local storage for uninterrupted telecalling work" },
          { icon: "🎨", title: "Dynamic UI Themes", text: "Customizable light & dark themes tailored for day/night shifts" }
        ]
      }
    },
    {
      title: "Forage Delivery App",
      subtitle: "Customer Delivery Interface",
      description: "Customer-facing delivery application supporting real-time shopping cart management, recurring food/grocery subscriptions, secure transactions, and SMS/OTP verification.",
      tags: ["Flutter", "Dart", "Firebase Auth", "RazorPay SDK"],
      category: "delivery",
      demoLink: "#",
      githubLink: "#",
      featureBox: {
        title: "🛒 DELIVERY & CHECKOUT ENGINE",
        features: [
          { icon: "🛍️", title: "Real-time Cart", text: "Instant cart management with automated price calculations" },
          { icon: "📅", title: "Subscriptions", text: "Recurring food & grocery subscription scheduling" },
          { icon: "💳", title: "RazorPay Gateway", text: "Secure multi-payment transaction gateway integration" },
          { icon: "🔑", title: "SMS / OTP Auth", text: "Instant phone number authentication & Firebase verification" },
          { icon: "🚀", title: "Live Order Status", text: "Real-time order tracking from kitchen to doorstep" },
          { icon: "⭐", title: "Ratings & Reviews", text: "User feedback system with itemized ratings" }
        ]
      }
    },
    {
      title: "Aiik Society Management App",
      subtitle: "Community Portal & Ledger Tracker",
      description: "Society billing app handling expense logging, maintenance payments, notice boards, complaint ticketing, document uploads, and structured membership listings.",
      tags: ["Flutter", "Dart", "PDF Generator", "Hive Database"],
      category: "society",
      demoLink: "#",
      githubLink: "#",
      featureBox: {
        title: "🏢 SOCIETY MANAGEMENT & LEDGER ENGINE",
        features: [
          { icon: "🧾", title: "Maintenance Billing", text: "Automated invoice generation & payment tracking" },
          { icon: "📜", title: "Digital Notice Board", text: "Real-time community announcements & push alerts" },
          { icon: "🎫", title: "Complaint Ticketing", text: "Structured resolution system for member grievances" },
          { icon: "📄", title: "PDF Receipt Generator", text: "Instant generation of downloadable payment receipts" },
          { icon: "📁", title: "Document Vault", text: "Secure society rulebooks & member document storage" },
          { icon: "👥", title: "Member Directory", text: "Categorized resident list with contact permissions" }
        ]
      }
    },
    {
      title: "Forage Delivery Partner App",
      subtitle: "Driver Portal & Routing System",
      description: "App tailored for delivery partners. Supports real-time GPS location tracking, delivery order dispatch notifications, historical payouts, and profile status toggles.",
      tags: ["Flutter", "Dart", "Google Maps API", "REST APIs"],
      category: "delivery",
      demoLink: "#",
      githubLink: "#",
      featureBox: {
        title: "🚴 DRIVER ROUTING & DISPATCH ENGINE",
        features: [
          { icon: "🗺️", title: "Live GPS Tracking", text: "Google Maps API integration for active route guidance" },
          { icon: "🔔", title: "Dispatch Alerts", text: "Instant order dispatch notifications for nearby drivers" },
          { icon: "💰", title: "Payout Tracking", text: "Historical earnings summary and instant withdrawal requests" },
          { icon: "🟢", title: "Status Toggle", text: "Online/Offline availability status for order assignments" },
          { icon: "📦", title: "Proof of Delivery", text: "Photo upload & OTP confirmation upon delivery completion" },
          { icon: "📊", title: "Trip Analytics", text: "Daily distance traveled and delivery completion rates" }
        ]
      }
    },
    {
      title: "Student Visa Process App",
      subtitle: "Document Vault & Tracking Portal",
      description: "Visa management app supporting document upload, aptitude assessment, real-time application trackers, work history, college filters, and course catalog search.",
      tags: ["Flutter", "Dart", "File Picker", "State Management"],
      category: "society",
      demoLink: "#",
      githubLink: "#",
      featureBox: {
        title: "🎓 VISA TRACKING & DOCUMENT VAULT",
        features: [
          { icon: "📂", title: "Document Vault", text: "Encrypted file upload & verification status tracker" },
          { icon: "🎯", title: "Aptitude Assessment", text: "Interactive eligibility quiz & score evaluator" },
          { icon: "📌", title: "Application Tracker", text: "Stage-by-stage visa progress updates in real-time" },
          { icon: "🏛️", title: "University Search", text: "Comprehensive college catalog with fee & course filters" },
          { icon: "💼", title: "Work History Log", text: "Structured employment & academic background builder" },
          { icon: "🔔", title: "Milestone Alerts", text: "Automated deadline notifications for visa steps" }
        ]
      }
    },
    {
      title: "Venue Booking App",
      subtitle: "Slot Reservation & Payment Portal",
      description: "Interactive venue discovery app featuring dynamic date pickers, slot scheduling engine, map distance filtering, user reviews, and online booking receipts.",
      tags: ["Flutter", "Dart", "Stripe API", "Google Maps"],
      category: "society",
      demoLink: "#",
      githubLink: "#",
      featureBox: {
        title: "🎟️ RESERVATION & PAYMENT ENGINE",
        features: [
          { icon: "📅", title: "Dynamic Slot Picker", text: "Interactive date & hourly slot selection interface" },
          { icon: "💳", title: "Stripe Payments", text: "Seamless online booking transactions & deposit holds" },
          { icon: "📍", title: "Distance Filter", text: "Google Maps integration to find venues by radius" },
          { icon: "🧾", title: "Digital Receipts", text: "Instant booking confirmation & QR code entry pass" },
          { icon: "⭐", title: "User Reviews", text: "Verified guest ratings and photo review galleries" },
          { icon: "🛡️", title: "Cancellation Policy", text: "Automated refund processing based on venue rules" }
        ]
      }
    },
    {
      title: "Forage Distributor App",
      subtitle: "Inventory & Wholesaler Management",
      description: "Internal supply chain tracker helping distributors raise purchase orders, register retailers, monitor current stock volumes, and log payment transactions.",
      tags: ["Flutter", "Dart", "SQLite DB", "Excel Export"],
      category: "delivery",
      demoLink: "#",
      githubLink: "#",
      featureBox: {
        title: "📦 INVENTORY & SUPPLY CHAIN ENGINE",
        features: [
          { icon: "📑", title: "Purchase Orders", text: "Bulk order generation and supplier dispatch tracking" },
          { icon: "🏪", title: "Retailer Registry", text: "Database of registered shop owners and credit limits" },
          { icon: "📊", title: "Stock Volume Monitor", text: "Real-time inventory levels with low-stock warnings" },
          { icon: "💵", title: "Payment Ledger", text: "Transaction logging with offline SQLite DB support" },
          { icon: "📊", title: "Excel Export", text: "One-click export of sales reports and inventory logs" },
          { icon: "🔄", title: "Auto-Reorder Queue", text: "Automated stock replenishment suggestions" }
        ]
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'crm', name: 'CRM & Business' },
    { id: 'delivery', name: 'Delivery Apps' },
    { id: 'society', name: 'Society & Utilities' }
  ];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <div className="projects-filter">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <TiltCard key={idx} className="glass-card project-card">
              <div>
                <div className="project-tags">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="project-tag">{tag}</span>
                  ))}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-color)', marginBottom: '0.8rem', fontWeight: 500 }}>
                  {project.subtitle}
                </h4>
                <p className="project-description">{project.description}</p>

                {project.featureBox && (
                  <div className="project-location-features">
                    <div className="location-features-title">
                      {project.featureBox.title}
                    </div>
                    <div className="location-features-grid">
                      {project.featureBox.features.map((feat, fIdx) => (
                        <div key={fIdx} className="location-feature-pill">
                          <strong>{feat.icon} {feat.title}</strong>
                          <span>{feat.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="project-links">
                <a href={project.githubLink} className="project-link" target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={16} /> Repository
                </a>
                <a href={project.demoLink} className="project-link" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} /> Live Demo
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
