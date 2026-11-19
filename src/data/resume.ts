// Content from jan.bitbypixel.com (primary) and Jan's "Product Designer" resume in
// Reactive Resume (to fill gaps). Keep in sync with both.

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
    what: 'Led research and design for GitHub Spark; my research and concepts informed its public preview.',
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

// About: a short story in Jan's voice (one string per paragraph).
export const about = [
  'I grew up between a designer mom and a colour consultant dad, so I was opening Photoshop and Illustrator by the time I was eight.',
  'That curiosity took me to graphic arts and business at NTNU, then to an MS in Human Centered Design & Engineering at UW. Along the way I realised I care less about how things look and more about why they work.',
  'That’s still how I design. I dig into the why, read the code, and turn messy systems into something people understand the first time. When a team disagrees, I sketch or prototype it so we can test instead of argue.',
  'And yes, I really do like meetings.',
];

// About gallery: one photo at a time, changing every few seconds.
// Put photos in public/about/ and set src (e.g. '/about/swim.jpg'). Without src, a labelled placeholder shows.
export const gallery: { src?: string; alt: string; caption: string }[] = [
  { alt: 'Open-water swim', caption: 'Finishing a 3,300 m open-water swim' },
  { alt: 'Plants on a balcony', caption: 'Large-leaf trees and Thai basil on the balcony' },
  { alt: 'Picnic in a park', caption: 'Picnic season in Vancouver' },
];
