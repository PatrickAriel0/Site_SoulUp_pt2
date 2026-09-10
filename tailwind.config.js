/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      
        abyss: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcdbff",
          300: "#8ec5ff",
          400: "#59a5ff",
          500: "#3382fc",
          600: "#0047ab",
          700: "#003a8c",
          800: "#053071",
          900: "#0a2a5e",
          950: "#061a3d",
        },

        eco: {
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },

        neon: {
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
        },
        ink: {
          900: "#020617",
          850: "#050b18",
          800: "#0b1220",
          700: "#131c2e",
        },
      },
      fontFamily: {
        sans: ["Ubuntu", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.75" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "grow-bar": {
          "0%": { width: "0%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "grow-bar": "grow-bar 0.9s ease-out both",
      },
      backgroundImage: {
        "grid-tech":
          "linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
    },
  },
  plugins: [],
};
