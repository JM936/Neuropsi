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
          darkBg: "#03071E",       // Fundo super escuro premium
          darkBgLight: "#0A0F2C",  // Variação de fundo para gradientes
          cardBg: "rgba(10, 20, 60, 0.45)", // Glassmorphism escuro para os cards
          border: "rgba(99, 102, 241, 0.15)", // Borda de destaque
          primary: "#3F37C9",      // Azul marinho/indigo vibrante
          primaryHover: "#4895EF", // Azul claro hover
          accent: "#10B981",       // Verde esmeralda (Saúde e Educação)
          accentHover: "#059669",
          highlight: "#F59E0B",    // Dourado/Âmbar
          magenta: "#D90429",       // Vermelho/Magenta vibrante do cérebro
          textPrimary: "#F8FAFC",  // Slate-50
          textSecondary: "#94A3B8", // Slate-400
          textMuted: "#64748B"     // Slate-500
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
