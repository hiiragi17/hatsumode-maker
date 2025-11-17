/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        shrine: {
          red: '#D32F2F',
          darkRed: '#B71C1C',
          gold: '#FFD700',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'torii-pattern': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      },
    },
  },
  plugins: [],
}
