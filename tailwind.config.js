/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-pickled': '#2B344B',
        'color-concrete': '#F2F2F2',
        'color-fern': '#65BD65'
      }
    }
  },
  plugins: []
};
