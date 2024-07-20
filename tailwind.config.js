/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    { pattern: /^border-/ },
    { pattern: /^bg-/ },
    { pattern: /^text-/ },
  ],
  theme: {
    extend: {
      colors: {
        'l-gray': '#CCCCCC',
        'd-gray': '#999999',
      },
      fontFamily: {
        kiwi: ['Kiwi Maru', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      width: {
        'md-circle': '850px',
      },
      height: {
        'md-circle': '850px',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
