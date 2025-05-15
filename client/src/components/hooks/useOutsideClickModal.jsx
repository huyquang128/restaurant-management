import { useEffect, useRef } from 'react';

function useOutsideClickModal(ref, onClose) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Kiểm tra nếu click bên ngoài element
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onClose]);
}

export default useOutsideClickModal;
