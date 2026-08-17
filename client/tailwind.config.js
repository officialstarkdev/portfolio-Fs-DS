/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0a',
          900: '#101010',
          850: '#141414',
          800: '#1a1a1a',
          700: '#242424',
        },
        bone: {
          100: '#f2ede4',
          300: '#cfc8bb',
          500: '#8f8a80',
        },
        gold: {
          300: '#e8cf9a',
          400: '#d4af7a',
          500: '#c9a961',
          600: '#a8874a',
          700: '#7d6537',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Satoshi"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
}
