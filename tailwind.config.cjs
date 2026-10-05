/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#063574',
        secondary: '#24A3C6',
        darkText: '#011430',
        lightText: '#01143080',
        accentText: '#011430BF',
        background: 'var(--background)',
        lightCard: '#B7EFFF1F'
      },
      fontWeight: {
        black: '900'
      },
      backgroundImage: {
        'line-mountains-peak': "url('@/assets/images/line-mountains-peak.svg')",
        'line-mountains-horizon':
          "url('@/assets/images/line-mountains-horizon.svg')",
        mountains: "url('@/assets/images/blue-mountains-with-lake.png')",
        footer: "url('@/assets/images/blue-mountains-with-lake-footer.png')",
        'footer-mobile':
          "url('@/assets/images/blue-mountains-with-lake-footer-mobile.png')"
      },
      dropShadow: {
        button: '2px 2px 4px rgba(19, 47, 85, 0.3)',
        'hero-mac': '0px 4px 4px rgba(0, 0, 0, 0.25)',
        'mac-topbar': '0px 2px 2px rgba(0, 0, 0, 0.15)',
        'mac-topbar-button': '0px 2px 4px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: []
}
