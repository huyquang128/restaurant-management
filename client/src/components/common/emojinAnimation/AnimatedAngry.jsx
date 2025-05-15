import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import angry from '@/emojiJS/angry.json';

const AnimatedAngry = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: angry, // đường dẫn file JSON
        });

        return () => anim.destroy(); // cleanup khi unmount
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-[30px] h-[30px] rounded-full overflow-hidden translate-y-1.5 "
        />
    );
};

export default AnimatedAngry;
