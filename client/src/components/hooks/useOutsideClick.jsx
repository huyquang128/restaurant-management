import { useEffect, useRef } from 'react';

function useOutsideClick(onOutsideClick) {
    const ref = useRef();

    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current || ref.current.contains(event.target)) {
                onOutsideClick(null);
            }
        };

        document.addEventListener('mousedown', handleClick);
        document.addEventListener('touchstart', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    }, [onOutsideClick]);

    return { ref };
}

export default useOutsideClick;
