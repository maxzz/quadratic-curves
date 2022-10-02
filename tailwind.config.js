module.exports = {
    content: ['./index.html', './public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
    //darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms')({ strategy: 'class' }),
    ],
};
