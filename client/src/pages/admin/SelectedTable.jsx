import { useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';

import location from '@/assets/icon/location.svg';
import Button from '@/components/common/Button/Button';
import back_white from '@/assets/icon/back_white.svg';
import arr_down_white from '@/assets/icon/arr_down_white.svg';
import arr_down_black from '@/assets/icon/arr_down_black.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import check_circle_yellow from '@/assets/icon/check_circle_yellow.svg';
import { getAllAreas } from '@/redux/areaSlice';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import { updateStatusTable } from '@/redux/tableSlice';
import ToastMsg from '@/components/common/ToastMsg';
import { getAllOrder } from '@/redux/orderSlice';

function SelectedTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { orderId } = useParams();

    const authStore = useSelector((state) => state.auth);
    const areaStore = useSelector((state) => state.area);
    const tableStore = useSelector((state) => state.table);

    const [selectedArea, setSelectedArea] = useState(0);
    const [isShowArea, setIsShowArea] = useState(false);
    const [isCloseListAreaAnimation, setIsCloseListAreaAnimation] =
        useState(false);

    useEffect(() => {
        dispatch(getAllAreas());
    }, [dispatch]);

    const closeListArea = () => {
        setIsCloseListAreaAnimation(true);
        setTimeout(() => {
            setIsCloseListAreaAnimation(false);
            setIsShowArea(false);
        }, 300);
    };

    const hanleShowListArea = () => {
        !isShowArea ? setIsShowArea(true) : closeListArea();
    };

    const handleSeletedTable = (tableId) => {
        dispatch(
            updateStatusTable({
                tableId,
                status: tableStore.statusTable,
                orderId,
            })
        ).then((data) => {
            if (data.payload.success) {
                ToastMsg({ msg: 'Chọn bàn thành công!!!' });
                dispatch(getAllAreas());
                dispatch(getAllOrder());
                navigate(-1);
            }
        });
    };

    return (
        <div className="text-text-primary flex max-md:flex-col gap-5 font-cabin">
            {/* screen md */}
            <div className="md:hidden relative z-20">
                <div
                    onClick={() => hanleShowListArea()}
                    className=" flex justify-between p-3 cursor-pointer  items-center bg-bg-tertiary
                                        rounded-lg  transition-colors ease-linear duration-300
                                        hover:shadow-header-shadow"
                >
                    <div className="flex items-center gap-5"></div>
                    <img
                        src={
                            authStore.theme === 'light'
                                ? arr_down_black
                                : arr_down_white
                        }
                        alt=""
                        className={`${
                            isShowArea ? 'rotate-0' : '-rotate-180'
                        } transition-transform ease-linear duration-300`}
                    />
                </div>

                {isShowArea && (
                    <motion.div
                        initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                        animate={{
                            clipPath:
                                isShowArea && !isCloseListAreaAnimation
                                    ? 'inset(0% 0% 0% 0%)'
                                    : 'inset(0% 0% 100% 0%)',
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-1/4  p-3 rounded-lg max-md:w-full
                                    absolute top-12 bg-bg-four
                                     overflow-hidden"
                        onClick={closeListArea}
                    ></motion.div>
                )}
            </div>

            {/* screen desktop */}
            <div className="w-1/4 bg-bg-tertiary p-3 rounded-lg max-md:hidden">
                {areaStore.areas?.map((item, index) => (
                    <div
                        onClick={() => setSelectedArea(index)}
                        key={index}
                        className={`flex p-3 cursor-pointer gap-5 items-center hover:bg-color-active
                                        rounded-lg hover:text-yellow-primary transition-colors 
                                        ease-linear duration-300 ${
                                            selectedArea === index &&
                                            'text-yellow-primary bg-color-active'
                                        }`}
                    >
                        <img src={location} alt="" />
                        <div>{item.name}</div>
                    </div>
                ))}
            </div>

            {/* list table */}
            <div
                className="grid grid-cols-3 w-3/4 max-xl:grid-cols-2 max-sm:gap-4 
                            max-sm:grid-cols-1 max-md:w-full 
                            bg-bg-tertiary text-center gap-5 p-5 rounded-lg
                            transition-all duration-300 ease-in-out"
            >
                <div className="col-span-3 max-xl:col-span-2 max-sm:col-span-1 text-xl font-medium mb-5">
                    {areaStore.areas &&
                        CapitalizeFirstLetter(
                            areaStore.areas[selectedArea]?.name
                        )}
                </div>

                {areaStore.areas &&
                    areaStore.areas[selectedArea]?.tables?.map(
                        (item, index) => (
                            <div
                                key={index}
                                className={`border border-border-primary rounded-lg flex flex-col justify-center overflow-hidden
                                           hover:shadow-header-shadow transition-shadow ease-linear duration-300 
                                           relative ${
                                               item.status === 'booking' ||
                                               item.status === 'in_use'
                                                   ? 'cursor-not-allowed '
                                                   : 'cursor-pointer'
                                           }`}
                                onClick={
                                    item.status === 'booking' ||
                                    item.status === 'in_use'
                                        ? undefined
                                        : () => handleSeletedTable(item._id)
                                }
                            >
                                <div className="py-5 bg-color-active text-yellow-primary font-semibold text-xl">
                                    {item.name +
                                        ' - ' +
                                        'Bàn ' +
                                        item.capacity +
                                        ' người'}
                                </div>
                                <div
                                    className={`py-5 ${
                                        (item.status === 'empty' &&
                                            'text-[#4CAF50]') ||
                                        (item.status === 'booking' &&
                                            'text-[#FFC107]') ||
                                        (item.status === 'in_use' &&
                                            'text-[#F44336]') ||
                                        (item.status === 'paid' &&
                                            'text-[#9E9E9E]')
                                    }`}
                                >
                                    Bàn{' '}
                                    {(item.status === 'in_use' &&
                                        'đang sử dụng') ||
                                        (item.status === 'booking' &&
                                            'đã đặt trước') ||
                                        'Trống'}
                                </div>

                                <img
                                    src={
                                        item.status === 'empty'
                                            ? ''
                                            : check_circle_yellow
                                    }
                                    alt=""
                                    className="absolute top-2 right-2"
                                />
                            </div>
                        )
                    )}

                <div
                    onClick={() => navigate(-1)}
                    className="cursor-pointer w-28"
                >
                    <Button
                        title="Quay lại"
                        bg="exit"
                        type="button"
                        text_color="white"
                        icon={back_white}
                    />
                </div>
            </div>
        </div>
    );
}

export default SelectedTable;
