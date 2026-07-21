import React from 'react';

export default function Timeline() {
  const timelineData = [
    {
      type: "work",
      date: "2025 – Present",
      role: "Flutter App Developer",
      company: "Arth Technology, Vadodara",
      details: [
        "Design, build, and deploy a portfolio of production Flutter apps — including CRM, telecalling, delivery, distributor, and society management apps — for Android and iOS.",
        "Integrate REST APIs and Firebase (authentication, push notifications, real-time updates) to power core app features.",
        "Reuse and adapt a shared CRM codebase to ship multiple branded apps efficiently.",
        "Publish apps to the App Store and Play Store, writing clean, modular, and maintainable code throughout."
      ],
      side: "left"
    },
    {
      type: "training",
      date: "May 2024 – Dec 2024",
      role: "Professional Flutter Development Course",
      company: "Weltec Institute, Vadodara",
      details: [
        "Completed the intensive Flutter program with Grade 'A'.",
        "Deep-dived into Dart fundamentals, state management paradigms, navigation router models, and native platform bindings."
      ],
      side: "right"
    },
    {
      type: "education",
      date: "June 2021 – July 2023",
      role: "Master of Computer Application (MCA)",
      company: "Jagannath University, Jaipur",
      details: [
        "Post-graduated with a cumulative score of 66.08%.",
        "Focused studies on Database Systems, Object-Oriented Architectures, and Advanced Software Engineering."
      ],
      side: "left"
    },
    {
      type: "work",
      date: "2022 – 2023",
      role: "Computer Programmer",
      company: "The P.V.M. BCA College, Keshod",
      details: [
        "Managed software and hardware troubleshooting along with system installations across computer labs.",
        "Supported faculty and lab operations using MS Office and Google Workspace.",
        "Quickly adapted to new tools and technologies while assisting with basic programming tasks."
      ],
      side: "right"
    },
    {
      type: "work",
      date: "2021 – 2022",
      role: "Computer Programmer",
      company: "Vrundavan Computer, Keshod",
      details: [
        "Performed installation, configuration, and troubleshooting of computer systems.",
        "Assisted in maintaining computer labs and supporting end users.",
        "Gained practical experience with MS Office, Google tools, and fundamental programming concepts."
      ],
      side: "left"
    },
    {
      type: "education",
      date: "June 2017 – July 2020",
      role: "Bachelor of Computer Application (BCA)",
      company: "Bhakta Kavi Narsinh Mehta University, Junagadh",
      details: [
        "Graduated with a final score of 75.05%.",
        "Built solid foundations in procedural C programming, data structures, and object-oriented paradigms."
      ],
      side: "right"
    }
  ];

  return (
    <section id="timeline" className="section" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Timeline</span>
          <h2 className="section-title">Experience & Education</h2>
        </div>

        <div className="timeline-container">
          {timelineData.map((item, idx) => (
            <div key={idx} className={`timeline-item ${item.side}`}>
              <div className="timeline-dot"></div>
              <div className="glass-card timeline-card">
                <span className="timeline-date">{item.date}</span>
                <h3 className="timeline-role">{item.role}</h3>
                <h4 className="timeline-company">{item.company}</h4>
                <ul className="timeline-details">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
