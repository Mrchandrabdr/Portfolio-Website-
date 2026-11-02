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
    period: '[Start year] — Present',
    status: 'In progress',
    description:
      'Studying programming, data structures & algorithms, computer architecture, databases and software engineering.',
    highlights: ['[Current semester]', '[Notable coursework or project]'],
  },
  {
    degree: '+2 Science',
    institution: '[Your school / college name]',
    affiliation: 'National Examinations Board (NEB), Nepal',
    period: '[Start year] — [End year]',
    status: 'Completed',
    description: 'Higher secondary education in the Science stream. [Add your main subjects]',
    highlights: ['[Grade / GPA]'],
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
