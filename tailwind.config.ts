/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        gray: "#F3F5F8",
        "gray-1": "#6A7988",
        "gray-2": "#728096",
        "gray-3": "#919CAD",
        "gray-4": "#95A6B7",
        card: "rgba(34, 36, 38, 0.15)",
        "card-2": "rgba(255, 255, 255, 0.80)",
        purple: "#5A57CB"
      },
      boxShadow: {
        card: "0px 0px 4px 0px rgba(0, 0, 0, 0.10);"
      }
    },

  },
  plugins: [require("tailwindcss-animate")],
}
