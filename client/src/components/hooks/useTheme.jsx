import { useEffect } from 'react';

const useTheme = (theme) => {
    useEffect(() => {
        const htmElement = document.documentElement;

        const updateTheme = (currentTheme) => {
            if (currentTheme === 'dark') {
                htmElement.classList.add('dark');
            } else if (currentTheme === 'light') {
                htmElement.classList.remove('dark');
            } else if (currentTheme === 'device') {
                const prefersDarkMode = window.matchMedia(
                    '(prefers-color-scheme: dark)'
                );
                htmElement.classList.toggle('dark', prefersDarkMode.matches);

                const handleSystemThemeChange = (event) => {
                    htmElement.classList.toggle('dark', event.matches);
                };

                prefersDarkMode.addEventListener(
                    'change',
                    handleSystemThemeChange
                );

                return () => {
                    prefersDarkMode.removeEventListener(
                        'change',
                        handleSystemThemeChange
                    );
                };
            }
        };

        const cleanup = updateTheme(theme);

        return () => {
            if (typeof cleanup === 'function') cleanup();
        };
    }, [theme]);
};

export default useTheme;
