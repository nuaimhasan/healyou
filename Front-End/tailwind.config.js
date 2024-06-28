export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        neutral: "#404145",
        "neutral-content": "#7a7a7a",
        "base-100": "#ffffff",
      },
    },
  },
  plugins: [],
};
