/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#063574',
        secondary: '#24A3C6',
        navy: '#203C64',
        ink: '#011430',
        night: '#04132B',
        sky: '#B8E9EE',
        background: 'var(--background)',
        line: '#E2E8EF'
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
