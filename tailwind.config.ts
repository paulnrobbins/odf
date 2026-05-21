import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // All values resolve from CSS variables defined in styles/tokens.css
        walnut: {
          DEFAULT: 'var(--color-walnut)',
          deep: 'var(--color-walnut-deep)',
        },
        lamplight: {
          DEFAULT: 'var(--color-lamplight)',
          warm: 'var(--color-lamplight-warm)',
          dim: 'var(--color-lamplight-dim)',
        },
        bone: {
          DEFAULT: 'var(--color-bone)',
          soft: 'var(--color-bone-soft)',
        },
        sage: {
          DEFAULT: 'var(--color-sage)',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-instrument-sans)', 'system-ui', 'sans-serif'],
        italic: ['var(--font-instrument-serif)', 'serif'],
      },
      fontSize: {
        // Editorial type scale — display sizes use vw for fluid hero behavior
        'display-xl': ['clamp(3.5rem, 12vw, 11rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.75rem, 8vw, 7rem)',  { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2.25rem, 5vw, 4.5rem)',{ lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'body-lg': ['1.25rem', { lineHeight: '1.55' }],
        'body':    ['1.0625rem', { lineHeight: '1.65' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.55' }],
        'micro':   ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
      },
      spacing: {
        // Macro whitespace tokens — per the doc, ≥30% of content height between sections
        'gutter': 'clamp(1.5rem, 5vw, 4rem)',
        'section-gap': 'clamp(6rem, 15vw, 14rem)',
      },
      maxWidth: {
        'readable': '38rem',
        'editorial': '64rem',
        'wide': '88rem',
      },
      transitionTimingFunction: {
        // Reckless easing curves — slow-in, slow-out, with character
        'cinema': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'lamp':   'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '47%':      { opacity: '0.96' },
          '49%':      { opacity: '1' },
          '51%':      { opacity: '0.94' },
          '53%':      { opacity: '1' },
        },
        'drift': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%':      { transform: 'translateY(-8px) translateX(4px)' },
        },
      },
      animation: {
        'flicker': 'flicker 6s ease-in-out infinite',
        'drift':   'drift 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
