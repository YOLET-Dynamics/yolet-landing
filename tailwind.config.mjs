/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        mainYellow: {
          500: "#FFCF40",
          700: "#DFA700",
        },
        mainBlack: {
          500: "#000000",
        },
        ashGray: {
          500: "#36454F",
        },
      },
      fontFamily: {
        anonymous: ["Anonymous Pro", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
