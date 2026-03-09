/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#313131',
          950: '#1a1a1a',
          400: '#AAAAAA',
          300: '#cccccc',
        },
        blue: {
          500: '#007AFF',
          600: '#0056b3',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      height: {
        '[42px]': '42px',
      },
      spacing: {
        '1px': '1px',
      }
    },
  },
  plugins: [],
}
