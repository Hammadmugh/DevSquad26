/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dist/**/*.{html,js}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '[174px]': '174px',
        '[22px]': '22px',
        '[255px]': '255px',
        '[80px]': '80px',
        '[91px]': '91px',
        '[55px]': '55px',
        '[87px]': '87px',
        '[186px]': '186px',
        '[32px]': '32px',
        '[16px]': '16px',
        '[84px]': '84px',
        '[78px]': '78px',
        '[107px]': '107px',
        '[40px]': '40px',
        '[20px]': '20px',
        '[66px]': '66px',
        '[54px]': '54px',
        '[672px]': '672px',
        '[417px]': '417px',
        '[420px]': '420px',
        '[670px]': '670px',
        '[409px]': '409px',
      },
    },
  },
  plugins: [],
};

