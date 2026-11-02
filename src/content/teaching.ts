import type { TeachingContent } from '@/types/content';

export const teaching: TeachingContent = {
  intro:
    'I teach programming the way I wish I had been taught: start with intuition, make the invisible visible, then practise until it becomes yours.',
  subjects: [
    'C Programming',
    'C++ & OOP',
    'Python',
    'Java',
    'Data Structures',
    'Algorithms',
    'Web Fundamentals',
    'Problem Solving',
  ],
  approach: [
    {
      title: 'Build intuition first',
      description: 'Every concept starts with a real-world analogy and a "why" before any syntax appears on the board.',
    },
    {
      title: 'Make memory visible',
      description: 'Diagrams of variables, pointers, stacks and objects so students can see what the computer sees.',
    },
    {
      title: 'Code it live, together',
      description: 'We write, break and fix programs together — mistakes are treated as the most useful part of the lesson.',
    },
    {
      title: 'Practise with purpose',
      description: 'Short, graded exercises that build on each other, ending in a small project students are proud of.',
    },
  ],
  areas: [
    {
      icon: 'notes',
      title: 'Notes & resources',
      description: 'Concise, exam-aware notes written in plain language.',
      points: ['Topic-wise notes with diagrams', 'Solved lab sheets', 'Cheat sheets for quick revision'],
    },
    {
      icon: 'mentoring',
      title: 'Student mentoring',
      description: 'One-to-one and small-group guidance beyond the syllabus.',
      points: ['Debugging sessions', 'Project guidance', 'Study planning & career direction'],
    },
    {
      icon: 'exercises',
      title: 'Practical exercises',
      description: 'Hands-on problems that turn theory into skill.',
      points: ['Progressive problem sets', 'Mini projects', 'Code reviews with feedback'],
    },
  ],
  exercise: {
    title: 'Exercise of the week',
    language: 'C',
    prompt: 'Without running it — what does this print, and why?',
    code: '#include <stdio.h>\n\nvoid update(int *n) {\n    *n = *n * 2;\n}\n\nint main(void) {\n    int x = 21;\n    update(&x);\n    printf("%d\\n", x);\n    return 0;\n}',
    answer:
      'It prints 42. update() receives the address of x, so writing through *n changes the original variable — not a copy. That is exactly what pointers are for.',
  },
};
