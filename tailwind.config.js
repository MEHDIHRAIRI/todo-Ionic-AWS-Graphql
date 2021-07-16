// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage:{
        'hello': "url('/src/ressource/img/background.jpg')",
        'background-repeat':"no-repeat",
        'width': "100%",
        'height': "100%",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}