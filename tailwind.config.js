/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neuro: {
          darkBg: "var(--neuro-bg)",
          darkBgLight: "var(--neuro-bg-light)",
          cardBg: "var(--neuro-card-bg)",
          border: "var(--neuro-border)",
          primary: "var(--neuro-primary)",
          primaryHover: "var(--neuro-primary-hover)",
          accent: "var(--neuro-accent)",
          accentHover: "var(--neuro-accent-hover)",
          highlight: "var(--neuro-highlight)",
          magenta: "var(--neuro-magenta)",
          textPrimary: "var(--neuro-text-primary)",
          textSecondary: "var(--neuro-text-secondary)",
          textMuted: "var(--neuro-text-muted)"
        }
      },
      fontFamily: {
        title: ["Outfit", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glassHover: "0 8px 32px 0 rgba(63, 55, 201, 0.2)",
        glow: "0 0 20px rgba(63, 55, 201, 0.35)"
      },
      backdropBlur: {
        glass: "16px"
      }
    }
  },
  plugins: []
}
