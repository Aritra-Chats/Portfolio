// ─── Portfolio Data ──────────────────────────────────────────────────────────
// Sourced from aritra_portfolio_data.json

export const personal = {
  fullName: 'Aritra Chatterjee',
  firstName: 'Aritra',
  lastName: 'Chatterjee',
  tagline: 'Software Development Engineer · Full-Stack · Android · Game Systems',
  taglineCycles: [
    'I build systems that ship.',
    'Full-Stack · MERN · Kotlin · Java',
    'Android · Offline-First · Sensor Nav',
    'Game Systems · Multiplayer · Real-Time',
    'LLM Tools · RAG · Privacy-First AI',
    'KIIT CSE \'27 · CGPA 9.15',
  ],
  bioShort: 'I build systems that ship — REST APIs, offline Android apps, multiplayer games, and LLM tools. KIIT CSE \'27.',
  bioLong: `I build systems that ship — from REST APIs managing campus data for 1,000+ records to offline Android apps navigating without internet, to multiplayer games synchronising player states in real time.

I'm a third-year CS undergrad at KIIT (CGPA: 9.15), currently working on Kampus Life — a full-stack campus management platform with a live MERN web portal and an Android client. On the backend, I've designed 30+ REST API endpoints with JWT authentication and role-based access control. On the Android side, I built an offline-first architecture with sensor-based indoor navigation using the device's rotation vector and step counter.

My game development work isn't separate from my engineering practice — it's an extension of it. Building Prop Hunt, a multiplayer game in Unreal Engine 5, meant designing client-server architecture with Epic Online Services, writing timestamp-driven concurrency control for real-time gunshot synchronisation, and thinking hard about state consistency under latency.

I also built a Local LLM Coding Assistant — a privacy-preserving AI dev tool that routes prompts across Qwen, DeepSeek, and Mistral using Ollama, with a RAG pipeline for project-context-aware code generation. No cloud. Full architectural ownership.`,
  location: 'Bhubaneswar, Odisha, India',
  openToWork: true,
  availability: 'Actively seeking internships. Available full-time post July 2027.',
  seekingRoles: [
    'Software Engineering Intern',
    'Full-Stack Developer',
    'Backend Developer',
    'Android Developer',
    'Game Developer',
  ],
};

export const contact = {
  email: 'aritrachatterjee1904@gmail.com',
  phone: '+91 8327372665',
  linkedin: 'https://www.linkedin.com/in/aritrachats',
  github: 'https://github.com/Aritra-Chats',
  itchio: 'https://aritra-chats.itch.io',
  leetcode: 'https://leetcode.com/AritraChats',
};

export const images = {
  avatar: 'https://avatars.githubusercontent.com/u/147392149?v=4',
  avatarLarge: 'https://media.licdn.com/dms/image/v2/D5603AQFXn3rSe7uaYQ/profile-displayphoto-shrink_800_800/B56ZYESAw1GsAg-/0/1743828554016',
  banner: 'https://media.licdn.com/dms/image/v2/D5616AQG5L2NO4sVjOQ/profile-displaybackgroundimage-shrink_350_1400/B56Z3C92WMGsAY-/0/1777092488083',
};

export const metrics = [
  { label: 'REST API Endpoints', value: '30+' },
  { label: 'Manual Entry Reduction', value: '80%' },
  { label: 'Records / Upload', value: '1,000+' },
  { label: 'Campus Datasets', value: '6+' },
  { label: 'LLM Models Routed', value: '3' },
  { label: 'UE5 Games Built', value: '5' },
  { label: 'CGPA', value: '9.15' },
  { label: 'LinkedIn Connections', value: '685+' },
];

// ─── Skills ─────────────────────────────────────────────────────────────────

export interface Skill { name: string; level?: 'proficient' | 'intermediate'; }

