import dashboard_black from '@/assets/icon/dashboard_black.svg';
import dashboard_white from '@/assets/icon/dashboard_white.svg';
import dashboard_yellow from '@/assets/icon/dashboard_yellow.svg';
import bill_yellow from '@/assets/icon/bill_yellow.svg';
import bill_white from '@/assets/icon/bill_white.svg';
import bill_black from '@/assets/icon/bill_black.svg';
import menuCall_black from '@/assets/icon/menuCall_black.svg';
import menuCall_white from '@/assets/icon/menuCall_white.svg';
import menuCall_yellow from '@/assets/icon/menuCall_yellow.svg';
import item_yellow from '@/assets/icon/item_yellow.svg';
import item_white from '@/assets/icon/item_white.svg';
import item_black from '@/assets/icon/item_black.svg';
import calendar_black from '@/assets/icon/calendar_black.svg';
import calendar_white from '@/assets/icon/calendar_white.svg';
import calendar_yellow from '@/assets/icon/calendar_yellow.svg';
import discountCode_yellow from '@/assets/icon/discountCode_yellow.svg';
import discountCode_white from '@/assets/icon/discountCode_white.svg';
import discountCode_black from '@/assets/icon/discountCode_black.svg';
import staff_black from '@/assets/icon/staff_black.svg';
import staff_white from '@/assets/icon/staff_white.svg';
import staff_yellow from '@/assets/icon/staff_yellow.svg';
import user_yellow from '@/assets/icon/user_yellow.svg';
import user_black from '@/assets/icon/user_black.svg';
import user_white from '@/assets/icon/user_white.svg';
import system_white from '@/assets/icon/system_white.svg';
import system_black from '@/assets/icon/system_black.svg';
import system_yellow from '@/assets/icon/system_yellow.svg';
import setting_yellow from '@/assets/icon/setting_yellow.svg';
import setting_white from '@/assets/icon/setting_white.svg';
import setting_black from '@/assets/icon/setting_black.svg';
import book_yellow from '@/assets/icon/book_yellow.svg';
import book_white from '@/assets/icon/book_white.svg';
import book_black from '@/assets/icon/book_black.svg';

import edit_yellow from '@/assets/icon/edit_yellow.svg';
import edit_white from '@/assets/icon/edit_white.svg';
import edit_black from '@/assets/icon/edit_black.svg';

export const categorySidebar = [
    {
        name: 'Thống kê',
        link: '/admin/dashboard',
        icon_black: dashboard_black,
        icon_yellow: dashboard_yellow,
        icon_white: dashboard_white,
    },
    {
        name: 'Hóa đơn',
        link: '/admin/order',
        icon_black: bill_black,
        icon_yellow: bill_yellow,
        icon_white: bill_white,
        children: [
            {
                name: 'Đơn hiện thời',
                link: '/admin/order/order-existing',
            },
            {
                name: 'Lịch sử đơn hàng',
                link: '/admin/order/history-order',
            },
        ],
    },
    {
        name: 'Đặt bàn',
        link: '/admin/set-table',
        icon_black: calendar_black,
        icon_yellow: calendar_yellow,
        icon_white: calendar_white,
        children: [
            {
                name: 'Lịch đặt bàn ',
                link: '/admin/set-table/booking-schedule',
                icon_black: staff_black,
                icon_yellow: staff_yellow,
                icon_white: staff_white,
            },
            {
                name: 'Sơ đồ bàn',
                link: '/admin/set-table/seating-chart',
                icon_black: staff_black,
                icon_yellow: staff_yellow,
                icon_white: staff_white,
            },
        ],
    },
    {
        name: 'Đánh giá',
        link: '/admin/reviews',
        icon_black: edit_black,
        icon_yellow: edit_yellow,
        icon_white: edit_white,
    },
    {
        name: 'Mặt hàng',
        link: '/admin/product-items',
        icon_black: item_black,
        icon_yellow: item_yellow,
        icon_white: item_white,
    },
    {
        name: 'Thực đơn',
        link: '/admin/menus',
        icon_black: menuCall_black,
        icon_yellow: menuCall_yellow,
        icon_white: menuCall_white,
    },
    {
        name: 'Combo',
        link: '/admin/combo',
        icon_black: discountCode_black,
        icon_yellow: discountCode_yellow,
        icon_white: discountCode_white,
    },
    {
        name: 'Nhân viên',
        link: '/admin/staff',
        icon_black: staff_black,
        icon_yellow: staff_yellow,
        icon_white: staff_white,
        children: [
            {
                name: 'Danh sách nhân viên',
                link: '/admin/staff/list-staff',
            },
            {
                name: 'Phân quyền',
                link: '/admin/staff/list-role',
            },
        ],
    },
    {
        name: 'Khách hàng',
        link: '/admin/customer',
        icon_black: user_black,
        icon_yellow: user_yellow,
        icon_white: user_white,
    },
    {
        name: 'Tin tức',
        link: '/admin/management-news',
        icon_black: book_black,
        icon_yellow: book_yellow,
        icon_white: book_white,
        children: [
            {
                name: 'Ưu đãi',
                link: '/admin/management-news/special-offer',
            },
            {
                name: 'Sự kiện',
                link: '/admin/management-news/event',
            },
        ],
    },
    {
        name: 'Hệ thống',
        link: '/admin/system',
        icon_black: system_black,
        icon_yellow: system_yellow,
        icon_white: system_white,
        children: [
            {
                name: 'Quản lý slide',
                link: '/admin/system/management-slide-show',
            },
            {
                name: 'Quản lý menu',
                link: '/admin/system/management-menu-primary',
            },
        ],
    },
    {
        name: 'Thiết lập nhà hàng',
        link: '/admin/setting',
        icon_black: setting_black,
        icon_yellow: setting_yellow,
        icon_white: setting_white,
    },
];
