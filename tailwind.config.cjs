/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        input: "#f4f4f4",
        lightGray: "#e9e9e9",
        darkGray: "#757575",
        purple: "#a445ed",
        lightBlack: "#2d2d2d",
      },
      width: {
        contained: "min(100% - 3rem, 737px)",
      },
    },
  },
  plugins: [],
};
