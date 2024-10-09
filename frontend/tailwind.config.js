/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Paths to your components to include Tailwind CSS
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Customize your color palette, fonts, etc.
      colors: {
        primary: "#1E40AF", // Example custom primary color
        secondary: "#64748B",
      },
    },
  },
  plugins: [],
};
