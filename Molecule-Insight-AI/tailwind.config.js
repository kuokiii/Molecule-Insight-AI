/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        gridTemplateColumns: {
          '18': 'repeat(18, minmax(0, 1fr))',
        },
        borderColor: {
          DEFAULT: 'hsl(var(--border))',
        },
      },
    },
    plugins: [],
  }
  
  