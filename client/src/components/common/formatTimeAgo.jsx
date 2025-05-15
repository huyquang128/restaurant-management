import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

// Clone locale vi và sửa hàm formatDistance
const customVi = {
    ...vi,
    formatDistance: (token, count, options) => {
        const result = vi.formatDistance(token, count, options);
        // Loại bỏ chữ "khoảng" nếu có
        return result.replace(/^khoảng\s/, '');
    },
};

// Hàm format
export const formatTimeAgo = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
        locale: customVi,
    });
};
