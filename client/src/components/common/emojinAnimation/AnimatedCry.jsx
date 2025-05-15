import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import cry from '@/emojiJS/cry.json';

const AnimatedCry = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: cry, // đường dẫn file JSON
        });

        return () => anim.destroy(); // cleanup khi unmount
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-[47px] h-[47px] rounded-full overflow-hidden -translate-y-1.5"
        />
    );
};

export default AnimatedCry;
