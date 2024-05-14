/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, rgba(0, 0, 0, 0) 45.17%, rgba(0, 0, 0, 0.3) 100%)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

