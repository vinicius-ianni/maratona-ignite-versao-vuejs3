/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto , sans-serif"
      },
      colors: {
        gray: {
          1: "#09090A",
          2: "#121214",
          4: "#323238",
          5: "#E1E1E6",
          6: "#C4C4CC",
          7: "#8D8D99",
          1: "#09090A"
        },
        greenDark: "#015F43",
        greenN: "#000875F",
        greenL: "#00B37E",
        blueN: "#81D8F7",
        warningD: "#FBA94C",
        errorRed: "#F75A68"
      },
      backgroundImage: {
        blurBg: 'url(/src/assets/blur-background.png)'
      }
    }
  },
  plugins: []
};
