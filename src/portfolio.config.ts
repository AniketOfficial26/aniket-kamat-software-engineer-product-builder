/**
 * PORTFOLIO CONFIGURATION - ANIKET KAMAT
 * 
 * This file is the single source of truth for all personal details,
 * social links, resume link, project information, and skills.
 * 
 * UPDATE INSTRUCTIONS:
 * - Replace placeholders (marked with [REPLACE]) with your confirmed URLs.
 * - To integrate real email delivery, configure either Resend or Formspree
 *   as documented in the `contactProviderConfig` section below.
 */

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'ml' | 'hardware';
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  isLivePlaceholder?: boolean;
  isSourcePlaceholder?: boolean;
  contextTag: string;
  keyHighlights: string[];
  caveatNote?: string;
  image?: string;
}

export interface SkillGroup {
  name: string;
  description: string;
  skills: string[];
}

export interface ExplorationTopic {
  title: string;
  focus: string;
  description: string;
}

export const portfolioConfig = {
  // Personal & Professional Profile - Centered on Innovation & Craft, NOT Job Hunting
  personal: {
    fullName: "Aniket Kamat",
    roleTitle: "Software Engineer & Builder",
    education: "Electronics and Computer Engineering Graduate",
    heroHeadline: "I build software that solves real problems.",
    heroSupportingText: "Electronics and Computer Engineering graduate exploring the intersection of software engineering, applied AI, and thoughtful product design.",
    focusPhilosophy: "Creating useful, thoughtful software that connects technology with practical human needs.",
    
    // Contact & Socials
    email: "er.aniket200@gmail.com",
    
    // Confirmed Socials & Credentials
    githubUrl: "https://github.com/AniketOfficial26",
    isGithubPlaceholder: false,
    
    linkedinUrl: "https://www.linkedin.com/in/aniket-kamat-engineer",
    isLinkedinPlaceholder: false,
    
    resumeUrl: "https://drive.google.com/drive/folders/1kCL9vpog1v_zDXB83Wl8gJisBpE3Bm7l?usp=sharing",
    isResumePlaceholder: false,

    location: "India",
  },

  // First-Person Story - Focused on Curiosity, Craft, and Meaningful Innovation
  aboutStory: {
    lead: "Innovation begins with curiosity: understanding how things work, questioning how they could work better, and experimenting until an idea takes shape.",
    paragraphs: [
      "I’m fascinated by the process of turning an idea into something real. For me, innovation begins with curiosity: understanding how things work, questioning how they could work better, and experimenting until an idea takes shape.",
      "My journey across electronics, software development, machine learning, and product design has taught me to approach problems from different angles. Having an electronics and computer engineering foundation gives me a deep appreciation for the physical hardware layer—microcontrollers, signal behavior, and hardware constraints—while allowing me to build high-level web platforms, mobile architectures, and intelligent algorithms with equal rigor.",
      "Whether I’m building a collaborative platform, exploring intelligent applications, or experimenting with hardware, I enjoy connecting technology with practical human needs. I believe meaningful innovation is not just about using new technology—it’s about creating something useful, thoughtful, and better than what existed before."
    ],
    principles: [
      {
        title: "Curiosity & Experimentation",
        description: "Innovation starts by questioning assumptions, pulling systems apart to see how they tick, and rapidly prototyping working iterations."
      },
      {
        title: "Hardware to High-Level Software",
        description: "Approaching problems from silicon registers to responsive interfaces ensures grounded intuition about latency, memory, and performance."
      },
      {
        title: "Human Utility Over Vanity",
        description: "Technology is only valuable when it remedies genuine friction. Every feature must deliver thoughtful, tangible utility to people."
      }
    ]
  },

  // Technical Skills - Grouped cleanly, NO fabricated scores or percentages
  skillGroups: [
    {
      name: "Core Languages",
      description: "Systems, compiled, and scripting languages with strong algorithmic grounding",
      skills: ["C++", "Java", "JavaScript", "Dart", "Embedded C", "TypeScript", "Python (exposure)"]
    },
    {
      name: "Web & Mobile Development",
      description: "Cross-platform client applications, responsive interfaces, and full-stack environments",
      skills: ["HTML", "CSS", "PHP", "Flutter", "React Native", "TypeScript"]
    },
    {
      name: "Machine Learning & Applied AI",
      description: "Core statistical models, computer vision experimentation, and model pipelines",
      skills: ["TensorFlow / Keras", "Machine Learning Fundamentals", "Google Colab", "Data Preprocessing"]
    },
    {
      name: "Database, Tools & Workflow",
      description: "Version control, collaborative development, database management, and IDEs",
      skills: ["SQL / DBMS", "Git", "GitHub", "VS Code", "Google Colab"]
    },
    {
      name: "Hardware & Embedded Systems",
      description: "Circuit fundamentals, microcontroller programming, and sensor integration",
      skills: ["Arduino", "8051 Microcontrollers", "Embedded Systems", "Electronics Fundamentals"]
    }
  ] as SkillGroup[],

  // Curated Authentic Projects (Strict adherence to factual brief, with distinctive 16:9 covers)
  projects: [
    {
      id: "gatherly",
      title: "Gatherly",
      category: "web",
      categoryLabel: "Web & Full-Stack",
      shortDescription: "Deployed collaborative platform designed for seamless group coordination and interaction.",
      fullDescription: "Gatherly is a modern, deployed web platform crafted to streamline collaborative interaction. Built and deployed live to production on Vercel, it demonstrates end-to-end full-stack web architecture, responsive interface design, and client-server state coordination.",
      technologies: ["React", "TypeScript", "Web Standards", "Vercel Deployment"],
      image: "/src/assets/images/gatherly_cover_1791962434196.jpg",
      visualType: "Product Mockup (Based on Deployed App UI)",
      liveUrl: "https://gatherly-green.vercel.app/",
      isLivePlaceholder: false,
      sourceUrl: "https://github.com/AniketOfficial26/gatherly",
      isSourcePlaceholder: true,
      contextTag: "Live Deployed Platform",
      keyHighlights: [
        "Live deployment accessible on Vercel with responsive desktop and mobile support",
        "Clean component separation with predictable state flow and lightweight rendering",
        "Designed to facilitate collaborative interactions with minimal friction"
      ],
      caveatNote: "Live application deployed on Vercel (https://gatherly-green.vercel.app/). Cover visual is an illustrative product mockup faithful to the deployed interface layout."
    },
    {
      id: "finsathi",
      title: "FinSathi",
      category: "mobile",
      categoryLabel: "Mobile Application",
      shortDescription: "React Native application exploring spending-pattern analysis and financial-stress prediction.",
      fullDescription: "FinSathi is a cross-platform mobile application concept built with React Native and TypeScript. It investigates algorithmic categorization of user spending habits and analyzes how financial volatility correlates with stress signals.",
      technologies: ["React Native", "TypeScript", "Data Analysis", "Mobile UI"],
      image: "/src/assets/images/finsathi_finance_cover_1791962467154.jpg",
      visualType: "Concept UI Mockup",
      liveUrl: undefined,
      sourceUrl: "https://github.com/AniketOfficial26/finsathi",
      isSourcePlaceholder: true,
      contextTag: "Exploratory Prototype",
      keyHighlights: [
        "Structured data models for tracking transactional behaviors across expenditure categories",
        "Exploratory stress-prediction heuristics evaluating spending velocity and budgeting drift",
        "Built with modular TypeScript types ensuring predictable financial entity transformations"
      ],
      caveatNote: "An exploratory prototype researching pattern analysis; does not claim validated clinical/financial predictions or production deployment."
    },
    {
      id: "foodswap",
      title: "FoodSwap",
      category: "mobile",
      categoryLabel: "Mobile Application",
      shortDescription: "Flutter application concept comparing packaged foods using Open Food Facts and nutrition data.",
      fullDescription: "FoodSwap is a mobile application concept developed with Flutter and Dart. It empowers consumers to make informed dietary choices by scanning or looking up packaged food products, pulling real-time nutritional disclosures from the Open Food Facts open database, and executing comparative recommendation algorithms.",
      technologies: ["Flutter", "Dart", "Open Food Facts API", "Nutrition Algorithms"],
      image: "/src/assets/images/foodswap_cover_1791962434327.jpg",
      visualType: "Product Mockup (Based on Flutter App UI)",
      liveUrl: undefined,
      sourceUrl: "https://github.com/AniketOfficial26/foodswap",
      isSourcePlaceholder: true,
      contextTag: "App Architecture & Scoring Engine",
      keyHighlights: [
        "Custom nutritional scoring model weighing macronutrients, sodium, sugars, and additives",
        "Integration with Open Food Facts API schema to parse multi-region barcode records",
        "Smooth cross-platform Flutter interface with comparative side-by-side product view"
      ],
      caveatNote: "Concept architecture including product models and recommendation algorithms based on public food disclosure registries. Recommendations are illustrative algorithms, not medical advice."
    },
    {
      id: "doodle-recognizer",
      title: "Doodle Recognizer",
      category: "ml",
      categoryLabel: "Machine Learning",
      shortDescription: "Real-time drawing classification ML project built during internship at Persistent Systems.",
      fullDescription: "Developed during a selective two-month engineering internship at Persistent Systems. The project focuses on computer vision and convolutional neural networks trained on Google's Quick, Draw! dataset, enabling real-time recognition of freehand sketch vectors and pixel representations.",
      technologies: ["Python", "TensorFlow / Keras", "Google Colab", "Quick, Draw! Dataset", "CNN"],
      image: "/src/assets/images/doodle_recognizer_cover_1791962465924.jpg",
      visualType: "ML Interface Mockup (Based on Project UI)",
      liveUrl: undefined,
      sourceUrl: "https://github.com/AniketOfficial26/doodle-recognizer",
      isSourcePlaceholder: true,
      contextTag: "Persistent Systems Internship",
      keyHighlights: [
        "Trained on subsets of the massive 50-million-drawing Quick, Draw! benchmark dataset",
        "Iterated convolutional neural network architectures in Google Colab using TensorFlow/Keras",
        "Evaluated classification performance across distinct stroke sequences and bitmap inputs"
      ],
      caveatNote: "Developed during a 2-month internship at Persistent Systems. Focused on ML model experimentation without claims of commercial production deployment or guaranteed accuracy."
    },
    {
      id: "noise-cancellation-device",
      title: "AI Noise Cancellation Prototype",
      category: "hardware",
      categoryLabel: "Embedded & DSP Prototype",
      shortDescription: "Final-year engineering project investigating AI sound classification and active noise cancellation.",
      fullDescription: "A comprehensive final-year engineering project bridging embedded hardware and audio intelligence. Built around a Raspberry Pi core and microphone arrays, this project explores acoustic sound classification to identify unwanted environmental noises and examine Active Noise Cancellation (ANC) phase-inversion algorithms.",
      technologies: ["Raspberry Pi", "Embedded C / Python", "MEMS Microphones", "Audio DSP", "Sound Classification"],
      image: "/src/assets/images/dsp_audio_hardware_1791960598411.jpg",
      visualType: "Engineering Workbench Visual",
      liveUrl: undefined,
      sourceUrl: "https://github.com/AniketOfficial26/anc-device-prototype",
      isSourcePlaceholder: true,
      contextTag: "Final-Year Capstone Project",
      keyHighlights: [
        "Configured dual-microphone acoustic sampling for ambient noise profiling",
        "Investigated digital signal processing (DSP) filters for real-time anti-phase wave generation",
        "Integrated lightweight audio classification to differentiate voice from repetitive background frequencies"
      ],
      caveatNote: "Researched and built as a final-year engineering prototype exploring DSP and AI classification; not a commercially proven consumer product."
    },
    {
      id: "air-quality-monitor",
      title: "Air Quality Monitoring System",
      category: "hardware",
      categoryLabel: "Electronics & Microcontrollers",
      shortDescription: "Arduino-based environmental station measuring real-time atmospheric quality indicators.",
      fullDescription: "An embedded systems project engineered around an Arduino microcontroller and dedicated gas/particulate sensors. It reads analog and digital sensor telemetry to track ambient air quality metrics and output timely indicators.",
      technologies: ["Arduino", "Embedded C/C++", "Gas & Particulate Sensors", "Hardware Prototyping"],
      image: "/src/assets/images/air_quality_sensor_cover_1791962467035.jpg",
      visualType: "Sensor Lab Prototype Visual",
      liveUrl: undefined,
      sourceUrl: "https://github.com/AniketOfficial26/air-quality-arduino",
      isSourcePlaceholder: true,
      contextTag: "Hardware Electronics Project",
      keyHighlights: [
        "Programmed Arduino microcontroller logic to sample sensor pins and filter signal noise",
        "Integrated sensor calibration curves to interpret environmental gas resistance shifts",
        "Demonstrates hands-on mastery of embedded electronics, circuit assembly, and microcontrollers"
      ],
      caveatNote: "An Arduino-based academic electronics project. Does not claim certified industrial laboratory measurements."
    }
  ] as (Project & { visualType?: string })[],

  // Currently Exploring (Continuous Learning)
  currentlyExploring: [
    {
      title: "Full-Stack Development",
      focus: "Scalable Web Systems & Modern Architecture",
      description: "Deepening knowledge of scalable full-stack web applications, TypeScript end-to-end type safety, modern backend services, and clean component architecture."
    },
    {
      title: "Practical & Applied AI",
      focus: "Model Integration in Everyday Software",
      description: "Exploring pragmatic ways to embed machine learning models into real-world applications, focusing on developer tooling, intelligent data parsing, and high-utility features."
    },
    {
      title: "Building Software Products & SaaS",
      focus: "Product Ideation & User-Centric Engineering",
      description: "Studying the fundamentals of turning prototypes into viable, maintainable software products, focusing on real problem discovery, friction-free UX, and iterative building."
    }
  ] as ExplorationTopic[],

  // Real Contact Setup & Documentation
  contactProviderDocs: {
    overview: "To avoid mock simulations while preventing API key exposure, this portfolio provides immediate mailto fallback and easy one-click configuration for standard email backends (Formspree or Resend).",
    providers: [
      {
        name: "Option 1: Formspree (Zero-Backend, Recommended)",
        steps: [
          "Create a free account at formspree.io and create a new form.",
          "Copy your Form ID (e.g., 'mqkvnzyz').",
          "In src/portfolio.config.ts, set `formspreeFormId: 'YOUR_FORM_ID'`.",
          "Messages submitted in the contact form will automatically deliver to your inbox without requiring backend code."
        ]
      },
      {
        name: "Option 2: Resend API (Full-Stack Backend)",
        steps: [
          "Obtain an API key from resend.com.",
          "Add `RESEND_API_KEY=re_123456...` to your server environment (.env).",
          "Add a server route in server.ts to handle `/api/contact` using the Resend SDK or fetch API.",
          "Do NOT expose your secret API key in client-side code."
        ]
      },
      {
        name: "Option 3: Direct Mailto / Copy Link (Always Active)",
        steps: [
          "The contact form validates all fields and provides a one-click button to open your default email client with all message fields pre-populated.",
          "A copy button allows copying the structured message text directly to the clipboard."
        ]
      }
    ]
  }
};
