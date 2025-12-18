/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cyber-green': '#39FF14',
                'cyber-blue': '#00F9FF',
                'cyber-purple': '#B026FF',
                'dark-bg': '#0a0e27',
                'dark-card': '#1a1f3a',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            backgroundImage: {
                'gradient-cyber': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-neon': 'linear-gradient(90deg, #39FF14 0%, #00F9FF 100%)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