export const skills: Record<string, Skill[]> = {
  Languages: [
    { name: 'Java', level: 'proficient' },
    { name: 'C', level: 'proficient' },
    { name: 'C++', level: 'proficient' },
    { name: 'C#', level: 'proficient' },
    { name: 'Kotlin', level: 'proficient' },
    { name: 'JavaScript', level: 'proficient' },
    { name: 'TypeScript', level: 'intermediate' },
    { name: 'Python', level: 'intermediate' },
    { name: 'HTML', level: 'proficient' },
    { name: 'CSS', level: 'proficient' },
    { name: 'SQL', level: 'intermediate' },
  ],
  Frameworks: [
    { name: 'React.js' },
    { name: 'Express.js' },
    { name: 'Node.js' },
    { name: 'Jetpack Compose' },
    { name: 'Retrofit' },
    { name: 'Unity Engine' },
    { name: 'Unreal Engine 5' },
  ],
  Databases: [
    { name: 'MongoDB' },
    { name: 'Oracle SQL' },
  ],
  Tools: [
    { name: 'Git' },
    { name: 'GitHub' },
    { name: 'VS Code' },
    { name: 'Android Studio' },
    { name: 'IntelliJ IDEA' },
    { name: 'Visual Studio' },
    { name: 'Rider (JetBrains)' },
  ],
  'AI / LLM': [
    { name: 'Ollama' },
    { name: 'RAG' },
    { name: 'Prompt Engineering' },
    { name: 'Pandas' },
    { name: 'NumPy' },
  ],
};

