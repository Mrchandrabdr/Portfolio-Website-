import type { SkillCategory } from '@/types/content';

/**
 * Skill levels: 1 = familiar, 2 = comfortable, 3 = proficient, 4 = advanced, 5 = expert.
 * Adjust them honestly — they drive the segmented indicator on each skill.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'The languages I write, and teach, every week.',
    icon: 'code',
    skills: [
      { name: 'C', level: 4 },
      { name: 'C++', level: 4 },
      { name: 'Python', level: 4 },
      { name: 'Java', level: 3 },
    ],
  },
  {
    title: 'Web Development',
    description: 'Building fast, accessible interfaces for the browser.',
    icon: 'globe',
    skills: [
      { name: 'HTML', level: 4 },
      { name: 'CSS', level: 4 },
      { name: 'JavaScript', level: 3 },
      { name: 'React', level: 3 },
    ],
  },
  {
    title: 'Tools & Technologies',
    description: 'The everyday toolkit behind every project.',
    icon: 'wrench',
    skills: [
      { name: 'Git', level: 4 },
      { name: 'GitHub', level: 4 },
      { name: 'VS Code', level: 5 },
      { name: 'Linux', level: 3 },
    ],
  },
  {
    title: 'Other Expertise',
    description: 'Where teaching and engineering meet.',
    icon: 'graduation',
    skills: [
      { name: 'Programming Education', level: 5 },
      { name: 'Object-Oriented Programming', level: 4 },
      { name: 'Problem Solving', level: 4 },
      { name: 'Computer Science Fundamentals', level: 4 },
    ],
  },
];

export const levelLabels: Record<number, string> = {
  1: 'Familiar',
  2: 'Comfortable',
  3: 'Proficient',
  4: 'Advanced',
  5: 'Expert',
};

export const currentlyLearning = ['TypeScript', 'Node.js', 'Data Structures in depth', 'Machine Learning basics'];
