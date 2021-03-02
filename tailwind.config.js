module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      scale: {
        100: "1",
        102: "1.02",
        110: "1.05",
        125: "1.25",
        150: "1.5",
        200: "2",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