// Icons that orbit the avatar (subset of languages)
export const orbitIcons = [
  { name: 'Java',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'C',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { name: 'C++',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C#',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
  { name: 'Kotlin',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg' },
  { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'HTML',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'SQL',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg' },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export type ProjectCategory = 'All' | 'Full-Stack' | 'Android' | 'Game Dev' | 'AI / LLM';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: 'active' | 'completed' | 'archived';
  featured: boolean;
  categories: ProjectCategory[];
  period: string;
  techIcons: string[];
  techLabels: string[];
  highlights: string[];
  impact: string[];
  links: { label: string; url: string }[];
  punch: string; // one-line description
}

export const projects: Project[] = [
  {
    id: 'kampus-life',
    title: 'Kampus Life',
    subtitle: 'KIIT Campus Management Platform',
    status: 'active',
    featured: true,
    categories: ['Full-Stack', 'Android'],
    period: 'Sep 2025 – Present',
    punch: 'Full-stack admin portal + offline Android client managing campus operations at scale.',
    techLabels: ['React', 'Express', 'MongoDB', 'Kotlin', 'Jetpack Compose', 'JWT', 'Retrofit'],
    techIcons: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
    ],
    highlights: [
      '30+ REST API endpoints with JWT auth & RBAC',
      'Bulk ingestion pipeline: 1,000+ records/upload via XLSX/CSV',
      '80% reduction in manual data entry',
      'Offline-first Android architecture with sensor-based indoor navigation',
      'Role-based Compose UI — students & faculty views',
    ],
    impact: ['30+ endpoints', '80% less manual entry', '1,000+ records/upload', '6+ datasets'],
    links: [
      { label: 'Live Site', url: 'https://kampus-life.live' },
      { label: 'Web GitHub', url: 'https://github.com/Aritra-Chats/Kampus-Life-Portal' },
      { label: 'App GitHub', url: 'https://github.com/Aritra-Chats/Kampus-Life-App' },
    ],
  },
  {
    id: 'prop-hunt',
    title: 'Prop Hunt',
    subtitle: 'Multiplayer Game — UE5 + EOS',
    status: 'active',
    featured: true,
    categories: ['Game Dev'],
    period: 'Oct – Dec 2024',
    punch: 'Multiplayer hide-and-seek in Unreal Engine 5, with timestamp-driven concurrency for real-time sync.',
    techLabels: ['Unreal Engine 5', 'C++', 'Epic Online Services', 'Visual Studio'],
    techIcons: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    ],
    highlights: [
      'Client-server architecture using Epic Online Services (EOS)',
      'Timestamp-driven concurrency control for gunshot synchronisation',
      'Lobby systems and scalable networking logic',
      'Real-time player state synchronisation across clients',
    ],
    impact: ['Client-server arch', 'Real-time sync', 'EOS lobby + matchmaking'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Aritra-Chats/PropHunt' },
      { label: 'itch.io', url: 'https://aritra-chats.itch.io' },
    ],
  },
  {
    id: 'local-llm-assistant',
    title: 'Local LLM Assistant',
    subtitle: 'Privacy-Preserving AI Dev Tool',
    status: 'active',
    featured: true,
    categories: ['AI / LLM'],
    period: '2026 – Present',
    punch: 'Zero-cloud AI coding assistant routing across Qwen, DeepSeek & Mistral with RAG context awareness.',
    techLabels: ['Python', 'Ollama', 'RAG', 'Qwen', 'DeepSeek', 'Mistral'],
    techIcons: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    ],
    highlights: [
      'Multi-model LLM routing: Qwen, DeepSeek, Mistral via Ollama',
      'RAG pipeline for project-context-aware code generation',
      'Zero cloud dependency — fully local, no data leakage',
      'Full architectural ownership — design to deployment',
    ],
    impact: ['Zero cloud', 'Multi-model routing', 'RAG context', 'MIT Licensed'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Aritra-Chats/Local-LLM-Coding-Assistant' },
    ],
  },
  {
    id: 'unity-ai-systems',
    title: 'Game AI Systems',
    subtitle: 'Modular Enemy AI in Unity',
    status: 'completed',
    featured: true,
    categories: ['Game Dev'],
    period: 'May 2024',
    punch: 'State-machine-driven enemy AI with patrol, chase, attack, and hide — zero regressions on extension.',
    techLabels: ['Unity', 'C#', 'State Machines', 'Animation Trees'],
    techIcons: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
    ],
    highlights: [
      'Modular AI: attack / hide / patrol / chase states',
      'Environment-influenced ghoul behaviour',
      'Extensible architecture — add states without breaking transitions',
    ],
    impact: ['State machine AI', 'Environment-driven', 'Zero regression extension'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Aritra-Chats/Unity3D-Ghoul' },
    ],
  },
  {
    id: 'unity-movement',
    title: '3D Movement System',
    subtitle: 'GTA-Style State-Based Player Control',
    status: 'completed',
    featured: false,
    categories: ['Game Dev'],
    period: 'May 2024',
    punch: 'GTA-style modular movement with smooth state transitions and extensible architecture.',
    techLabels: ['Unity', 'C#', 'State Machines'],
    techIcons: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
    ],
    highlights: ['GTA-style modular state design', 'Smooth transition control', 'Easy state add/remove'],
    impact: ['Modular design'],
    links: [{ label: 'GitHub', url: 'https://github.com/Aritra-Chats/Unity3D-Movement' }],
  },
  {
    id: 'unity-sword',
    title: 'Sword Fighting System',
    subtitle: 'Combat Mechanics in Unity 3D',
    status: 'completed',
    featured: false,
    categories: ['Game Dev'],
    period: 'Mar 2025',
    punch: 'Physics-driven sword combat system with animation blending.',
    techLabels: ['Unity', 'C#'],
    techIcons: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
    ],
    highlights: ['Sword combat mechanics in Unity 3D', 'Animation blending'],
    impact: [],
    links: [{ label: 'GitHub', url: 'https://github.com/Aritra-Chats/Unity3D-SwordFighting' }],
  },
  {
    id: 'rocket-escape',
    title: 'Rocket Escape',
    subtitle: 'Android Infinite Runner — Unity',
    status: 'completed',
    featured: false,
    categories: ['Game Dev', 'Android'],
    period: 'Mar 2024',
    punch: 'Published Android infinite-runner with animations, multi-health system, and core game loops.',
    techLabels: ['Unity', 'C#', 'Android'],
    techIcons: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
    ],
    highlights: ['Infinite runner game', 'Multi-health system', 'Published on itch.io'],
    impact: ['Published'],
    links: [{ label: 'itch.io', url: 'https://aritra-chats.itch.io' }],
  },
  {
    id: 'data-science',
    title: 'Data Science Project',
    subtitle: 'Jupyter Notebook ML/Data',
    status: 'active',
    featured: false,
    categories: ['AI / LLM'],
    period: '2025 – Present',
    punch: 'ML and data analysis projects with Pandas and NumPy in Jupyter.',
    techLabels: ['Python', 'Pandas', 'NumPy', 'Jupyter'],
    techIcons: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    ],
    highlights: ['ML analysis pipeline', 'Data manipulation with Pandas/NumPy'],
    impact: [],
    links: [{ label: 'GitHub', url: 'https://github.com/Aritra-Chats/Project' }],
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  duration: string;
  type: string;
  highlights: string[];
  skills: string[];
  promotion?: string;
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Deputy Director — Project Wing',
    org: 'K-1000, KIIT',
    period: 'Apr 2025 – Present',
    duration: '1 yr+',
    type: 'Part-time · Hybrid',
    promotion: 'Promoted from Student Founding Member in June 2025',
    highlights: [
      'Founding member of KIIT\'s central student innovation organisation',
      'Managing multiple student teams across technical domains',
      'Mentoring members in building full-stack, Android, and game projects',
      'Coordinating project development and technical initiatives',
    ],
    skills: ['Leadership', 'Project Management', 'MERN Stack', 'Android', 'Game Dev'],
  },
  {
    role: 'Assistant Lead — Game Development',
    org: 'E-Labs, KIIT',
    period: 'Jan 2025 – May 2025',
    duration: '5 months',
    type: 'Full-time · On-site',
    promotion: 'Promoted from Game Developer in January 2025',
    highlights: [
      'Led development initiatives and technical sessions on game systems',
      'Mentored students in Unity and game development workflows',
      'Ran technical workshops on game development best practices',
      'Supported student-led game project development',
    ],
    skills: ['Unity', 'C#', 'C++', 'Leadership', 'Teaching'],
  },
  {
    role: 'Game Developer',
    org: 'E-Labs, KIIT',
    period: 'Mar 2024 – Jan 2025',
    duration: '10 months',
    type: 'Part-time · Hybrid',
    highlights: [
      'Joined E-Labs Game Development Team as a member',
      'Built game projects using Unity and C#',
      'Developed game mechanics for society projects',
    ],
    skills: ['Unity', 'C#', 'Game Development'],
  },
];

