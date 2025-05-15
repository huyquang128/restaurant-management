import { useSearchParams, useNavigate } from 'react-router';
import { useEffect } from 'react';
import check_green_2 from '@/assets/icon/check_green_2.svg';
import home_3_white from '@/assets/icon/home_3_white.svg';
import { useDispatch } from 'react-redux';
import { updateDepositOrder } from '@/redux/orderSlice';
import codeOrderId from '@/components/common/codeOrderId';
import Button from '@/components/common/Button/Button';
import FormatVND from '@/components/common/FormatVND';

const PaymentResult = () => {
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'success') {
            const deposit = Number(amount) / 100;
            dispatch(updateDepositOrder(orderId, deposit));
        }
    }, [navigate]);

    return (
        <div
            className="flex flex-col items-center justify-center 
                          w-full mt-28 font-cabin py-20 bg-bg-primary"
        >
            {status === 'success' ? (
                <div className="text-center border border-gray-priamry bg-white p-10 rounded-md">
                    <div className="flex justify-center mb-3">
                        <img src={check_green_2} alt="" className="h-16 " />
                    </div>
                    <h1 className="text-xl font-bold text-green-600 ">
                        Quý khách đã thanh toán thành công!
                    </h1>
                    <p className="text-gray-primary py-5 border-b border-gray-200 ">
                        Chân thành cảm ơn quý khách
                    </p>
                    <div className="flex flex-col justify-start items-start gap-3 py-7">
                        <p className="flex gap-10">
                            <div className="w-28 opacity-70">Mã đặt bàn</div>
                            <span className="text-yellow-primary">
                                {codeOrderId(orderId)}
                            </span>
                        </p>
                        <p className="flex gap-10">
                            <div className="w-28 opacity-70">Đã đặt cọc</div>
                            <span className="text-yellow-primary">
                                {FormatVND(Number(amount) / 100)}
                            </span>
                        </p>
                    </div>

                    <div className="flex">
                        <Button
                            title="Trở về trang chủ"
                            icon={home_3_white}
                            bg="exit"
                            handleClick={() => navigate('/')}
                        />
                    </div>
                </div>
            ) : (
                <div className="text-red-600">
                    <h1 className="text-3xl font-bold">Thanh toán thất bại!</h1>
                    <p>Mã đơn hàng: {orderId}</p>
                    <p>Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentResult;
