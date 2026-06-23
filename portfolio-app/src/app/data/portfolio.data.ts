export interface SkillCategory {
  title: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  projects: {
    name: string;
    highlights: string[];
  }[];
}

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  icon: string;
}

export const PORTFOLIO = {
  name: 'ARUL S',
  title: 'Frontend Developer',
  subtitle: 'Angular Developer',
  location: 'Chennai, Tamil Nadu',
  phone: '+91 8072873550',
  email: 'arulkumar.2540@gmail.com',
  linkedin: 'https://www.linkedin.com/in/arul-s',
  summary:
    'Frontend Developer with 1.3 years of experience building enterprise web applications using Angular, TypeScript, JavaScript, HTML5, CSS3, and SCSS. Experienced in real-time dashboards, API integrations, WebSocket-based applications, and Role-Based Access Control (RBAC). Worked on Oil & Gas domain projects including Drilling AI and WDDI platforms.',
  skills: [
    { title: 'Frontend', items: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'Bootstrap'] },
    { title: 'Backend', items: ['Python (Basic)', 'FastAPI (Basic)', 'REST APIs'] },
    { title: 'Database', items: ['MongoDB'] },
    { title: 'Tools', items: ['Git', 'GitHub', 'GitLab', 'VS Code'] },
    {
      title: 'Concepts',
      items: ['WebSocket', 'RBAC', 'Lazy Loading', 'State Management', 'Responsive Design', 'API Integration'],
    },
  ] as SkillCategory[],
  experience: [
    {
      company: 'Software Developer',
      role: 'Frontend Developer',
      period: 'Feb 2025 – Present',
      projects: [
        {
          name: 'Drilling AI (Oil & Gas Platform)',
          highlights: [
            'Developed AI-powered drilling engineering platform using Angular',
            'Built real-time dashboards and data visualization modules',
            'Implemented WebSocket integration for live drilling data updates',
            'Developed Role-Based Access Control (RBAC) for secure access management',
            'Integrated frontend modules with REST APIs and MongoDB',
          ],
        },
        {
          name: 'WDDI (Well Delivery Difficulty Index)',
          highlights: [
            'Developed scalable frontend architecture using Angular',
            'Built reusable and responsive UI components',
            'Integrated REST APIs and managed application workflows',
            'Collaborated with backend and domain teams in Agile development',
          ],
        },
      ],
    },
  ] as ExperienceItem[],
  projects: [
    {
      title: 'Portfolio Website',
      description:
        'Personal portfolio with responsive layouts, smooth animations, and optimized performance.',
      tech: ['React.js', 'Bootstrap'],
      icon: 'portfolio-site',
    },
    {
      title: 'E-Commerce Website',
      description:
        'Responsive e-commerce site with product listing, filtering, and form validation.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      icon: 'ecommerce-app',
    },
  ] as ProjectItem[],
  education: {
    degree: 'Bachelor of Science in Computer Science',
    period: '2021 – 2024',
    institution: 'A.V.C College, Mayiladuthurai',
    cgpa: '7.3 / 10',
  },
  certification: {
    title: 'Frontend Development Certification',
    year: '2024',
    institution: 'Uniq Technologies, Chennai',
    details: 'JavaScript, React.js, Bootstrap, Responsive Web Design, and Single Page Applications',
  },
};
