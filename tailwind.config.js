/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        turbo: {
          blue: {
            50: '#f0f7ff',
            100: '#e0eefe',
            200: '#b9ddfe',
            300: '#7cc2fd',
            400: '#36a4fa',
            500: '#0d8af0',
            600: '#006ece',
            700: '#0058a7',
            800: '#064b8a',
            900: '#0a3f72',
          },
          green: {
            50: '#f0fdf6',
            100: '#dcfce9',
            200: '#bbf7d6',
            300: '#86ebb6',
            400: '#4cd892',
            500: '#24bb72',
            600: '#16a34a',
            700: '#158040',
            800: '#16653a',
            900: '#145331',
          },
          gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          }
        }
      },
      boxShadow: {
        'turbo': '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'turbo-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'turbo-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'turbo': '0.5rem',
      },
    },
  },
  plugins: [],
}
