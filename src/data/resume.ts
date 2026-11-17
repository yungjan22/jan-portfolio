// Content from jan.bitbypixel.com (primary) and Jan's "Product Designer" resume in
// Reactive Resume (to fill gaps). Keep in sync with both.

export const value = [
  {
    label: 'Code literacy',
    title: 'Technical UX',
    text: 'I read HTML, CSS and JavaScript, so I design with technical constraints in mind and close the gap between UI and front end.',
  },
  {
    label: 'Architecture',
    title: 'Complex information, made clear',
    text: 'I map complex technologies and fragmented data into data visualization systems and AI interaction models.',
  },
  {
    label: 'Facilitation',
    title: 'Team alignment',
    text: 'When stakeholders disagree, I turn conflicting opinions into quick AI or hand-drawn prototypes the team can test right away.',
  },
];

// Experience, in three groups. `logo` is a file under public/logos/; without one,
// a box with `mark` (initials) shows instead. Pass noLogo to ExpEntry to drop the box. `fit: 'contain'` pads wordmark logos.
export type Entry = {
  org: string;
  role: string;
  years: string;
  place?: string;
  what?: string;
  logo?: string;
  fit?: 'cover' | 'contain';
  mark?: string;
};

export const jobs: Entry[] = [
  {
    org: 'Thomas Wang & Associate',
    role: 'Technical Designer',
    years: '2025–now',
    place: 'Vancouver',
    what: 'Rebuilt a law firm’s site for speed and AI search: 2.1s → 1.1s load, +20% weekly traffic, +9% conversion.',
    logo: '/logos/twa.webp',
  },
  {
    org: 'GitHub',
    role: 'UX Researcher & Designer · UW capstone',
    years: '2024–25',
    place: 'Seattle',
    what: 'Led research and design for GitHub Spark; my design became part of the features it launched with.',
    logo: '/logos/github.svg',
    fit: 'contain',
  },
  {
    org: 'BenQ',
    role: 'UI/UX Design Intern',
    years: '2024',
    place: 'Taipei',
    what: 'Usability study for an ergo monitor arm: −8% development cost, 1 patent.',
    logo: '/logos/benq.webp',
  },
  {
    org: 'WiAdvance Technology',
    role: 'Lead UI/UX Engineer',
    years: '2021–22',
    place: 'Taipei',
    what: 'QinSight factory dashboard, a 0→1 SaaS marketplace, and a design system across 7 departments.',
    logo: '/logos/wiadvance.webp',
  },
  {
    org: 'NII Capital',
    role: 'Design Consultant',
    years: '2020–21',
    place: 'Taipei',
    what: 'Startup UX: user flows, prototyping, $500K seed funding.',
    logo: '/logos/nii.svg',
    fit: 'contain',
  },
  {
    org: 'Systex',
    role: 'Design & Marketing Intern',
    years: '2019–20',
    place: 'Taipei',
    what: 'Service design: digital payments, +30% process efficiency.',
    logo: '/logos/systex.webp',
  },
];

export const schools: Entry[] = [
  {
    org: 'University of Washington',
    role: 'MS, Human Centered Design & Engineering',
    years: '2023–25',
    place: 'Seattle',
  },
  {
    org: 'National Taiwan Normal University',
    role: 'BEng, Graphic Arts & Communication · BBA, Business Administration',
    years: '2015–20',
    place: 'Taipei',
  },
];

export const projects: Entry[] = [
  {
    org: 'Microsoft',
    role: 'Hackathon · 1st place',
    years: '2022',
    what: 'QinSight, an AI traceability system that went on to save 264 hours a month.',
  },
  {
    org: 'Allen Institute for AI (AI2)',
    role: 'EarthRangers · Mobile usability testing',
    years: '2024',
    what: 'Turned interaction pain points into design specs that cut operational errors.',
  },
  {
    org: 'DubHacks',
    role: 'AI Challenge · 2nd place',
    years: '2024',
    what: 'A dialogue MVP for an LGBTQ+ mental health assistant, with ethical guardrails.',
  },
];

export const notes = [
  {
    title: 'The open-water swimmer',
    text: 'I like challenges that take mental grit, like a 3,300-metre open-water marathon swim.',
  },
  {
    title: 'The plant parent',
    text: 'I propagate large-leaf indoor trees and grow Thai basil on my balcony.',
  },
  {
    title: 'The sun-chaser',
    text: 'When the sun’s out, I’m on a picnic mat at a local park, catching up with friends.',
  },
];

export const skills = [
  {
    name: 'Product & interaction design',
    items:
      'End-to-end product design, information architecture, journey mapping, service blueprints, design systems and tokens, prototyping in Figma.',
  },
  {
    name: 'Research & strategy',
    items:
      'Usability testing (qual and quant), interviews and observation, A/B tests, competitive analysis, stakeholder workshops, design specs.',
  },
  {
    name: 'AI & build',
    items:
      'Claude, Cursor, MCP, prompt engineering, prototyping in HTML/CSS/Next.js/Tailwind, Git, Cloudflare, Power BI.',
  },
];