// ─── Education ───────────────────────────────────────────────────────────────

export const education = [
  {
    institution: 'Kalinga Institute of Industrial Technology (KIIT)',
    degree: 'B.Tech — Computer Science Engineering',
    period: 'Aug 2023 – Jul 2027',
    status: 'Ongoing',
    gpa: '9.15 / 10.0',
    location: 'Bhubaneswar, Odisha',
    activities: 'Game Developer · E-Labs Society',
    coursework: ['OOP', 'DSA', 'DBMS', 'SDLC', 'OS', 'Computer Architecture', 'Core Java', 'Oracle DB'],
  },
  {
    institution: 'Nava Nalanda Higher Secondary School',
    degree: 'Class XII — Science',
    period: '2023',
    status: 'Completed',
    gpa: '87.8%',
    location: 'Bolpur – Santiniketan, West Bengal',
    activities: '',
    coursework: [],
  },
  {
    institution: 'Nava Nalanda High School',
    degree: 'Class X',
    period: '2021',
    status: 'Completed',
    gpa: '79.71%',
    location: 'Bolpur – Santiniketan, West Bengal',
    activities: '',
    coursework: [],
  },
];

// ─── Certifications ───────────────────────────────────────────────────────────

export const certifications = [
  {
    title: 'Unreal Engine 5 C++ Developer',
    issuer: 'Udemy — Ben Tristem / GameDev.tv',
    highlights: [
      '5 complete games built under the course',
      'UE5 fundamentals: UProperty, UAsset, Blueprint integration',
      'Modular code architecture & runtime optimisation',
      'C++ for game systems in Unreal',
    ],
    link: 'https://www.udemy.com/',
  },
];

// ─── GitHub Achievements ──────────────────────────────────────────────────────

export const githubAchievements = [
  { badge: 'Pair Extraordinaire', desc: 'Collaborated on merged pull requests' },
  { badge: 'Pull Shark', desc: 'Opened pull requests that got merged' },
  { badge: 'YOLO', desc: 'Merged a pull request without a review' },
];

export const featuredRepos = [
  { name: 'Kampus-Life-Portal', url: 'https://github.com/Aritra-Chats/Kampus-Life-Portal', lang: 'JavaScript' },
  { name: 'PropHunt', url: 'https://github.com/Aritra-Chats/PropHunt', lang: 'C++' },
  { name: 'Local-LLM-Coding-Assistant', url: 'https://github.com/Aritra-Chats/Local-LLM-Coding-Assistant', lang: 'Python' },
];

export const resumeUrl = '/resume.pdf'; // place resume.pdf in frontend/public/
