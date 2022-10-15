/** @type {import('tailwindcss').Config} */

const SVG = require('mini-svg-data-uri');

const cursorMove = `url("${SVG(`
<svg id="Layer_4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#fffc" d="M16.54 22.8a.49.49 0 0 1-.35-.15l-2.49-2.47c-.14-.14-.19-.36-.11-.55s.26-.31.46-.31h1.72v-2.44h-2.43v1.73c0 .2-.12.39-.31.46a.51.51 0 0 1-.55-.11l-2.47-2.49a.5.5 0 0 1 0-.7l2.47-2.49a.5.5 0 0 1 .55-.11.5.5 0 0 1 .31.46v1.72h2.43v-2.43h-1.72c-.2 0-.39-.12-.46-.31s-.03-.4.11-.55l2.49-2.47a.5.5 0 0 1 .7 0l2.49 2.47c.14.14.19.36.11.55s-.26.31-.46.31H17.3v2.43h2.44v-1.72c0-.2.12-.39.31-.46.19-.08.4-.03.55.11l2.47 2.49a.5.5 0 0 1 0 .7l-2.47 2.49a.5.5 0 0 1-.55.11.5.5 0 0 1-.31-.46v-1.73H17.3v2.44h1.73c.2 0 .39.12.46.31s.03.4-.11.55l-2.49 2.47c-.1.1-.22.15-.35.15Z"/>
  <path d="M20.24 18.62v-2.23H16.8v3.44h2.23l-2.49 2.47-2.49-2.47h2.22v-3.44h-3.43v2.23l-2.47-2.49 2.47-2.49v2.22h3.43v-3.43h-2.22l2.49-2.47 2.49 2.47H16.8v3.43h3.44v-2.22l2.47 2.49-2.47 2.49z"/>
  <path fill="#fffc" d="M.5 17.03a.4.4 0 0 1-.19-.04.5.5 0 0 1-.31-.46V.5C0 .3.12.12.31.04a.5.5 0 0 1 .55.11l10.67 10.57a.5.5 0 0 1-.3.85l-5.61.64-4.77 4.68a.5.5 0 0 1-.35.14Z"/>
  <path d="M.5.5v16.03l4.89-4.8 5.79-.65L.5.5z"/>
</svg>
`)}") 0 0, auto`;

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
            cursor: {
                'tm-move': cursorMove,
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
