import { useEffect, useRef } from 'react';

function useOutsideHover2(setCloseAnimation) {
    const refHover = useRef();

    useEffect(() => {
        const handleHover = (event) => {
            if (
                refHover.current &&
                !refHover.current.contains(event.relatedTarget)
            ) {
                setCloseAnimation(false);
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
    }, [setCloseAnimation]);
    return { refHover };
}

export default useOutsideHover2;
