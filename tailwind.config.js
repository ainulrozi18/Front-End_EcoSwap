/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './src/templates/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#41b06e',
        secondary: '#c1ff72',
        third: '#abc339',
      },
    },
  },
  plugins: [],
};
