/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#0A69E3",
        "primary-color-hover": "#02377db9",
        "secondary-color": "#c4c4c475",
        "tab-background": "#c4c4c440",
        "text-color": "#000",
        "table-header": "#c4c4c450",
        "table-body": "#fff",
        "container-background": "#fff",
        "button-bg": "#46749e",
        "cell-loading": "#c4c4c425",
        "modal-bg": "#00000050",
      },
    },
  },
  plugins: [],
};
