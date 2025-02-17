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
            colors: {
                // dark-light mode colors
                'bg-primary': 'var(--bg-primary)',
                'bg-secondary': 'var(--bg-secondary)',
                'bg-tertiary': 'var(--bg-tertiary)',
                'text-primary': 'var(--text-primary)',
                'color-active': 'var(--color-active)',
                'border-primary': 'var(--border-primary)',

                'yellow-primary': '#cfa670',

                'gray-primary': '#777777',
                'gray-secondary': '#bbbbbb',

                'black-primary': '#151515',
                'black-secondary': '#212121',

                'green-primary': '#22c55e',
            },
            fontFamily: {
                cabin: ['Cabin', 'serif'],
                oswald: ['Oswald', 'serif'],
                great: ['Great Vibes', 'serif'],
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
            },
            spacing: {},
        },
    },
    plugins: [],
};
