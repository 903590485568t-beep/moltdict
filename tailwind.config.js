/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'wonky': ['"Gochi Hand"', 'cursive'],
      },
      colors: {
        'claw-bg': '#0f0505', // Deep Dark Red-Black (Softer than pure black)
        'claw-card': '#1a0b0b', // Card background
        'claw-primary': '#ff4d4d', // Softer Red
        'claw-secondary': '#800000', // Dark Red
        'claw-border': '#ff4d4d', // Red border
        'claw-text': '#ffecec', // Off-white text
        'claw-dim': '#b38080', // Dimmed text
      }
    },
  },
  plugins: [],
}
