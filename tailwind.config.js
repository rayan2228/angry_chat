/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      fontFamily: {
        inter: "Inter, sans-serif",
      },
      colors: {
        primary: "#32375C",
        border_primary: "#D3D3D3",
        textColor: "#222222",
        secondaryTextColor: "#7A7A7A",
      },
      boxShadow: {
        primary_shadow: "0px 9px 30px rgba(0, 0, 0, 0.08)",
        sidebar_shadow: "16px 0px 25px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
