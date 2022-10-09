/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './public/**/*.html', './src/**/*.{js,jsx,ts,tsx,html}'],
    //darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            keyframes: {
                'slide-down': {
                    '0%': { opacity: 0, transform: 'translateY(-10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            },
            animation: {
                'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                'fade-in': 'fade-in 0.7s cubic-bezier(0.73, 0, 0.36, 0)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms')({ strategy: 'class' }),
    ],
};
