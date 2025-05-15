import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import haha from '@/emojiJS/haha.json';

const AnimatedHaHa = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: haha, // đường dẫn file JSON
        });

        return () => anim.destroy(); // cleanup khi unmount
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-[40px] h-[40px] rounded-full overflow-hidden"
        />
    );
};

export default AnimatedHaHa;
