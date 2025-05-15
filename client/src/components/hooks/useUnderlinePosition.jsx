import { useEffect, useRef, useState } from 'react';

export const useUnderlinePosition = (activeIndex, dependencies = []) => {
    const itemsRef = useRef([]);
    const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const el = itemsRef.current[activeIndex];
        if (el) {
            const { offsetLeft, offsetWidth } = el;
            setUnderlineProps({ left: offsetLeft, width: offsetWidth });
        }
    }, [activeIndex, ...dependencies]);

    return { itemsRef, underlineProps };
};
