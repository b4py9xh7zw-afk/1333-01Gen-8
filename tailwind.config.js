/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: '16px',
      screens: {
        sm: '100%',
        md: '480px',
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#FFF3EE',
          100: '#FFE2D5',
          200: '#FFC5AB',
          300: '#FFA77D',
          400: '#FF8956',
          500: '#FF6B35',
          600: '#E85624',
          700: '#C9441A',
          800: '#A63513',
          900: '#82290E',
        },
        secondary: {
          50: '#EEF5FD',
          100: '#D6E7F7',
          200: '#AECFEF',
          300: '#7FB3E4',
          400: '#5AA0DD',
          500: '#4A90D9',
          600: '#3A7CC2',
          700: '#2E68A6',
          800: '#245487',
          900: '#1A4068',
        },
        success: {
          50: '#F0FBE8',
          100: '#DBF5C8',
          200: '#B8EB95',
          300: '#95E064',
          400: '#73D637',
          500: '#52C41A',
          600: '#42A115',
          700: '#337E10',
          800: '#255B0C',
          900: '#183D08',
        },
        warning: {
          50: '#FFF7E6',
          100: '#FFEBB8',
          200: '#FFDC7A',
          300: '#FFCC3D',
          400: '#FFC00A',
          500: '#FAAD14',
          600: '#D88B0B',
          700: '#B06D06',
          800: '#8A5204',
          900: '#613902',
        },
        background: {
          DEFAULT: '#F8F9FA',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        rounded: ['"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 16px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'bounce-in': 'bounceIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
