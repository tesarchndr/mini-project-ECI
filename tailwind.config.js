/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
      softblue: {
          50: '#E0F7FA',
          100: '#B3E5FC',
          200: '#81D4FA',
          300: '#4FC3F7',
          400: '#29B6F6',
          500: '#03A9F4',
        }
      },
      spacing: {
        'word-sm': '0.1rem',
        'word-md': '0.2rem',
        'word-lg': '0.4rem',
      },
    },
  },
  plugins: [],
}

