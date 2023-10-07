/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `compatibles/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
  extend: {},
  plugins: ['@tailwindcss/typography'],
}
