/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui"

import { withAccountKitUi } from "@account-kit/react/tailwind";

export default withAccountKitUi({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        library: ['LibraryRecords', 'sans-serif'],
        // 'sf-pro': ['"SF Pro Display Bold"', 'sans-serif'],
      },
      backgroundImage :{
        'hero-bg': "url('/assets/anime.jpg')",
      },
    },
  },
  plugins: [
    daisyui
  ],
});
