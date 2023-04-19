module.exports = {

  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        coral: "#FF8A65",
        blue: "#039BE5",
        navy: "#2C384A",
        gray: "#ECEFF1",
        white: "white",
        lightGray: "#808080",
        yellow: "#FFCA28",
      },
    },


  },

  variants: {
    extend: {},
  },
  plugins: [],
};
