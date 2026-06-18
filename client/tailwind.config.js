/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4f46e5', // Indigo
          secondary: '#9333ea', // Purple
          accent: '#ea580c', // Orange
        }
      }
    },
  },
  plugins: [],
}


