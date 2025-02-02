import { Link } from 'react-router';
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
import arr_down_black from '@/assets/icon/arr_down_black.svg';

const categorySidebar = [
    {
        name: 'Thống kê',
        link: '/dashboard',
        icon_black: dashboard_black,
        icon_yellow: dashboard_yellow,
        icon_white: dashboard_white,
    },
    {
        name: 'Hóa đơn',
        link: '',
        icon_black: bill_black,
        icon_yellow: bill_yellow,
        icon_white: bill_white,
    },
    {
        name: 'Đặt bàn',
        link: '',
        icon_black: calendar_black,
        icon_yellow: calendar_yellow,
        icon_white: calendar_white,
    },
    {
        name: 'Mặt hàng',
        link: '/product-items',
        icon_black: item_black,
        icon_yellow: item_yellow,
        icon_white: item_white,
    },
    {
        name: 'Thực đơn',
        link: '',
        icon_black: menuCall_black,
        icon_yellow: menuCall_yellow,
        icon_white: menuCall_white,
    },
    {
        name: 'Combo',
        link: '',
        icon_black: discountCode_black,
        icon_yellow: discountCode_yellow,
        icon_white: discountCode_white,
    },
    {
        name: 'Nhân viên',
        link: '',
        icon_black: staff_black,
        icon_yellow: staff_yellow,
        icon_white: staff_white,
    },
    {
        name: 'Khách hàng',
        link: '',
        icon_black: user_black,
        icon_yellow: user_yellow,
        icon_white: user_white,
    },
    {
        name: 'Hệ thống',
        link: '',
        icon_black: system_black,
        icon_yellow: system_yellow,
        icon_white: system_white,
    },
    {
        name: 'Cài đặt',
        link: '',
        icon_black: setting_black,
        icon_yellow: setting_yellow,
        icon_white: setting_white,
    },
];

function SidebarAdmin() {
    return (
        <div className="w-56 bg-bg-secondary font-cabin min-h-screen overflow-y-scroll no-scrollbar">
            <h1 className="text-center py-6 text-2xl  text-yellow-primary border-b border-gray-100">
                SAVOR.
            </h1>
            <div className="">
                {categorySidebar.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between px-5 py-4 cursor-pointer"
                    >
                        <div className="flex items-center justify-start gap-2 ">
                            <img
                                src={item.icon_black}
                                alt=""
                                className="h-5 -translate-y-[2px]"
                            />
                            <Link to={item.link}>{item.name}</Link>
                        </div>
                        <img src={arr_down_black} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SidebarAdmin;
