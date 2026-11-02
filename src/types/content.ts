/**
 * Shared content types. Everything the site displays is described by these
 * shapes and lives in `src/content/` — edit the content files, not the components.
 */

export type SocialPlatform = 'github' | 'linkedin' | 'instagram' | 'facebook' | 'x' | 'youtube' | 'email';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** Leave empty ('') to hide the link everywhere on the site. */
  url: string;
  /** Short handle shown in the contact section, e.g. "@Mrchandrabdr". */
  handle?: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SiteProfile {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  greeting: string;
  headline: { before: string; accent: string; after: string };
  intro: string;
  /** Phrases cycled by the little terminal line in the hero. */
  terminalPhrases: string[];
  availability: { available: boolean; label: string };
  /** Up to two small floating labels around the hero portrait. */
  heroBadges: { label: string; value: string }[];
  email: string;
  location?: string;
  /** Paths under /public. If the file is missing, an initials monogram is shown instead. */
  photo: { hero: string; about: string; alt: string; aboutAlt: string };
  footerTagline: string;
}

export interface AboutContent {
  lead: string;
  paragraphs: string[];
  focus: { title: string; description: string }[];
  now: { label: string; value: string }[];
}

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  name: string;
  /** 1 = familiar … 5 = expert. Drives the segmented indicator. */
  level: SkillLevel;
  note?: string;
}

export type SkillCategoryIcon = 'code' | 'globe' | 'wrench' | 'graduation';

export interface SkillCategory {
  title: string;
  description: string;
  icon: SkillCategoryIcon;
  skills: Skill[];
}

export type ProjectCategory = 'Web Development' | 'Python' | 'C++' | 'Java' | 'Other';

export interface Project {
  /** Unique, URL-safe id. */
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tech: string[];
  /** Optional image under /public (e.g. "/images/projects/quiz.webp"). If absent, a code-preview thumbnail is generated. */
  image?: string;
  /** Used by the generated thumbnail. Keep it short (3–6 lines). */
  snippet?: { filename: string; code: string };
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  /** Marks example content; renders a "Sample" badge so visitors aren't misled. */
  placeholder?: boolean;
  year?: string;
}

export interface TeachingStep {
  title: string;
  description: string;
}

export interface TeachingArea {
  title: string;
  description: string;
  points: string[];
  icon: 'notes' | 'mentoring' | 'exercises';
}

export interface TeachingContent {
  intro: string;
  subjects: string[];
  approach: TeachingStep[];
  areas: TeachingArea[];
  exercise: { title: string; language: string; prompt: string; code: string; answer: string };
}

export interface EducationItem {
  degree: string;
  institution: string;
  affiliation?: string;
  period: string;
  status: 'In progress' | 'Completed';
  description?: string;
  highlights?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface Achievement {
  title: string;
  description: string;
  year?: string;
}
