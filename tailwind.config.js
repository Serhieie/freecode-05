/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./components/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textColor: " #94a3b8",
        mainColor: "#e0e0e0",
        neutralGrey: "#f2f2f2",
        whiteGrey: "#fafafa",
        lightColor: "#f3f4f6",
        mainOrange: "rgb(214, 122, 89)",
      },
      screens: {
        lg: { max: "1023px" },
        md: { max: "768px" },
        sm: { max: "519px" },
        ssm: { max: "375px" },
        sm2: { min: "520px", max: "767px" },
        largeScreen: { min: "1399px" },
        extraLargeScreen: { min: "1540px" },
      },
      fontFamily: {
        bigFont: "Bebas Neue, sans-serif",
        digital: "Digital-7, sans-serif",
        arcade: "ARKADE, sans-serif",
      },
      lineHeight: {
        "extra-tight": "0.75",
        12: "3rem",
      },
    },
  },
  plugins: [],
};
