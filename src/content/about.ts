import type { AboutContent } from '@/types/content';

export const about: AboutContent = {
  lead: 'I believe the best way to understand code is to explain it — and the best way to explain it is to build something real.',
  paragraphs: [
    "I'm a BSc CSIT student at Shree Yantra College (Tribhuvan University) with a long-running curiosity about how software actually works. What started as writing small programs in C turned into a habit of taking things apart, understanding them, and putting them back together a little better.",
    'Alongside my studies I teach and mentor students in programming. Watching an abstract idea — a pointer, a class, a recursive call — suddenly make sense to someone is the most rewarding part of my week, and it constantly sharpens my own understanding.',
    "When I'm not teaching, I'm building: small tools, web experiences and learning resources. I'm especially interested in emerging technologies and in how they can make learning more accessible.",
  ],
  focus: [
    {
      title: 'Programming & software development',
      description: 'Writing readable, well-structured programs in C, C++, Python, Java and JavaScript.',
    },
    {
      title: 'Teaching & mentoring',
      description: 'Breaking complex concepts into steps students can reason about on their own.',
    },
    {
      title: 'Problem-solving & logical thinking',
      description: 'Starting from the problem, not the syntax — then choosing the simplest thing that works.',
    },
    {
      title: 'Exploring emerging technologies',
      description: 'Experimenting with modern web tooling, AI-assisted workflows and new ways to learn.',
    },
    {
      title: 'Continuous learning',
      description: 'Every lesson I teach and every bug I fix is a chance to get a little better.',
    },
  ],
  now: [
    { label: 'Studying', value: 'BSc CSIT · Shree Yantra College' },
    { label: 'Teaching', value: 'C, C++, Python, Java & OOP' },
    { label: 'Building', value: 'Web apps & learning tools' },
    { label: 'Exploring', value: 'Modern web & AI tooling' },
  ],
};
