export const personalInfo = {
  name: "Gary Luis Alquiza",
  brandTitle: "GL_Tensei",
  studioName: "GL_Tensei Studio",
  eyebrow: "Design. Development. Marketing.",
  headline: "GL_Tensei",
  tagline: "IT student and aspiring Cybersecurity Analyst exploring web development, game development, and UI/UX design while building creative digital experiences.",
  avatar: "/pfp.png",
  location: "Digos City, Davao del Sur, Philippines",
  timezone: "GMT+8 (PHT)",
  availability: "Open for Internships & Collaborations",
  bio: [
    "Hey, I'm a passionate IT student who loves exploring the world of technology, building things, and turning ideas into reality. I'm currently pursuing a Bachelor of Science in Information Technology (BSIT) in Digos City, Davao del Sur, Philippines. As someone who is hardworking, humble, and curious, I enjoy learning new skills and challenging myself to grow. Right now, I'm exploring web development, game development, and UI/UX design, combining creativity and technology to create meaningful digital experiences.",
    "When I'm away from my screen, you'll probably find me playing online games, creating YouTube videos, playing guitar, or going on adventures. I'm always looking for new things to explore and skills to develop. One of my biggest goals is to become a Cybersecurity Analyst, where I can use my technical knowledge and problem-solving skills to help protect people and systems in the digital world. For me, learning is a continuous journey, and this portfolio is a reflection of that journey."
  ],
  stats: [
    { label: "Selected Works", value: "03+" },
    { label: "Target Frame Rate", value: "60 FPS" },
    { label: "Mobile-First Score", value: "100%" },
    { label: "Base Timezone", value: "GMT+8" },
  ],
  skills: [
    "Cybersecurity Fundamentals",
    "React 19 & Vite",
    "GSAP ScrollTrigger",
    "UI/UX Design",
    "Game Dev Explorations",
    "Tailwind CSS",
    "JavaScript ES6+",
    "Responsive Architecture"
  ],
  contact: {
    email: "garyalquiza@g.cjc.edu.ph",
    github: "https://github.com/glquiza",
    linkedin: "https://linkedin.com",
  }
};

export const services = [
  {
    index: "01",
    title: "Creative Front-End Development",
    description: "Building custom, standards-compliant web applications with modern React, Vite, and component-driven architecture. Clean semantic code designed for longevity.",
    tags: ["React 19", "Vite", "Component Systems", "Modern JavaScript"]
  },
  {
    index: "02",
    title: "Motion & GSAP Interaction Design",
    description: "Choreographing scroll-triggered timelines, kinematic typography, page reveals, and fluid micro-interactions running at a locked 60 frames per second.",
    tags: ["GSAP", "ScrollTrigger", "Micro-interactions", "Timeline Choreography"]
  },
  {
    index: "03",
    title: "Responsive & Ergonomic UI",
    description: "Mobile-first, touch-optimized layouts engineered across every viewport. Fluid typography, balanced negative space, and intuitive tactile gestures.",
    tags: ["Tailwind CSS", "Mobile-First", "Grid Systems", "Fluid Typography"]
  },
  {
    index: "04",
    title: "Accessibility & Performance Auditing",
    description: "Ensuring web experiences remain usable, keyboard-navigable, and high-scoring on Lighthouse with full reduced-motion accommodations.",
    tags: ["WCAG Standards", "Keyboard Focus", "Lighthouse 100", "Semantic HTML"]
  }
];

