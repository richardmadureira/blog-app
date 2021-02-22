const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        fontFamily: {
            'font-karla': ['karla']
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.trueGray,
            indigo: colors.indigo,
            red: colors.rose,
            blue: colors.blue,
            teal: colors.teal,
            yellow: colors.amber
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}