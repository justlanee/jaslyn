import { PortfolioData } from '../types/portfolio';

/**
 * JASLYN KAYE TORRES — PORTFOLIO CONFIGURATION DATA
 * Populated from Resume PDF, Project Nexus (E-ReQuest) Capstone Documentation,
 * uploaded profile photos, GitHub (@justlanee), and social links.
 */
export const portfolioData: PortfolioData = {
  profile: {
    name: 'Jaslyn Kaye Torres',
    handle: 'CPE_DEV // @justlanee',
    tagline: 'Computer Engineering Student',
    avatarUrl: '/assets/me.jpg',
    avatarFileName: 'me.jpg',
    photos: [
      {
        url: '/assets/me.jpg',
        fileName: 'me.jpg',
        caption: 'Jaslyn Kaye Torres — Computer Engineering (ICPEP)',
      },
      {
        url: '/assets/me-night.jpg',
        fileName: 'me_night.jpg',
        caption: 'Jaslyn Kaye Torres — Evening Cityscape View',
      },
    ],
    statusText: 'ONLINE',
    location: 'Marikina, Philippines',
    bioTitle: 'about me :<',
    bioParagraphs: [
      {
        text: 'Motivated Computer Engineering student blending hands-on experience in hardware design, embedded systems, and digital circuit simulation with practical office administration and data management expertise. Eager to learn, adapt, and apply emerging engineering concepts and programming skills to solve complex technical challenges in software development, embedded systems, or hardware development.',
        highlights: [
          'Computer Engineering student',
          'hardware design',
          'embedded systems',
          'digital circuit simulation',
          'software development',
        ],
      },
    ],
    goals: '',
    focusAreas: [
      'Database Administration (DBA)',
      'Embedded Systems',
      'Hardware & PCB Design',
      'ESP32 & Arduino IoT',
      'Python & Java Apps',
    ],
  },

  audioTrack: {
    title: 'wave to earth - seasons (instrumental)',
    artist: 'wave to earth',
    src: '/assets/audio/seasons.webm',
    youtubeUrl: 'https://youtu.be/aL33a0hGbNo?si=iEqttVoZbMDA4j2l',
    youtubeId: 'aL33a0hGbNo',
    durationLabel: '04:16',
    useSynthFallback: true,
  },

  quickLinks: [
    {
      id: 'github',
      label: 'GitHub',
      badge: 'GH',
      badgeColor: '#6e5494',
      url: 'https://github.com/justlanee',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      badge: 'IG',
      badgeColor: '#d62976',
      url: 'https://www.instagram.com/xnuwosn?exln=MWd1M2J3a215ajFmZA==',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      badge: 'FB',
      badgeColor: '#1877f2',
      url: 'https://www.facebook.com/share/18XbzFZ6A3/',
    },
  ],

  openSourceProjects: [
    {
      id: 'os-nexus',
      name: 'project-nexus / E-ReQuest [IN PROGRESS]',
      repoUrl: 'https://github.com/justlanee',
      description:
        'Capstone Project (DBA): Offline-first ICCT Campus Transaction & Student Service Guide app + Admin Web Portal using Kotlin, Room DB & Firebase.',
      tags: ['DBA', 'Room DB', 'Firebase', 'Kotlin', 'ERD'],
    },
    {
      id: 'os-electroedge',
      name: 'electroedge',
      repoUrl: 'https://github.com/justlanee/electroedge',
      description:
        'A structured study app for Computer Engineering majors offering automated score monitoring and deep learning metrics to guide their review journey.',
      tags: ['Java', 'CpE Review', 'Score Analytics', 'Deep Learning Metrics'],
    },
    {
      id: 'os-whackamole',
      name: 'whack-a-mole',
      repoUrl: 'https://github.com/justlanee/whack-a-mole',
      description:
        '"Hit the stubborn mole" — interactive Python arcade game focusing on event-driven logic, reflex timing, and score tracking.',
      tags: ['Python', 'Game Dev', 'Event Loop', 'GUI'],
    },
  ],

  projects: [
    {
      id: 'proj-nexus',
      title: 'Project Nexus: E-ReQuest (Campus Transaction Guide)',
      role: 'Database Administrator (DBA)',
      category: 'Capstone & Database Architecture',
      description:
        'Currently in progress (Alpha Build completed, A.Y. 2026–2027): An offline-first Android/PWA Student Service Guide and Web Administrator Portal for ICCT Colleges Cainta Campus. As Database Administrator (DBA), designed the Entity-Relationship Diagram (ERD), data organization, Firebase cloud synchronization schema (Services, TransactionDocuments, Announcements), and local Room/storage checklist persistence with zero personal student data collection.',
      technologies: [
        'Database Design (ERD)',
        'Room Database (Offline)',
        'Firebase Sync',
        'Kotlin & XML',
        'Admin Web Portal',
        'Agile / Software Design',
      ],
      status: 'IN_PROGRESS',
      featured: true,
    },
    {
      id: 'proj-electroedge',
      title: 'ElectroEdge Application',
      role: 'Developer',
      category: 'Software & EdTech',
      description:
        'Developed "ElectroEdge," a structured study application tailored specifically for Computer Engineering majors. Implemented automated score monitoring features to track student performance over time and integrated deep learning metrics to analyze study patterns and guide users through exam preparation.',
      technologies: ['Java', 'Deep Learning Metrics', 'Automated Score Monitoring', 'EdTech'],
      repoUrl: 'https://github.com/justlanee/electroedge',
      status: 'ONLINE',
      featured: true,
    },
    {
      id: 'proj-whackamole',
      title: 'Whack-a-Mole Arcade Game',
      role: 'Developer',
      category: 'Software & Python',
      description:
        'Interactive "hit the stubborn mole" desktop/arcade game built in Python featuring responsive hit detection, dynamic spawn intervals, and live scorekeeping.',
      technologies: ['Python', 'Game Logic', 'Interactive UI', 'Event Handling'],
      repoUrl: 'https://github.com/justlanee/whack-a-mole',
      status: 'ONLINE',
      featured: true,
    },
    {
      id: 'proj-rc-car',
      title: 'Smartphone-Controlled Arduino Remote Control Car',
      role: 'Embedded Systems Builder',
      category: 'Embedded & Robotics',
      description:
        'Designed and built a wireless remote-controlled vehicle powered by an Arduino microcontroller and Bluetooth/Wi-Fi module. Developed an embedded C/C++ program to interpret mobile phone commands and translate them into precise motor driver outputs.',
      technologies: ['Arduino', 'C/C++', 'Bluetooth / Wi-Fi Module', 'Motor Drivers', 'Embedded Systems'],
      status: 'HARDWARE',
      featured: true,
    },
    {
      id: 'proj-power-supply',
      title: 'Regulated AC-to-DC Power Supply',
      role: 'Hardware Designer',
      category: 'Hardware & Circuit Design',
      description:
        'Designed, simulated, and built a regulated AC-to-DC power supply delivering stable voltage for laboratory electronics testing. Selected transformers and implemented diode bridge rectification, capacitive filtering, and linear voltage regulation.',
      technologies: [
        'Circuit Simulation',
        'Schematic Diagram',
        'PCB Layout',
        'Bridge Rectification',
        'Voltage Regulation',
      ],
      status: 'HARDWARE',
      featured: true,
    },
  ],

  techStack: [
    {
      id: 'cat-lang',
      category: 'Programming Languages',
      code: 'LANG.SYS',
      skills: [
        { name: 'C', level: 'Core', tag: 'Embedded / Low-Level' },
        { name: 'C++', level: 'Core', tag: 'Microcontrollers / OOP' },
        { name: 'Python', level: 'Core', tag: 'Scripting / Apps' },
        { name: 'Java', level: 'Core', tag: 'Application Dev' },
      ],
    },
    {
      id: 'cat-db',
      category: 'Database Administration & Architecture',
      code: 'DBA_NEXUS.DB',
      skills: [
        { name: 'Database Design & ERD', level: 'DBA Role', tag: 'Project Nexus' },
        { name: 'Data Organization & Modeling', level: 'Core', tag: 'Schema Design' },
        { name: 'Room Database (Offline Cache)', level: 'Capstone', tag: 'Local Persistence' },
        { name: 'Firebase Cloud Storage & Sync', level: 'Capstone', tag: 'Backend Sync' },
      ],
    },
    {
      id: 'cat-embedded',
      category: 'Microcontrollers & Embedded Hardware',
      code: 'MCU_DRV.HEX',
      skills: [
        { name: 'ESP32', level: 'Hands-on', tag: 'Wi-Fi / Bluetooth IoT' },
        { name: 'Arduino', level: 'Hands-on', tag: 'Prototyping & Robotics' },
        { name: 'Motor Drivers & Sensors', level: 'Hands-on', tag: 'Hardware Control' },
        { name: 'Bluetooth / Wi-Fi Modules', level: 'Hands-on', tag: 'Wireless Telemetry' },
      ],
    },
    {
      id: 'cat-circuit',
      category: 'Circuit, PCB & Data Operations',
      code: 'EDA_CAD.PCB',
      skills: [
        { name: 'Circuit Simulation & Schematics', level: 'Core', tag: 'Digital & Analog' },
        { name: 'PCB Layout & Power Regulation', level: 'Core', tag: 'Hardware Design' },
        { name: 'Microsoft Excel (Formulas/QA)', level: 'Advanced', tag: 'Data Verification' },
        { name: 'Git & GitHub', level: 'Core', tag: 'Version Control' },
      ],
    },
  ],

  experience: [
    {
      id: 'exp-dba',
      role: 'Database Administrator (DBA) — Project Nexus (E-ReQuest)',
      organization: 'ICCT Colleges • College of Engineering and Digital Technology (Capstone)',
      period: 'A.Y. 2026 — 2027 (In Progress)',
      location: 'Cainta, Rizal',
      highlights: [
        'Lead database design, data organization, and Entity-Relationship Diagram (ERD) modeling for the E-ReQuest Campus Transaction & Student Service Guide system.',
        'Architect dual-layer persistence combining Firebase online admin synchronization with offline local storage/Room caching so students can track document checklists without internet connectivity.',
        'Enforce privacy-first database rules with zero personal student data collection while maintaining real-time updates for school services, procedures, and announcements.',
      ],
    },
    {
      id: 'exp-office',
      role: 'Office Staff',
      organization: 'Administrative & Data Operations',
      period: 'September 2026 — Present',
      location: 'Marikina, Philippines',
      highlights: [
        'Manage and maintain large volumes of operational and numerical data using Microsoft Excel, ensuring high accuracy and quick retrieval.',
        'Perform fast, accurate typing and format documents for reports, official correspondence, and administrative records.',
        'Streamline spreadsheet workflows using Excel formulas and data verification techniques to reduce manual entry errors.',
      ],
    },
  ],

  education: [
    {
      id: 'edu-icct',
      degree: 'Bachelor of Science in Computer Engineering',
      institution: 'ICCT Colleges Foundation Inc.',
      period: 'Expected 2027',
      location: 'Cainta, Rizal',
      details:
        'College of Engineering and Digital Technology — Focused on Software Design (Project Nexus / E-ReQuest), hardware design, embedded systems (ESP32/Arduino), digital circuit simulation, and PCB layout.',
    },
    {
      id: 'edu-plmar',
      degree: 'Science, Technology, Engineering, and Mathematics (STEM)',
      institution: 'Pamantasan ng Lungsod ng Marikina',
      period: 'Graduated 2023',
      location: 'Marikina City',
      details:
        'Senior High School STEM track foundation in mathematics, physics, electronics, and computer programming.',
    },
  ],

  achievements: [
    {
      id: 'ach-nexus',
      title: 'Project Nexus (E-ReQuest) — Alpha Build & System Architecture Milestone',
      issuer: 'ICCT Colleges • Software Design Capstone (Database Administrator)',
      year: '2026 — 2027',
      detail:
        'Completed ERD, UML architecture, high-fidelity prototypes, and working Alpha builds for both the E-ReQuest Admin WebApp and offline-capable Student App.',
    },
    {
      id: 'ach-cpe',
      title: 'Computer Engineering Hardware & Software Builders',
      issuer: 'ICCT Colleges • Computer Engineering Department',
      year: '2024 — 2026',
      detail:
        'Designed and built working hardware prototypes (Smartphone-Controlled Arduino RC Car, Regulated AC-to-DC Power Supply) and study software (ElectroEdge).',
    },
  ],

  resume: {
    fileName: 'Jaslyn_Kaye_Torres_Resume.pdf',
    pdfUrl: '/assets/resume.pdf',
    lastUpdated: '2026',
    summary:
      'Official Resume of Jaslyn Kaye Torres — BS Computer Engineering student at ICCT Colleges (Marikina, Philippines). Click Download or Toggle Embedded PDF Frame to view the original document.',
  },

  contact: {
    email: 'jaslynkayetorres@gmail.com',
    phone: '09915972561',
    location: 'Marikina, Philippines',
    availability:
      'Open to Embedded Systems, Database Administration, Hardware Development & Software Roles',
    githubUrl: 'https://github.com/justlanee',
    instagramUrl: 'https://www.instagram.com/xnuwosn?exln=MWd1M2J3a215ajFmZA==',
    facebookUrl: 'https://www.facebook.com/share/18XbzFZ6A3/',
    linkedinUrl: 'https://github.com/justlanee',
  },
};
