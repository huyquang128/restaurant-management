import sun_white from '@/assets/icon/sun_white.svg';
import sun_black from '@/assets/icon/sun_black.svg';
import moon_black from '@/assets/icon/moon_black.svg';
import moon_white from '@/assets/icon/moon_white.svg';
import circle_white from '@/assets/icon/circle_white.svg';
import circle_black from '@/assets/icon/circle_black.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '@/redux/authSlice';
import check_white from '@/assets/icon/check_white.svg';
import check_black from '@/assets/icon/check_black.svg';

const listThemeMode = [
    {
        name: 'Sáng',
        icon_black: sun_black,
        icon_white: sun_white,
        type: 'light',
    },
    {
        name: 'Tối',
        icon_black: moon_black,
        icon_white: moon_white,
        type: 'dark',
    },
    {
        name: 'Tự động',
        icon_black: circle_black,
        icon_white: circle_white,
        type: 'device',
    },
];
function ThemeMode() {
    const dispatch = useDispatch();
    const authStore = useSelector((state) => state?.auth);

    const handleChangeTheme = (type) => {
        dispatch(setTheme(type));
    };

    return (
        <div>
            {listThemeMode.map((theme, index) => (
                <div
                    onClick={() => handleChangeTheme(theme.type)}
                    key={index}
                    className="flex hover:bg-yellow-primary px-2 py-1 items-center rounded-lg
                                transition-colors ease-linear duration-300 justify-between"
                >
                    <div className="flex items-center gap-2">
                        <img
                            src={
                                authStore.theme === 'light'
                                    ? theme.icon_black
                                    : theme.icon_white
                            }
                            alt=""
                            className="h-5"
                        />
                        <div>{theme.name}</div>
                    </div>
                    {authStore.theme === theme.type && (
                        <img src={ authStore.theme === 'light' ? check_black : check_white} alt="" />
                    )}
                </div>
            ))}
        </div>
    );
}

export default ThemeMode;
