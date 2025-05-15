/** @type {import('tailwindcss').Config} */

export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xs: '480px',
            sm: '768px',
            md: '1024px',
            lg: '1200px',
            xl: '1400px',
        },
        extend: {
            keyframes: {
                bounceScale: {
                    '0%': { transform: 'scale(0)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                },
            },

            animation: {
                bounceScale: 'bounceScale 0.4s ease-out',
            },

            colors: {
                // dark-light mode colors
                'bg-primary': 'var(--bg-primary)',
                'bg-secondary': 'var(--bg-secondary)',
                'bg-tertiary': 'var(--bg-tertiary)',
                'bg-four': 'var(--bg-four)',
                'bg-blue': 'var(--bg-blue)',
                'bg-red': 'var(--bg-red)',
                'bg-gray': 'var(--bg-gray)',
                'bg-green': 'var(--bg-green)',
                'text-primary': 'var(--text-primary)',
                'color-active': 'var(--color-active)',
                'color-active-2': 'var(--color-active-2)',
                'border-primary': 'var(--border-primary)',

                'yellow-primary': '#cfa670',

                'gray-primary': '#777777',
                'gray-secondary': '#bbbbbb',

                'black-primary': '#151515',
                'black-secondary': '#212121',

                'green-primary': '#22c55e',

                'blue-primary': '#55afe2',
            },
            fontFamily: {
                cabin: ['Cabin', 'serif'],
                oswald: ['Oswald', 'serif'],
                great: ['Great Vibes', 'serif'],
                Playball: ['Playball', 'cursive'],
            },
            width: {
                xs: '100%',
                sm: '425px',
                md: '690px',
                lg: '930px',
                xl: '1140px',
            },
            boxShadow: {
                'header-shadow': '1px 0px 5px 2px rgba(0,0,0,0.1)',
                'img-shadow':
                    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
            },
            spacing: {},
        },
    },
    plugins: [],
};
