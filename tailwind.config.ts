import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        ink: {
          950: '#07080a',
          900: '#0c0d10',
          850: '#111316',
          800: '#16191d',
          700: '#1f2328',
          600: '#2b3037',
          // 300–500 are tuned to meet WCAG AA contrast on ink-950/900 backgrounds.
          500: '#737b87',
          400: '#8a929e',
          300: '#a8afba',
          200: '#b7bdc6',
          100: '#dfe2e7',
          50: '#f3f4f6',
        },
        accent: {
          DEFAULT: '#b9f26b',
          soft: '#d6f8a6',
          dim: '#7fae3f',
        },
        signal: '#6ee7d8',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['"Space Grotesk"', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        'display-xl': ['clamp(2.6rem, 6.4vw, 5.6rem)', { lineHeight: '0.95', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4.25rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'display-md': ['clamp(1.75rem, 3.2vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
      },
      boxShadow: {
        glass: 'inset 0 1px 0 0 rgba(255,255,255,0.06), 0 20px 60px -20px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(185,242,107,0.35), 0 10px 40px -10px rgba(185,242,107,0.35)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(3%, -4%, 0) scale(1.08)' },
        },
        'float-slower': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(-4%, 3%, 0) scale(1.05)' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 18s ease-in-out infinite',
        'float-slower': 'float-slower 24s ease-in-out infinite',
        ping: 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
        blink: 'blink 1s steps(1) infinite',
        'scroll-dot': 'scroll-dot 1.8s ease-out infinite',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
