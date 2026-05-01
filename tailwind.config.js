/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5E9",
        accent: "#10B981",
        bg: "#FFFFFF",
      },
    },
  },
  plugins: [],
}
