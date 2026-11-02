import type { NavItem, SiteProfile, SocialLink } from '@/types/content';

export const profile: SiteProfile = {
  name: 'Chandra Bdr Katuwal',
  shortName: 'Chandra',
  initials: 'CK',
  role: 'Programming Educator & Developer',
  greeting: "Hello, I'm Chandra Bdr Katuwal.",
  headline: { before: 'Programming Educator', accent: '&', after: 'Developer.' },
  intro:
    'I help students fall in love with programming — turning pointers, recursion and objects into ideas that finally click — and I build clean, purposeful software along the way. I care about clear thinking, honest code and digital experiences that genuinely help people.',
  terminalPhrases: [
    'teaching pointers in C',
    'refactoring a React component',
    'explaining OOP with real objects',
    'debugging with a student',
    'learning something new',
  ],
  availability: { available: true, label: 'Open to teaching & project work' },
  heroBadges: [
    { label: 'Studying', value: 'BSc CSIT · TU' },
    { label: 'Teaching', value: 'C · C++ · Py · Java' },
  ],
  email: 'chandrabdrkatuwal0@gmail.com',
  // location: 'Kathmandu, Nepal', // ← uncomment / edit to show your location
  photo: {
    hero: '/images/profile.jpg',
    about: '/images/about.jpg',
    alt: 'Chandra Bdr Katuwal in a dark suit and glasses, smiling on a balcony',
    aboutAlt: 'Chandra Bdr Katuwal in a denim jacket and sunglasses in front of a floral backdrop',
  },
  footerTagline: 'Programming educator & developer — teaching with clarity, building with care.',
};

/**
 * Social profiles. Set `url: ''` to hide a platform everywhere.
 * TODO: replace the LinkedIn search URL with your profile URL and add your Instagram.
 */
export const socials: SocialLink[] = [
  { platform: 'github', label: 'GitHub', url: 'https://github.com/Mrchandrabdr', handle: '@Mrchandrabdr' },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/search/results/people/?keywords=Chandra%20Bdr%20Katuwal',
    handle: 'Chandra Bdr Katuwal',
  },
  { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/chandrabdrkatuwal', handle: 'chandrabdrkatuwal' },
  { platform: 'instagram', label: 'Instagram', url: '', handle: '' },
];

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const activeSocials = socials.filter((s) => s.url.trim() !== '');
