/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fef3ee',
          100: '#fde4d3',
          500: '#f97316',
          600: '#ea6c10',
          700: '#c05a0d',
        },
      },
    },
  },
  plugins: [],
}
