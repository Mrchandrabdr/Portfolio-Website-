import type { Project, ProjectCategory } from '@/types/content';

/**
 * Projects shown in the "Work" section.
 *
 * ⚠ These are realistic PLACEHOLDERS — replace them with your real projects.
 *  - Add a project: copy an object below and give it a unique `id`.
 *  - Remove a project: delete its object.
 *  - Thumbnails: set `image: '/images/projects/<file>.webp'` (put the file in /public),
 *    or leave it out to get an auto-generated code-preview thumbnail from `snippet`.
 *  - Links: `repoUrl` / `liveUrl` are optional; missing links are hidden on the card.
 *  - `placeholder: true` shows a small "Sample" badge — delete it once the project is real.
 */
export const projects: Project[] = [
  {
    id: 'algo-visualizer',
    title: 'Algorithm Visualizer',
    description:
      'An interactive web app that animates sorting and searching algorithms step by step, built to help students see what their code is actually doing.',
    category: 'Web Development',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    snippet: {
      filename: 'bubbleSort.ts',
      code: 'for (let i = 0; i < n; i++)\n  for (let j = 0; j < n - i - 1; j++)\n    if (a[j] > a[j + 1])\n      swap(a, j, j + 1);',
    },
    placeholder: true,
    featured: true,
    year: '2025',
  },
  {
    id: 'student-record-system',
    title: 'Student Record System',
    description:
      'A console application for managing student records with file persistence, search and sorting — a capstone exercise for an OOP in C++ class.',
    category: 'C++',
    tech: ['C++', 'OOP', 'File I/O', 'STL'],
    snippet: {
      filename: 'Student.cpp',
      code: 'class Student {\n  std::string name;\n  float gpa;\npublic:\n  void display() const;\n};',
    },
    placeholder: true,
    featured: true,
    year: '2025',
  },
  {
    id: 'python-quiz-cli',
    title: 'Python Practice Quiz',
    description:
      'A command-line quiz engine that serves programming questions from JSON files, tracks scores and explains every wrong answer.',
    category: 'Python',
    tech: ['Python', 'JSON', 'CLI'],
    snippet: {
      filename: 'quiz.py',
      code: 'def ask(q):\n    answer = input(q["prompt"])\n    if answer == q["answer"]:\n        return True\n    print(q["explain"])',
    },
    placeholder: true,
    year: '2024',
  },
  {
    id: 'library-management',
    title: 'Library Management System',
    description:
      'A Java Swing desktop app for issuing and returning books, with inheritance-based models used to teach encapsulation and polymorphism.',
    category: 'Java',
    tech: ['Java', 'Swing', 'OOP'],
    snippet: {
      filename: 'Book.java',
      code: 'public class Book extends Item {\n  private boolean issued;\n  @Override\n  public String info() {\n    return title + " by " + author;\n  }\n}',
    },
    placeholder: true,
    year: '2024',
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description:
      'A responsive weather dashboard that consumes a public REST API, with loading and error states designed for slow mobile connections.',
    category: 'Web Development',
    tech: ['JavaScript', 'HTML', 'CSS', 'REST API'],
    snippet: {
      filename: 'weather.js',
      code: 'const res = await fetch(url);\nif (!res.ok) throw new Error();\nconst data = await res.json();\nrender(data.current);',
    },
    placeholder: true,
    year: '2024',
  },
  {
    id: 'c-programming-notes',
    title: 'C Programming Notes & Lab Sheets',
    description:
      'A structured collection of notes, solved lab exercises and practice problems for first-year C programming students.',
    category: 'Other',
    tech: ['C', 'Markdown', 'GitHub'],
    snippet: {
      filename: 'pointers.c',
      code: 'int x = 10;\nint *p = &x;\n*p = 20;\nprintf("%d", x); // 20',
    },
    placeholder: true,
    year: '2024',
  },
  {
    id: 'data-explorer',
    title: 'CSV Data Explorer',
    description:
      'A small Python tool that loads CSV files, summarises columns and plots quick charts — used to introduce students to data analysis.',
    category: 'Python',
    tech: ['Python', 'Pandas', 'Matplotlib'],
    snippet: {
      filename: 'explore.py',
      code: 'df = pd.read_csv(path)\nprint(df.describe())\ndf["marks"].plot(kind="hist")\nplt.show()',
    },
    placeholder: true,
    year: '2025',
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    description:
      'The site you are looking at: a fast, accessible React + TypeScript portfolio with content kept separate from components.',
    category: 'Web Development',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    snippet: {
      filename: 'App.tsx',
      code: 'export default function App() {\n  return <Portfolio owner="Chandra" />;\n}',
    },
    liveUrl: '/',
    year: '2026',
  },
];

export const projectFilters: Array<'All' | ProjectCategory> = ['All', 'Web Development', 'Python', 'C++', 'Java', 'Other'];
