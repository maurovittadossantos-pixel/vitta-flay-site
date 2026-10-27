import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070b1c',
          900: '#0d1330',
          800: '#161d40',
          700: '#232c56',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        flare: {
          400: '#f472b6',
          500: '#ec4899',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(13, 19, 48, 0.06), 0 12px 32px -12px rgba(13, 19, 48, 0.18)',
        glow: '0 24px 60px -20px rgba(99, 102, 241, 0.55)',
      },
    },
  },
  plugins: [],
};

export default config;
