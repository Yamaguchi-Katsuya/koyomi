/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'd-gray': '#999999',
        'l-gray': '#CCCCCC',
      },
      fontFamily: {
        kiwi: ['Kiwi Maru', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
