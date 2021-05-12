const defaultConfig = require("tailwindcss/defaultConfig");
const formsPlugin = require("@tailwindcss/forms");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["index.html", "src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["Inter var", defaultConfig.theme.fontFamily.sans],
    },
    colors: {
      transparent: "transparent",
      white: colors.white,
      skyScanner: "#0770E3",
      lastMinutes: "#EC008C",
      kayak: "#FF690F",
      goVoyages: "#A5C73C",
      red: colors.red,
      gray: colors.warmGray,
      primary: "#84CC16",
      secondary: "#064E3B",
      tertiary: "#BEF264",
    },
  },
  darkMode: "media",
  plugins: [formsPlugin],
};
