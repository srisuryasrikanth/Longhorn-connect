import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        burnt: "#BF5700",
        ember: "#8F3900",
        cream: "#FFF8EE",
        slate: "#1D2A32",
        sand: "#E9D8BF",
        sage: "#6F8C7A"
      },
      boxShadow: {
        panel: "0 20px 60px rgba(29, 42, 50, 0.12)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at top left, rgba(191, 87, 0, 0.22), transparent 40%), radial-gradient(circle at bottom right, rgba(111, 140, 122, 0.2), transparent 35%)"
      }
    }
  },
  plugins: []
};

export default config;

