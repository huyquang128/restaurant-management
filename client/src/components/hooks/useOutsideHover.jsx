import { useEffect, useRef } from 'react';

function useOutsideHover(onOutsideHover) {
    const refHover = useRef();

    useEffect(() => {
        const handleHover = (event) => {
            if (
                refHover.current &&
                !refHover.current.contains(event.relatedTarget)
            ) {
                onOutsideHover();
            }
        };
        if (refHover.current) {
            refHover.current.addEventListener('mouseleave', handleHover);
        }

        return () => {
            if (refHover.current) {
                refHover.current.removeEventListener('mouseleave', handleHover);
            }
        };
    }, [onOutsideHover]);
    return { refHover };
}

export default useOutsideHover;
