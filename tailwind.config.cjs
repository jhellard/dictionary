/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        input: "#f4f4f4",
        lightGray: "#e9e9e9",
        darkGray: "#757575",
        purple: "#a445ed",
        lightBlack: "#2d2d2d",
        darkerBlack: "#1F1F1F",
        veryBlack: "#050505",
      },
      width: {
        contained: "min(100%, 737px)",
      },
      animation: {
        boing: "boing 2s infinite",
      },
      keyframes: {
        boing: {
          "0%, 25%, 50%, 75%, 100%": {
            transform: "translateY(0)",
          },
          "40%": { transform: "translateY(-20px)" },
          "60%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
