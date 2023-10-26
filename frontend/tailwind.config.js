/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        ["primary-900"]: "#0066FF",
        ["primary-800"]: "#1e293b",
        ["primary-700"]: "#334155",
        ["primary-600"]: "#475569",
        ["primary-500"]: "#64748b",
        ["primary-400"]: "#94a3b8",
        ["primary-300"]: "#cbd5e1",
        ["primary-200"]: "#e2e8f0",
        ["primary-100"]: "#f1f5f9",
        secondary: "#FFFFFF",
      },
      fontFamily: {
        sans: ['"Archivo"'],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
