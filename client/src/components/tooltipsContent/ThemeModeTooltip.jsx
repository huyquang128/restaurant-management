/* eslint-disable react/prop-types */
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
import { motion } from 'framer-motion';

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
function ThemeModeTooltip({ ...props }) {
    const { isOpenTooltip } = props;
    const dispatch = useDispatch();
    const authStore = useSelector((state) => state?.auth);

    const handleChangeTheme = (type) => {
        dispatch(setTheme(type));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={isOpenTooltip ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-32 right-0 "
        >
            <div className="bg-bg-tertiary w-32 rounded-lg shadow-header-shadow py-2">
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
                            <img
                                src={
                                    authStore.theme === 'light'
                                        ? check_black
                                        : check_white
                                }
                                alt=""
                            />
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default ThemeModeTooltip;
