/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'opacity-60',
    'transition-shadow',
  ],
  theme: {
    extend: {
      fontFamily: {
        'title': ['var(--font-permanent-marker)', 'cursive'],
        'body': ['var(--font-abeezee)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}