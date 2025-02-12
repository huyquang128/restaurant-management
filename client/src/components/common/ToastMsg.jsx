/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';
import banner_1 from '@/assets/image/banner_1.jpg';
import Button from './Button/Button';
import check_green_2 from '@/assets/icon/check_green_2.svg';
import close_green from '@/assets/icon/close_green.svg';
import close_red from '@/assets/icon/close_red.svg';
import close_red_2 from '@/assets/icon/close_red_2.svg';

function ToastMsg({
    status = 'success',
    msg,
    type = 'simpleNotification',
    data,
}) {
    const toastProduct = () => {
        return (
            <div className={`w-full bg-bg-tertiary font-cabin`}>
                <div
                    className={` text-white py-1.5 px-3 flex items-center justify-between  ${
                        status === 'success' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                >
                    <img
                        src={status === 'success' ? check_green_2 : close_red}
                        alt="Icon"
                        className="w-4 h-4"
                    />
                    <span
                        className={`${
                            status === 'success'
                                ? 'text-green-600'
                                : 'text-red-600'
                        }`}
                    >
                        {msg}
                    </span>
                    <img
                        onClick={() => toast.dismiss(toastId)}
                        src={status === 'success' ? close_green : close_red_2}
                        alt=""
                        className="cursor-pointer"
                    />
                </div>

                {/* data detailed notification */}
                {type === 'detailedNotification' && (
                    <>
                        <div className="flex justify-center px-3 ">
                            <div className="h-[1px] bg-gray-200 mt-3 w-full flex "></div>
                        </div>

                        <div
                            className="flex items-center justify-start px-3 py-5 gap-3 border-gray-200
                                        text-text-primary"
                        >
                            <img
                                src={banner_1}
                                alt="Icon"
                                className="mr-3 h-16 w-14 rounded-lg object-cover"
                            />
                            <div className="flex flex-col gap-2">
                                <div className="line-clamp-2  leading-snug">
                                    {data.nameProduct}
                                </div>
                                <div className="">
                                    {Number(data.selling).toLocaleString(
                                        'vi-VN'
                                    ) + ' ₫'}
                                </div>
                            </div>
                        </div>
                        <div className="text-end px-3 pb-3">
                            <Button
                                title="Xem ngay"
                                bg="black"
                                text_color="white"
                                type="button"
                                bg_border="black"
                            />
                        </div>
                    </>
                )}
            </div>
        );
    };

    const toastId = toast(toastProduct(), {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        style: {
            width: '300px',
            padding: 0,
            overflow: 'hidden',
            borderRadius: '8px',
            minHeight: '100%',
        },
        closeButton: false,
    });
}

export default ToastMsg;
