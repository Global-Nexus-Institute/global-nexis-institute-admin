/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gnpurple: "#A050C9",
        gnblueLight: "#2EB9C2",
        gntextblue: "#04F3D8",
        gnpink: "#D0376E",
        gnpinkdark: "#6A1C38",
        gndarkblue: "#19173C",
      },
    },
  },
  plugins: [],
};

