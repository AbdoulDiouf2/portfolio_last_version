/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#090D1A',
        surface: '#0F1729',
        'text-primary': '#F0F0F0',
        'text-muted': '#7A8AAD',
        gold: '#C9993A',
        'accent-blue': '#2A4494',
        border: '#1C2540',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
