module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: {
          DEFAULT: '#13131A',
          hover: '#1A1A23',
          active: '#22222C',
        },
        accent: {
          blue: '#2563EB',
          purple: '#8B5CF6',
          hover: {
            blue: '#1D4ED8',
            purple: '#7C3AED',
          }
        }
      },
    },
  },
  plugins: [],
} 