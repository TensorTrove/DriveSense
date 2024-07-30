/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 0 45px rgba(255, 255, 255, 0.158)',
      }
    },
    fontFamily:{
      rubix: ["Rubik", "sans-serif"],
      poppins:["Poppins", "sans-serif"]
    }
  },
  plugins: [],
}


