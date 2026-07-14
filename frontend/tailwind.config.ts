import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'monospace'],
        heading: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          100: '#141414',
          200: '#1e1e1e',
          300: '#282828',
          400: '#404040',
        },
        ash: {
          DEFAULT: '#8a8a8a',
          100: '#f5f5f5',
          200: '#dedede',
          300: '#c0c0c0',
          400: '#909090',
          500: '#666666',
          600: '#444444',
          700: '#2a2a2a',
        },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'counter-spin-slow': 'counter-spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'iris-open': 'iris-open 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        'counter-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(240,240,240,0.2), 0 0 60px rgba(240,240,240,0.08)' },
          '50%': { boxShadow: '0 0 40px rgba(240,240,240,0.4), 0 0 100px rgba(240,240,240,0.15)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'iris-open': {
          '0%': { clipPath: 'circle(0% at 50% 50%)' },
          '100%': { clipPath: 'circle(150% at 50% 50%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
