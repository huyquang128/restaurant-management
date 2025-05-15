import { useEffect } from 'react';

/**
 * Ngăn cuộn trong phần tử con ảnh hưởng đến cha (ví dụ cuộn trong modal, scroll riêng không làm body cuộn)
 * @param {React.RefObject} ref - ref của phần tử con cần ngăn chặn scroll
 */
const useStopScrollPropagation = (ref) => {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const onWheel = (e) => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            const delta = e.deltaY;

            // Cuộn lên đầu và tiếp tục kéo lên nữa => chặn
            if (delta < 0 && scrollTop === 0) {
                e.preventDefault();
                e.stopPropagation();
            }

            // Cuộn xuống đáy và tiếp tục kéo xuống => chặn
            if (delta > 0 && scrollTop + clientHeight >= scrollHeight) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        el.addEventListener('wheel', onWheel, { passive: false });

        return () => {
            el.removeEventListener('wheel', onWheel);
        };
    }, [ref]);
};

export default useStopScrollPropagation;
