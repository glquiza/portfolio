/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        parchment: {
          DEFAULT: '#F4F0EA',
          50: '#FCFAF7',
          100: '#FAF8F5',
          200: '#EDE8E0',
          300: '#E2DDD5',
          400: '#D4CDC2',
          border: '#DCD7CF',
        },
        charcoal: {
          DEFAULT: '#111111',
          muted: '#4B4944',
          subtle: '#78736B',
          light: '#A8A29E',
        },
        terracotta: {
          DEFAULT: '#D97746',
          hover: '#C86737',
          light: '#F5ECE6',
        }
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
