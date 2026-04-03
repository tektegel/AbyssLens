/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0F1A",
        surface: "#121C2D",
        panel: "rgba(26, 36, 54, 0.6)",
        border: "#2A3A54",
        primary: "#E2E8F0",
        secondary: "#64748B",
        accent: "#06B6D4",
        safe: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
