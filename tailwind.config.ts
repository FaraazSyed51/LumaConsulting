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
        // OSU Official Colors
        osu: {
          scarlet: {
            DEFAULT: "#BA0C2F",
            dark: {
              40: "#70071C",
              60: "#4A0513",
            },
          },
          gray: {
            DEFAULT: "#A7B1B7",
            light: {
              20: "#D4D9DC",
              40: "#E1E5E8",
              60: "#EEF0F2",
              80: "#F5F6F7",
              90: "#F9FAFA",
            },
            dark: {
              20: "#8E9BA3",
              40: "#75858F",
              60: "#5C6F7B",
              80: "#435967",
            },
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
