/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f3ff',
          100: '#ebe9fe',
          200: '#d9d6fe',
          300: '#beb4fd',
          400: '#9d86fa',
          500: '#7c52f5',
          600: '#6d33eb',
          700: '#5d22d4',
          800: '#4e1bb2',
          900: '#411891',
        },
        accent: {
          yellow: '#fbbf24',
          orange: '#f97316',
          pink: '#ec4899',
          teal: '#14b8a6',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['Fredoka', 'Plus Jakarta Sans', 'Outfit', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(124, 82, 245, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 25px rgba(124, 82, 245, 0.35)',
        'card': '0 8px 24px -4px rgba(0, 0, 0, 0.06), 0 4px 8px -2px rgba(0, 0, 0, 0.03)',
        'button': '0 6px 0px 0px rgba(93, 34, 212, 0.9)',
        'button-success': '0 6px 0px 0px rgba(16, 185, 129, 0.9)',
      },
      animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pop': 'pop 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '70%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
