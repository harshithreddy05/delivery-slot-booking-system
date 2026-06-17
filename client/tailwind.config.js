/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#0EA5E9",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        appBg: "#F8FAFC",
        cardBg: "#FFFFFF"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.10)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
