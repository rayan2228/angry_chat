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
        // shadow: "#000000",
        textColor: "#222222",
        secondaryTextColor: "#7A7A7A",
      },
    },
  },
  plugins: [],
};
