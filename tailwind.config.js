/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope-Light'],
        'manrope-md': ['Manrope-Medium'],
        'manrope-lg': ['Manrope-Semibold'],
        'manrope-xl': ['Manrope-Bold'],
      },
      colors: {
        'primary-light': 'var(--primary-light)',
        'primary-dark': 'var(--primary-dark)',
        'glass-light': 'rgba(217, 217, 217, .2)',
        'glass-medium': 'rgba(217, 217, 217, .3)',
        'glass-dark': 'rgba(217, 217, 217, .5)',
      },
      width: {
        25: '100px',
      },
    },
  },
  plugins: [],
}
