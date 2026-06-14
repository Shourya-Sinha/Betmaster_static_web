/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        dark: '#0A0E27',
        darker: '#060918',
        card: '#1A1F4E',
        gold: '#FFD700',
        accent: '#2196F3',
        danger: '#FF4444',
        orange: '#FF9800',
      },
    },
  },
  plugins: [],
};