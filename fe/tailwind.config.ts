/** @type {import('tailwindcss').Config} */

import { withAccountKitUi } from "@account-kit/react/tailwind";

export default withAccountKitUi({
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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

});
