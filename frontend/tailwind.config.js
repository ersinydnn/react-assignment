/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DA57A",
        secondary: "#FF5733",
        accent: "#0056D2",
      },
      borderColor: {
        primary: "#1DA57A",
      },
    },
  },
  plugins: [],
};
