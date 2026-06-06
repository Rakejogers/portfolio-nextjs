export type PortfolioAsset = {
  type: "image" | "video" | "document";
  src: string;
  alt?: string;
  poster?: string;
};

export type PortfolioLink = {
  label: string;
  href: string;
};

export type PortfolioProject = {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  links: PortfolioLink[];
  media: PortfolioAsset[];
};

export type PortfolioSkillColumn = {
  title: string;
  items: string[];
};

export type PortfolioSkillResource = {
  label: string;
  tech: string[];
  base: number;
  step: number;
  max: number;
};

export type PortfolioSkillLevel = {
  minAppearances: number;
  label: string;
};

export const portfolioData = {
  profile: {
    name: "Jake Rogers",
    headline: "Computer Science Student at the University of Kentucky",
    bio: "I build full-stack products, hackathon projects, and practical tools across web, mobile, AI, and data-heavy workflows.",
  },
  contact: {
    email: "jarog2005@gmail.com",
    github: "https://github.com/rakejogers",
    linkedin: "https://linkedin.com/in/jake-rogers-engineer",
    resume: {
      label: "Resume",
      href: "/Resume.pdf",
      downloadName: "Jake_Rogers_Resume.pdf",
    },
  },
  education: {
    school: "University of Kentucky",
    degree: "BS in Computer Science",
    expectedGraduation: "May 2027",
    gpa: "3.98",
    coursework: [
      "AI Certificate",
      "Intro to Generative AI",
      "Data Structures and Algorithms",
      "Discrete Math"
    ],
    activities: [
      "Association of Computing Machinery (ACM)",
      "CatHacks XI First Place Overall 2x",
    ],
  },
  skills: [
    "C++",
    "Python",
    "JavaScript",
    "HTML/CSS",
    "MATLAB",
    "Next.js",
    "Tailwind CSS",
    "React",
    "React Native",
  ],
  skillsOutput: {
    columns: [
      {
        title: "LANGUAGES",
        items: ["C++", "Python", "JavaScript", "HTML/CSS", "MATLAB", "TypeScript", "SQL"],
      },
      {
        title: "FRAMEWORKS",
        items: [
          "Next.js",
          "React",
          "React Native",
          "Tailwind CSS",
          "Supabase",
          "Pocketbase",
          "PyTorch",
          "Vapi",
        ],
      },
      {
        title: "TOOLS",
        items: [
          "Git",
          "Linux",
          "Nginx",
          "Vercel",
          "Splunk",
          "CI/CD",
          "SQLite",
          "Codex",
          "Claude Code",
          "Cursor"
        ],
      },
    ] satisfies PortfolioSkillColumn[],
    resources: [
      {
        label: "Frontend",
        tech: ["HTML/CSS", "JavaScript", "Next.js", "React", "React Native", "Tailwind CSS", "TypeScript"],
        base: 50,
        step: 6,
        max: 92,
      },
      {
        label: "Backend",
        tech: ["Node", "SQL", "SQLite", "Supabase", "Pocketbase", "Splunk"],
        base: 48,
        step: 7,
        max: 86,
      },
      {
        label: "AI / ML",
        tech: ["Python", "PyTorch", "OpenAI", "Vapi", "Perplexity API"],
        base: 45,
        step: 8,
        max: 82,
      },
      {
        label: "DevOps",
        tech: ["Git", "Linux", "Nginx", "Vercel", "CI/CD"],
        base: 42,
        step: 7,
        max: 78,
      },
      {
        label: "Prototype",
        tech: ["CNC", "3D Printing", "Prototyping", "MATLAB", "C++"],
        base: 44,
        step: 7,
        max: 80,
      },
    ] satisfies PortfolioSkillResource[],
    levels: [
      { minAppearances: 3, label: "Expert" },
      { minAppearances: 2, label: "Advanced" },
      { minAppearances: 0, label: "Applied" },
    ] satisfies PortfolioSkillLevel[],
  },
  experience: [
    {
      period: "Summer 2026",
      role: "Software Engineering Intern",
      company: "Hudl",
      dates: "May 2026 - Present",
      bullets: [
        "Building product experiences inside the Hudl app and related frontends with a cross-functional engineering team.",
        "Contributing to the parent experience, helping families stay connected to athlete activity, teams, and video workflows.",
        "Working across modern frontend surfaces to ship user-facing features in a large-scale sports technology product.",
      ],
      tech: ["Frontend Engineering", "Product Development", "Mobile App", "Web Frontends"],
    },
    {
      period: "Summer 2025",
      role: "Software Engineering Intern",
      company: "SOIDEM DATA TECHNOLOGIES",
      dates: "June 2025 - August 2025",
      bullets: [
        "Engineered a full-stack version control system to manage and track changes across 500+ client Splunk dashboard pages, improving data integrity.",
        "Developed an 11-page dashboard using Next.js/React, which was adopted as the primary interface for the company's version control product used by 5+ enterprise clients.",
        "Worked in a highly collaborative, international team environment, maintaining a legacy Splunk codebase while actively contributing to its migration to a modern tech stack.",
      ],
      tech: ["Next.js", "React", "Splunk", "Git", "SQL", "CI/CD"],
    },
    {
      period: "2024 - Present",
      role: "Engineering Prototyping Guide",
      company: "University of Kentucky Innovation Center",
      dates: "Aug 2024 - Present",
      bullets: [
        "Collaborated with 30 other peers to run the university's engineering makerspace.",
        "Guided students in the design and prototyping of engineering projects.",
        "Provided hands-on assistance with 3D printing, laser cutting, CNC machining, and other fabrication techniques.",
      ],
      tech: ["3D Printing", "CNC", "Prototyping"],
    },
    {
      period: "Summer 2024",
      role: "IT Technician",
      company: "Grayson County Board of Education",
      dates: "May 2024 - Aug 2024",
      bullets: [
        "Worked alongside others to upkeep all the technology across various schools in the district.",
        "Learned practices of networking, cybersecurity, and cloud system management.",
        "Quickly responded to various service issues and requests from staff across the district.",
      ],
      tech: ["Networking", "Cybersecurity", "IT Support"],
    },
  ],
  projects: [
    {
      title: "Nora (First Place at CatHacks XII)",
      description: "An AI voice companion that calls seniors on their phone.",
      longDescription:
        "Nora is an AI voice companion for seniors that places gentle scheduled phone calls, captures check-in context like mood, reminders, and daily plans, and gives guardians a dashboard for setup, schedules, manual calls, call history, transcripts, and summaries. Awarded Most Wanted (First Place) at CatHacks XII.",
      tech: ["Next.js", "React", "Tailwind CSS", "Supabase", "Vapi", "Edge Functions"],
      links: [
        { label: "Visit", href: "https://nora-topaz.vercel.app" },
        {
          label: "Devpost",
          href: "https://devpost.com/software/nora-3gdjy6?ref_content=my-projects-tab&ref_feature=my_projects",
        },
      ],
      media: [
        {
          type: "image",
          src: "/nora-landing.png",
          alt: "Nora landing page screenshot",
        },
      ],
    },
    {
      title: "Scholar Seats",
      description: "A student-focused ticket exchange platform.",
      longDescription:
        "A student-focused ticket exchange platform to facilitate communication between buyers and sellers of tickets for events at my university. Released and used by 120+ users at my university.",
      tech: ["Next.js", "TypeScript", "Pocketbase", "SQLite", "Linux", "Nginx", "Vercel"],
      links: [
        { label: "Visit", href: "https://scholarseats.com" },
        { label: "GitHub", href: "https://github.com/rakejogers/student-ticket-app" },
      ],
      media: [
        {
          type: "video",
          src: "/scholar-seats-demo.mp4",
          poster: "/scholarseats.png",
          alt: "Scholar Seats demo video",
        },
        {
          type: "image",
          src: "/scholarseats.png",
          alt: "Scholar Seats screenshot",
        },
      ],
    },
    {
      title: "Factify (First Place at CatHacks XI)",
      description:
        "A Chrome extension for fact checking any claims on the web which won CatHacks XI Overall Best Hack.",
      longDescription:
        "Factify is a Google Chrome Extension me and a team built that won CatHacks XI Overall Best Hack. It evaluates a highlighted statement or webpage for factual accuracy and bias by using Perplexity's Sonar-Reasoning-Pro API.",
      tech: ["HTML", "CSS", "JavaScript", "Perplexity API", "Google Chrome Extension API"],
      links: [{ label: "GitHub", href: "https://github.com/ImNateBerry/Factify" }],
      media: [
        {
          type: "image",
          src: "/factify.png",
          alt: "Factify screenshot",
        },
      ],
    },
    {
      title: "Snake Game Neural Network",
      description: "AI agent learning through reinforcement.",
      longDescription: "An AI agent that learns to play Snake using deep reinforcement learning.",
      tech: ["Python", "PyTorch"],
      links: [{ label: "GitHub", href: "https://github.com/rakejogers/snake_game_ai" }],
      media: [
        {
          type: "video",
          src: "/snake-project-demo.mp4",
          alt: "Snake neural network demo video",
        },
      ],
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio with Next.js.",
      longDescription:
        "My portfolio website built with Next.js and Tailwind CSS. The previous version featured smooth scrolling, animations, and interactive visual effects.",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
      links: [{ label: "GitHub", href: "https://github.com/Rakejogers/portfolio-nextjs" }],
      media: [
        {
          type: "video",
          src: "/portfolio-demo.mp4",
          alt: "Previous portfolio demo video",
        },
      ],
    },
  ] satisfies PortfolioProject[],
};
