/** @type {import('tailwindcss').Config} */

const SVG = require('mini-svg-data-uri');

const cursorMove_old = `url("${SVG(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M.6.55V14.2l.84-.07 3.65-4.01 4.91.02-.16-.5L1.02.71.6.55z"/>
        <path fill="#fffc" d="m.6.55.42.15 8.82 8.94.15.5-4.91-.02-3.64 4.01-.83.07V.55m0-.5c-.1 0-.2.03-.29.09a.5.5 0 0 0-.21.41V14.2c0 .14.06.27.16.37.09.09.21.13.34.13h.04l.83-.07a.52.52 0 0 0 .33-.16l3.51-3.84 4.68.02c.16 0 .31-.07.4-.2a.53.53 0 0 0 .08-.44l-.15-.5a.55.55 0 0 0-.12-.21L1.38.35A.57.57 0 0 0 1.2.23L.77.08A.5.5 0 0 0 .6.05Z"/>
        <path d="m22.43 15.19-2.23-2.34v1.85h-3.67v-3.67h1.85L16.01 8.8l-2.33 2.23h1.85v3.67h-3.67v-1.85l-2.24 2.37 2.24 2.33V15.7h3.67v3.67h-1.85l2.37 2.24 2.33-2.24h-1.85V15.7h3.67v1.85l2.23-2.36z"/>
        <path fill="#fffc" d="m16.01 8.8 2.36 2.23h-1.85v3.67h3.67v-1.85l2.23 2.33-2.23 2.36v-1.85h-3.67v3.67h1.85l-2.33 2.23-2.36-2.23h1.85v-3.67h-3.67v1.85l-2.23-2.33 2.23-2.36v1.85h3.67v-3.67h-1.85l2.33-2.23m0-.5a.54.54 0 0 0-.35.14l-2.33 2.23a.51.51 0 0 0-.12.55.5.5 0 0 0 .46.31h1.35v2.67h-2.67v-1.35c0-.2-.12-.39-.32-.46a.58.58 0 0 0-.18-.04.46.46 0 0 0-.36.16l-2.23 2.36a.5.5 0 0 0 0 .69l2.23 2.33c.1.1.23.15.36.15.06 0 .13-.01.19-.04a.5.5 0 0 0 .31-.46v-1.35h2.67v2.67h-1.35c-.2 0-.39.12-.46.32a.5.5 0 0 0 .12.55l2.36 2.23c.1.09.22.14.34.14s.25-.05.35-.14l2.33-2.23a.51.51 0 0 0 .12-.55.5.5 0 0 0-.46-.31h-1.35V16.2h2.67v1.35c0 .2.12.39.32.46.06.02.12.04.18.04.13 0 .27-.05.36-.16l2.23-2.36a.5.5 0 0 0 0-.69l-2.23-2.33a.5.5 0 0 0-.36-.15.43.43 0 0 0-.19.04.5.5 0 0 0-.31.46v1.35h-2.67v-2.67h1.35c.2 0 .39-.12.46-.32a.5.5 0 0 0-.12-.55l-2.36-2.23a.51.51 0 0 0-.34-.14Z"/>
    </svg>
`)}") 0 0, auto`;

const cursorMove = `url("${SVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#fffd" d="M.79 17.58h-.1l-.19-.06a.75.75 0 0 1-.46-.69V.8C.04.5.22.23.5.11L.59.07l.2-.02c.2 0 .39.08.53.22l10.67 10.58c.2.2.27.51.18.78a.75.75 0 0 1-.62.5l-5.53.63-4.7 4.61a.73.73 0 0 1-.52.21Z"/>
  <path d="M1.04 1.4v14.84l4.53-4.44 5.35-.61L1.04 1.4z"/>
  <path fill="#fffd" d="M16.54 22.8a.49.49 0 0 1-.35-.15l-2.49-2.47c-.14-.14-.19-.36-.11-.55s.26-.31.46-.31h1.72v-2.44h-2.43v1.73c0 .2-.12.39-.31.46a.51.51 0 0 1-.55-.11l-2.47-2.49a.5.5 0 0 1 0-.7l2.47-2.49a.5.5 0 0 1 .55-.11.5.5 0 0 1 .31.46v1.72h2.43v-2.43h-1.72c-.2 0-.39-.12-.46-.31s-.03-.4.11-.55l2.49-2.47a.5.5 0 0 1 .7 0l2.49 2.47c.14.14.19.36.11.55s-.26.31-.46.31H17.3v2.43h2.44v-1.72c0-.2.12-.39.31-.46.19-.08.4-.03.55.11l2.47 2.49a.5.5 0 0 1 0 .7l-2.47 2.49a.5.5 0 0 1-.55.11.5.5 0 0 1-.31-.46v-1.73H17.3v2.44h1.73c.2 0 .39.12.46.31s.03.4-.11.55l-2.49 2.47c-.1.1-.22.15-.35.15Z"/>
  <path d="M20.24 18.62v-2.23H16.8v3.44h2.23l-2.49 2.47-2.49-2.47h2.22v-3.44h-3.43v2.23l-2.47-2.49 2.47-2.49v2.22h3.43v-3.43h-2.22l2.49-2.47 2.49 2.47H16.8v3.43h3.44v-2.22l2.47 2.49-2.47 2.49z"/>
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
