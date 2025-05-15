import home_white from '@/assets/icon/home_white.svg';
import home_2_white from '@/assets/icon/home_2_white.svg';
import map_white from '@/assets/icon/map_white.svg';

const arrCategorySetting = [
    {
        name: 'Thông tin nhà hàng',
        icon: home_white,
    },
    {
        name: 'Thiết lập cơ sở',
        icon: home_2_white,
    },
    {
        name: 'Thiết lập khu vực bàn',
        icon: map_white,
    },
];

function SettingAdmin() {
    return (
        <div className="font-cabin text-text-primary">
            <div className="text-xl font-medium mb-10         text-text-primary">
                Thiết lập thông tin
            </div>

            <div className="grid grid-cols-3 gap-10 max-xl:grid-cols-2 max-sm:grid-cols-1">
                {arrCategorySetting.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-center  
                            items-center flex-col gap-5
                            border border-border-primary py-10
                            rounded-md cursor-pointer hover:shadow-header-shadow
                            transition-shadow ease-linear duration-300"
                    >
                        <div
                            className="w-16 h-16 flex 
                                     justify-center items-center bg-yellow-primary
                                    rounded-md"
                        >
                            <img src={item.icon} alt="" className="h-10" />
                        </div>
                        <div className="text-yellow-primary font-semibold">
                            {item.name}
                        </div>
                        <div className="text-gray-primary italic text-sm">
                            Xem và điều chỉnh thông tin nhà hàng của bạn
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SettingAdmin;
