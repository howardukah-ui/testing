import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
          soft: '#FFEDD5'
        },
        charcoal: '#1F2937',
        cream: '#FFFAF5',
        primary: {
          DEFAULT: '#F97316',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#FFF5EB',
          foreground: '#1F2937'
        },
        accent: {
          DEFAULT: '#FFF1E4',
          foreground: '#1F2937'
        },
        background: '#FFFAF5',
        foreground: '#1F2937',
        muted: {
          DEFAULT: '#F3EDE6',
          foreground: '#6B7280'
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1F2937'
        },
        border: '#E5E7EB',
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF'
        },
        sidebar: {
          DEFAULT: '#FFFFFF',
          border: '#E5E7EB',
          foreground: '#4B5563',
          accent: '#FFF7ED',
          'accent-foreground': '#EA580C',
        },
        chart: {
          1: '#F97316',
          2: '#10B981',
          3: '#3B82F6',
          4: '#F59E0B',
          5: '#8B5CF6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      borderRadius: {
        xl: '20px'
      },
      boxShadow: {
        soft: '0 4px 14px rgba(31, 41, 55, 0.08)',
        card: '0 12px 30px rgba(31, 41, 55, 0.1)'
      }
    }
  },
  plugins: [],
} satisfies Config
