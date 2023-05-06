const { blackA, violet, mauve, slateA, slateDarkA } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...violet,
        ...mauve,
        ...slateA,
        ...slateDarkA
      },
    },
  },
  plugins: [],
};
