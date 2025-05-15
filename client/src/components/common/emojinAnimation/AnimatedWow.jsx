import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import wow from '@/emojiJS/wow.json';

const AnimatedWow = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: wow, // đường dẫn file JSON
        });

        return () => anim.destroy(); // cleanup khi unmount
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-[41px] h-[41px] rounded-full overflow-hidden"
        />
    );
};

export default AnimatedWow;
