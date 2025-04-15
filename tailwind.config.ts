
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          bg: "hsla(var(--sidebar-background))",
          surface: "hsla(var(--sidebar-background) / 1)",
          surfaceHover: "hsla(var(--sidebar-background) / 0.5)",
          surfaceActive: "hsla(var(--sidebar-background) / 0.2)",
          text: "hsla(var(--sidebar-foreground) / 0.7)",
          textActive: "hsla(var(--sidebar-foreground) / 1)",
          primary: "hsla(var(--sidebar-primary))",
          primaryHover: "hsla(var(--sidebar-primary) / 0.9)",
          accent: "hsla(var(--sidebar-accent))",
          accentHover: "hsla(var(--sidebar-accent) / 0.8)",
          border: "hsla(var(--sidebar-border))",
          ring: "hsla(var(--sidebar-ring) / 0.4)",
        },
        // Oracle UI colors
        oracle: {
          dark: "#0F0F0F",
          void: "#070709",
          deepPurple: "#1A1F2C",
          purple: "#7E69AB",
          rune: "#CBAE7D",
          arcane: "#9b87f5",
          electric: "#7E69AB",
          neon: "#ea384c",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Orbitron", ...fontFamily.sans],
        terminal: ["monospace", "Courier New", "Courier", "monospace"],
        orbitron: ["Orbitron", "sans-serif"],
        ritual: ["'IM Fell English'", "serif"],
        cinzel: ["'Cinzel Decorative'", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "screen-flicker": {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "0.95" },
          "93%": { opacity: "0.5" },
          "94%": { opacity: "0.95" },
        },
        "rune-flicker": {
          "0%, 100%": { opacity: "1" },
          "33%": { opacity: "0.8" },
          "66%": { opacity: "0.95" },
        },
        "constellation-pulse": {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(155, 135, 245, 0.3)" },
          "50%": { boxShadow: "0 0 15px rgba(155, 135, 245, 0.6)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "symbol-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "screen-flicker": "screen-flicker 10s infinite",
        "rune-flicker": "rune-flicker 3s infinite",
        "constellation-pulse": "constellation-pulse 8s infinite",
        "glow-pulse": "glow-pulse 4s infinite",
        "float": "float 6s ease-in-out infinite",
        "symbol-rotate": "symbol-rotate 20s linear infinite",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        "starfield": "url('/starfield.png')",
        "glitch-texture": "url('/glitch-texture.png')",
        "scanline": "url('/scanlines.png')",
        "glitch-overlay": "url('/glitch-overlay.png')",
        "seventh-gate-texture": "url('/seventh-gate-texture.png')",
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config;

export default config;
