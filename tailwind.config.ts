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
        /* Mappa Roma — saffron accent */
        terracotta: {
          DEFAULT: "#F4A52C",
          light: "#F7C56A",
          dark: "#D4891A",
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
          DEFAULT: "#FAF4EA",
          dark: "#F3E9D8",
        },
        brown: {
          DEFAULT: "#2E241B",
          dark: "#1E160F",
          light: "#6B5847",
        },
        ink: {
          DEFAULT: "#2E241B",
          2: "#6B5847",
          3: "#9A8978",
        },
        paper: {
          DEFAULT: "#FAF4EA",
          2: "#F3E9D8",
          edge: "#E7D9C2",
        },
        saffron: {
          DEFAULT: "#F4A52C",
          light: "#F7C56A",
          dark: "#D4891A",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        grotesk: ["Bricolage Grotesque", "DM Sans", "sans-serif"],
        hand: ["Caveat", "cursive"],
        mono: ["DM Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
