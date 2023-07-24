/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./scripts/*.js", "./*.html"],
  theme: {
    extend: {
      colors: {
        'bg-sky-500': '#00aeec'
      }
    },
    plugins: [],
  }
}

