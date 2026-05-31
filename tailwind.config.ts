import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0D10",
        surface: "#111317",
        "surface-container-lowest": "#0C0E11",
        "surface-container-low": "#1A1C1F",
        "surface-container": "#1E2023",
        "surface-container-high": "#282A2D",
        "surface-container-highest": "#333538",
        primary: {
          DEFAULT: "#4edea3",
          container: "#10b981",
          dim: "#4edea3",
        },
        secondary: {
          DEFAULT: "#ffb95f",
          container: "#ee9800",
        },
        tertiary: {
          DEFAULT: "#ffb3ad",
          container: "#ff7a73",
        },
        error: {
          DEFAULT: "#ffb4ab",
          container: "#93000a",
        },
        "on-surface": "#e2e2e6",
        "on-surface-variant": "#bbcabf",
        "outline-variant": "#3c4a42",
        "outline": "#86948a",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        "stack-xs": "4px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "stack-lg": "24px",
        "margin-desktop": "32px",
        "margin-mobile": "16px",
        gutter: "16px",
        "rail-width": "64px",
      },
    },
  },
  plugins: [],
};
export default config;
