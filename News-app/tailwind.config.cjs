/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#121212',
        'ink-soft': '#4a4a4a',
        meta: '#6b6b6b',
        paper: '#ffffff',
        'paper-tint': '#f4f4f2',
        rule: '#dcdcdc',
        navy: '#052962',
        blue: '#1b5fae',
        highlight: '#ffe500',
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'Times New Roman', 'serif'],
        body: ['"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        content: '1180px',
      },
    },
  },
  plugins: [],
}
