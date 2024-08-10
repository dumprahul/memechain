import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        library: ['LibraryRecords', 'sans-serif'],
        // 'sf-pro': ['"SF Pro Display Bold"', 'sans-serif'],
      },
      backgroundImage :{
        'hero-bg': "url('/src/assets/anime.jpg')",
      },
    },
  },
  plugins: [
    daisyui
  ],

 

}