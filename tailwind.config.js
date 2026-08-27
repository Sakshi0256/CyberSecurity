/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      colors: {
        cyber: {
          50: "#e8f8ff",
          100: "#c9efff",
          200: "#9ee2ff",
          300: "#61d0ff",
          400: "#21b8ff",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
      },

      boxShadow: {
        cyber: "0 0 50px rgba(33, 184, 255, 0.15)",
      },
    },
  },

  plugins: [],
};
