module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "theo-dark-navy": "#131517",
        "theo-navy": "#2f455c",
        "theo-cyan": "#50aecb",
        "theo-gray": "#333333",
        "theo-light": "rgba(255, 255, 255, 0.6)",
      },
    },
  },
  plugins: [],
};