export const projects = [
  {
    id: "project-1",
    index: "01",
    title: "CyberMatrix: Threat Radar",
    category: "Cybersecurity & Threat Telemetry",
    year: "2026",
    description: "Real-time threat telemetry scanner and incident response simulator. Built with React and GSAP, featuring rotating radar sweeps, dynamic threat filtering, and defensive countermeasure pulses.",
    tech: ["React", "GSAP Timelines", "SVG Optics", "Tailwind CSS", "Security SOC"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/glquiza/portfolio/blob/main/src/components/miniprojects/CyberThreatMatrix.jsx",
    liveUrl: "#project-1",
    demoType: "cyber"
  },
  {
    id: "project-2",
    index: "02",
    title: "PixelForge: 2D Physics Lab",
    category: "Game Development & Motion Physics",
    year: "2026",
    description: "Interactive 2D kinetic arcade simulator exploring game physics. Features real-time gravity tuning (Earth, Moon, Zero-G, Invert), restitution bounciness sliders, particle collisions, and Web Audio retro synthesis.",
    tech: ["React", "Canvas 2D", "GSAP Motion", "Web Audio API", "Physics Math"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/glquiza/portfolio/blob/main/src/components/miniprojects/RetroPhysicsLab.jsx",
    liveUrl: "#project-2",
    demoType: "physics"
  },
  {
    id: "project-3",
    index: "03",
    title: "RiffWave: Kinetic Audio Canvas",
    category: "Web Audio & Creative UI/UX",
    year: "2026",
    description: "Tactile acoustic studio visualizer blending guitar power chords, analog synth leads, and reactive SVG waveforms. Features real-time BPM tempo pulsing, spatial reverb controls, and automated arpeggio sequencing.",
    tech: ["React", "Web Audio API", "GSAP SVG Morphing", "BPM Engine", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/glquiza/portfolio/blob/main/src/components/miniprojects/KineticAudioStudio.jsx",
    liveUrl: "#project-3",
    demoType: "audio"
  }
];

export const certifications = [
  {
    id: "cert-1",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    category: "Cybersecurity",
    year: "2025",
    status: "Verified",
    credentialId: "GCC-SEC-994201",
    skills: ["SIEM Tools", "Network Defense", "Linux CLI", "Incident Response", "Python"],
    description: "Hands-on training in threat identification, vulnerability mitigation, intrusion detection systems (IDS), and enterprise security response operations.",
    verifyUrl: "https://coursera.org"
  },
  {
    id: "cert-2",
    title: "Cisco Networking & Endpoint Defense",
    issuer: "Cisco Networking Academy",
    category: "Networking",
    year: "2025",
    status: "Completed",
    credentialId: "CSCO-NET-771804",
    skills: ["Packet Analysis", "Firewall Rules", "TCP/IP Protocols", "Subnetting"],
    description: "In-depth study of computer network architectures, packet-level traffic inspection, and perimeter firewall security configurations.",
    verifyUrl: "https://www.netacad.com"
  },
  {
    id: "cert-3",
    title: "DICT Philippine Cybersecurity Awareness",
    issuer: "Department of Information and Communications Technology",
    category: "Cybersecurity",
    year: "2024",
    status: "Completed",
    credentialId: "DICT-SEC-2024-PH",
    skills: ["National Cyber Plan", "Threat Intelligence", "Phishing Defense", "Data Privacy"],
    description: "Certification covering regional cybersecurity compliance, ethical standards, social engineering mitigation, and critical infrastructure protection.",
    verifyUrl: "https://dict.gov.ph"
  },
  {
    id: "cert-4",
    title: "ISC² Certified in Cybersecurity (CC) Candidate",
    issuer: "ISC² International",
    category: "Cybersecurity",
    year: "2026",
    status: "In Progress",
    credentialId: "ISC2-CAND-8192",
    skills: ["Access Controls", "Security Principles", "Disaster Recovery", "Cloud Basics"],
    description: "Global foundation credential covering foundational security concepts, business continuity planning, and physical and logical access administration.",
    verifyUrl: "https://www.isc2.org"
  },
  {
    id: "cert-5",
    title: "Meta Front-End Development Specialization",
    issuer: "Meta / Coursera",
    category: "Web & Dev",
    year: "2024",
    status: "Verified",
    credentialId: "META-FE-551029",
    skills: ["React", "JavaScript ES6+", "Version Control / Git", "UI/UX & Accessibility"],
    description: "Comprehensive front-end engineering program covering modern React state patterns, responsive styling, and web accessibility standards.",
    verifyUrl: "https://coursera.org"
  },
  {
    id: "cert-6",
    title: "Foundations of Game Physics & Interactive Scripting",
    issuer: "Unity Academic / Creative Study",
    category: "Web & Dev",
    year: "2025",
    status: "Verified",
    credentialId: "GAME-DEV-3341",
    skills: ["2D Physics", "Collision Vectors", "State Machines", "Game Loops"],
    description: "Technical principles of real-time physics engines, inertia kinematics, hitboxes, and tactile player-control mechanics.",
    verifyUrl: "https://unity.com"
  }
];

export const labExperiments = [
  {
    id: "exp-1",
    title: "Kinetic Monospace Ticker",
    tag: "GSAP Motion",
    status: "Active",
    desc: "Infinite smooth ticker system with variable speed controls."
  },
  {
    id: "exp-2",
    title: "Tactile Cursor Magnetic Bounds",
    tag: "Interaction",
    status: "Lab Release",
    desc: "Spring physics attraction for interactive navigation anchors."
  },
  {
    id: "exp-3",
    title: "Dimensional Device Mockups",
    tag: "CSS 3D",
    status: "In Production",
    desc: "Hardware-accelerated perspective tilts with zero layout shift."
  },
  {
    id: "exp-4",
    title: "Clip-Path Mask Transitions",
    tag: "SVG & Canvas",
    status: "Prototyped",
    desc: "Angled wipe reveals inspired by modern editorial studio sites."
  }
];
