import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: "#C85A2C",
          light: "#E07A4A",
          dark: "#A04520",
        },
        sage: {
          DEFAULT: "#8B9B6A",
          light: "#A8B88A",
          dark: "#6B7A4F",
        },
        rose: {
          mappa: "#D4A9A5",
        },
        cream: {
          DEFAULT: "#FBF5EC",
          dark: "#F0E6D3",
        },
        brown: {
          DEFAULT: "#3D2B1F",
          dark: "#2C1A0E",
          light: "#7A5C48",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
