import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        futura: [
          "Futura",
          "Futura PT",
          "Avenir Next",
          "Helvetica Neue",
          "Arial",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        sans: [
          "Futura",
          "Futura PT",
          "Avenir Next",
          "Helvetica Neue",
          "Arial",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["40px", { lineHeight: "1.3", fontWeight: "700" }],
        h3: ["32px", { lineHeight: "1.4", fontWeight: "700" }],
        h4: ["24px", { lineHeight: "1.4", fontWeight: "700" }],
        h5: ["20px", { lineHeight: "1.5", fontWeight: "700" }],
        h6: ["18px", { lineHeight: "1.5", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.7", fontWeight: "700" }],
        body: ["16px", { lineHeight: "1.7", fontWeight: "700" }],
        "body-sm": ["14px", { lineHeight: "1.6", fontWeight: "700" }],
        caption: ["12px", { lineHeight: "1.5", fontWeight: "700" }],
      },
      spacing: {
        xs: "4px", // 0.25rem
        sm: "8px", // 0.5rem
        md: "12px", // 0.75rem
        lg: "16px", // 1rem
        xl: "24px", // 1.5rem
        "2xl": "32px", // 2rem
        "3xl": "48px", // 3rem
        "4xl": "64px", // 4rem
        "5xl": "96px", // 6rem
        "6xl": "120px", // 7.5rem
      },
      colors: {
        // Brand Colors with variations
        brand: {
          primary: {
            light: "#4DD0E1",
            main: "#00BCD4", // シアン
            dark: "#0097A7",
            DEFAULT: "#00BCD4",
          },
          secondary: {
            light: "#FFE44D",
            main: "#FFD700", // ゴールド
            dark: "#FFC700",
            DEFAULT: "#FFD700",
          },
        },
        // Neutral Colors
        neutral: {
          white: "#F9FAFB",
          black: "#1F2937",
          "light-cyan": "#f1fdff",
        },
        // Semantic Colors
        success: "#10B981",
        warning: "#FFD700",
        error: "#FF4D4D",
        info: "#00BCD4",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      // テキストストロークユーティリティを追加
      addUtilities({
        ".text-stroke-white": {
          "-webkit-text-stroke": "2px white",
        },
        ".text-stroke-black": {
          "-webkit-text-stroke": "2px black",
        },
        ".text-stroke-1": {
          "-webkit-text-stroke-width": "1px",
        },
        ".text-stroke-2": {
          "-webkit-text-stroke-width": "2px",
        },
        ".text-stroke-3": {
          "-webkit-text-stroke-width": "3px",
        },
        // セクション高さユーティリティを追加
        ".section-height-full": {
          "min-height": "100vh",
        },
        ".section-height-large": {
          "min-height": "90vh",
        },
        ".section-height-medium": {
          "min-height": "80vh",
        },
      });
    }),
  ],
};

export default config;
