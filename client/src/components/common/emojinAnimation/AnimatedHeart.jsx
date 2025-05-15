import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import heart from '@/emojiJS/heart.json';

const AnimatedHeart = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: heart, // đường dẫn file JSON
        });

        return () => anim.destroy(); // cleanup khi unmount
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-[35px] h-[35px] rounded-full overflow-hidden 
                       translate-y-1"
        />
    );
};

export default AnimatedHeart;
