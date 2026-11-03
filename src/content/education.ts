import type { Achievement, Certification, EducationItem } from '@/types/content';

/**
 * ⚠ Replace the bracketed placeholders ([…]) with your real details.
 * Nothing here is invented — fill in only what is true.
 */
export const education: EducationItem[] = [
  {
    degree: 'BSc Computer Science & Information Technology (CSIT)',
    institution: 'Shree Yantra College',
    affiliation: 'Affiliated to Tribhuvan University (TU)',
    period: '2025 — Present',
    status: 'In progress',
    description:
      'Studying programming, data structures & algorithms, computer architecture, databases and software engineering.',
    highlights: ['Currently in 3rd semester'],
  },
  {
    degree: '+2 Science',
    institution: 'Shree Mangalmaya Secondary School',
    affiliation: 'National Examinations Board (NEB), Nepal',
    period: '2023 — 2025',
    status: 'Completed',
    description: 'Higher secondary education in the Science stream, with Computer Science.',
    highlights: ['Grade A · GPA 3.42'],
  },
];

/** Leave the array empty to hide the certifications list. */
export const certifications: Certification[] = [
  { title: '[Certification title]', issuer: '[Issuing organisation]', year: '[Year]' },
  { title: '[Certification title]', issuer: '[Issuing organisation]', year: '[Year]' },
];

/** Leave the array empty to hide the achievements list. */
export const achievements: Achievement[] = [
  { title: '[Achievement or award]', description: '[One-line description of what you did]', year: '[Year]' },
  { title: '[Technical milestone]', description: '[e.g. hackathon, competition, published resource]', year: '[Year]' },
];
