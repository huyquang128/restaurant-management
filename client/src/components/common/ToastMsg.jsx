/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';
import Button from './Button/Button';
import check_green_2 from '@/assets/icon/check_green_2.svg';
import warning from '@/assets/icon/warning.svg';
import close_green from '@/assets/icon/close_green.svg';
import close_yellow from '@/assets/icon/close_yellow.svg';
import close_red from '@/assets/icon/close_red.svg';
import close_red_2 from '@/assets/icon/close_red_2.svg';
import bill from '@/assets/icon/bill.svg';
import FormatVND from './FormatVND';

function ToastMsg({ ...props }) {
    const {
        status = 'success',
        msg,
        type = 'simpleNotification',
        data,
        dispatch,
        navigate,
        funcCallApiGet,
        urlRedirect,
    } = props;

    const fetchApi = () => {
        dispatch(funcCallApiGet(data.apiUpload)).then((data) => {
            if (data.payload.success) {
                navigate(urlRedirect);
            }
        });
    };

    const toastProduct = () => {
        return (
            <div className={`w-full bg-bg-tertiary font-cabin`}>
                <div
                    className={` text-white py-1.5 px-3 flex items-center justify-between  ${
                        (status === 'success' && 'bg-green-100') ||
                        (status === 'warning' && 'bg-orange-100') ||
                        (status === 'order_new' && 'bg-orange-100') ||
                        'bg-red-100'
                    }`}
                >
                    <img
                        src={
                            (status === 'success' && check_green_2) ||
                            (status === 'warning' && warning) ||
                            (status === 'order_new' && bill) ||
                            close_red
                        }
                        alt="Icon"
                        className="w-4 h-4"
                    />
                    <span
                        className={`${
                            (status === 'success' && 'text-green-600') ||
                            (status === 'warning' && 'text-yellow-600') ||
                            (status === 'order_new' && 'text-orange-600') ||
                            'text-red-600'
                        }`}
                    >
                        {msg}
                    </span>
                    <img
                        onClick={() => toast.dismiss(toastId)}
                        src={
                            (status === 'success' && close_green) ||
                            (status === 'warning' && close_yellow) ||
                            (status === 'order_new' && close_yellow) ||
                            close_red_2
                        }
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
                                src={data.img}
                                alt="Icon"
                                className="mr-3 h-16 w-14 rounded-lg object-cover"
                            />
                            <div className="flex flex-col gap-2">
                                <div className="line-clamp-2  leading-snug">
                                    {data.nameProduct}
                                </div>
                                <div className="">
                                    {FormatVND(data.selling)}
                                </div>
                            </div>
                        </div>
                        <div className="text-end px-3 pb-3">
                            <Button
                                title="Xem ngay"
                                bg="add"
                                type="button"
                                handleClick={fetchApi}
                            />
                        </div>
                    </>
                )}
            </div>
        );
    };

    const toastId = toast(toastProduct(), {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        style: {
            // width: '3px',
            padding: 0,
            overflow: 'hidden',
            borderRadius: '8px',
            minHeight: '100%',
        },
        closeButton: false,
    });
}

export default ToastMsg;
