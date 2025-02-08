/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#1B1B1B",
        gray: "#A9A9A9",
        white: "#F2F3F4",
        auburn: "#922929",
        red: "#660000",
      },
    },
  },
  plugins: [],
};
