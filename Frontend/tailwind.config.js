/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          pink:  '#ec4899',
          cyan:  '#06b6d4',
          indigo:'#6366f1',
        },
        surface: {
          dark:  '#0f0a1e',
          dark2: '#160d2e',
          dark3: '#1e1040',
          light: '#f0edff',
          light2:'#e8e3ff',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter:  ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-pink':   '0 0 20px rgba(236, 72, 153, 0.4)',
        'glow-cyan':   '0 0 20px rgba(6, 182, 212, 0.4)',
        'neu-dark':    '6px 6px 12px #0a0618, -6px -6px 12px #150e2a',
        'neu-light':   '6px 6px 12px #d0c8f0, -6px -6px 12px #ffffff',
        'glass':       '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-purple-pink': 'linear-gradient(135deg, #7c3aed, #ec4899)',
        'gradient-indigo-cyan': 'linear-gradient(135deg, #6366f1, #06b6d4)',
        'gradient-space':       'linear-gradient(135deg, #0f0a1e 0%, #160d2e 50%, #1e1040 100%)',
        'gradient-light':       'linear-gradient(135deg, #f0edff 0%, #e8e3ff 50%, #fce7f3 100%)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out infinite',
        'float-fast':   'float 4s ease-in-out infinite',
        'pulse-glow':   'pulse-glow 2s ease-in-out infinite',
        'blob':         'blob 8s ease-in-out infinite',
        'blob-slow':    'blob 12s ease-in-out infinite',
        'spin-slow':    'spin 20s linear infinite',
        'slide-up':     'slide-up 0.5s ease-out',
        'fade-in':      'fade-in 0.5s ease-out',
        'typing':       'typing 1.2s steps(3) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)' },
          '50%':      { boxShadow: '0 0 30px rgba(139, 92, 246, 0.7)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%':      { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%':      { borderRadius: '40% 60% 60% 40% / 70% 30% 50% 60%' },
          '75%':      { borderRadius: '60% 40% 40% 60% / 40% 70% 60% 30%' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'typing': {
          '0%':   { content: "''" },
          '33%':  { content: "'.'" },
          '66%':  { content: "'..'" },
          '100%': { content: "'...'" },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
