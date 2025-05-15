import user_3 from '@/assets/icon/user_3.svg';
import statistic from '@/assets/icon/statistic.svg';
import bill from '@/assets/icon/bill.svg';
import bag_2 from '@/assets/icon/bag_2.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DateFilter from '@/components/common/dateFIlter';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import CustomLegendLineChart from '@/components/chart/CustomLegendLineChart';
import CustomDotActiveLine from '@/components/chart/CustomDotActiveLine';
import CustomDotLine from '@/components/chart/CustomDotLine';
import CustomTooltipChart from '@/components/chart/CustomTooltipChart';
import { useEffect, useState } from 'react';
import FormatVND from '@/components/common/FormatVND';
import CountUp from 'react-countup';
import decoration from '@/assets/icon/decoration.svg';
import arr_down_3 from '@/assets/icon/arr_down_3.svg';
import arr_down_3_white from '@/assets/icon/arr_down_3_white.svg';
import { getRevenue, getRevenueProfitReport } from '@/redux/orderSlice';
import TrendingUpAnimation from '@/components/common/TrendingUpAnimation';
import TrendingDownAnimation from '@/components/common/TrendingDownAnimation';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import { getProductSold } from '@/redux/productSlice';

const arrTop = [
    { name: 'Doanh thu', icon: statistic, sl: 4300 },
    { name: 'Hóa đơn', icon: bill, sl: 2400 },
    { name: 'Khách hàng', icon: user_3, sl: 1500 },
    { name: 'Món ăn trong thực đơn', icon: bag_2, sl: 3022 },
];

const arrCategory = [
    { name: 'SN' },
    { name: 'Sản phẩm' },
    { name: 'Giá' },
    { name: 'Đã bán' },
    { name: 'Tổng giá' },
];

function Dashboard() {
    const dispatch = useDispatch();

    const authRedux = useSelector((state) => state?.auth);
    const orderStore = useSelector((state) => state.order);
    const productStore = useSelector((state) => state.product);

    const [showTooltip, setShowTooltip] = useState(false);

    //state date
    const [isValueDate, setIsValueDate] = useState('day');

    const [valueDaySelected, setValueDaySelected] = useState(() =>
        new Date().getDate()
    );

    const [valueMonthSelected, setValueMonthSelected] = useState(
        () => new Date().getMonth() + 1
    );
    const [valueYearSelected, setValueYearSelected] = useState(() =>
        new Date().getFullYear()
    );

    const handleFilter = ({ filterType, selectedDate }) => {
        // Gọi API hoặc xử lý logic tại đây
        setIsValueDate(filterType);
        setValueDaySelected(selectedDate.getDate());
        setValueMonthSelected(selectedDate.getMonth() + 1);
        setValueYearSelected(selectedDate.getFullYear());
    };

    useEffect(() => {
        dispatch(
            getRevenue({
                day: valueDaySelected,
                month: valueMonthSelected,
                year: valueYearSelected,
                type: isValueDate,
            })
        );
        dispatch(
            getRevenueProfitReport({
                day: valueDaySelected,
                month: valueMonthSelected,
                year: valueYearSelected,
                type: isValueDate,
            })
        );
    }, [
        valueDaySelected,
        valueMonthSelected,
        valueYearSelected,
        isValueDate,
        dispatch,
    ]);

    useEffect(() => {
        dispatch(getProductSold());
    }, [dispatch]);

    const formatCurrency = (value) => {
        return value.toLocaleString() + 'đ'; // Chuyển giá trị thành định dạng tiền tệ và thêm 'đ'
    };

    return (
        <div className="text-text-primary font-cabin">
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-semibold">Bảng điều khiển</h3>
                <div className="">
                    <DateFilter onFilter={handleFilter} />
                </div>
            </div>

            {/*  */}
            <div
                className="grid grid-cols-4 gap-5 
                            max-xl:grid-cols-2 max-sm:grid-cols-1
                            mb-5"
            >
                {arrTop.map((item, index) => (
                    <div
                        key={index}
                        className="bg-bg-secondary flex flex-col items-center gap-9
                                    justify-center py-5 rounded-md hover:shadow-header-shadow
                                    cursor-pointer transition-shadow ease-linear duration-300 "
                    >
                        <div className="flex gap-7 items-center ">
                            <div
                                className={`${
                                    (index === 1 && 'bg-orange-100') ||
                                    (index === 3 && 'bg-rose-100') ||
                                    'bg-blue-100'
                                } rounded-full w-[70px] h-[70px]
                                    flex justify-center items-center `}
                            >
                                <img src={item.icon} alt="" />
                            </div>
                            <div className="flex flex-col gap-1 h-[84px] justify-center">
                                <span className=" flex gap-1 items-center">
                                    <span className="text-2xl font-bold">
                                        <CountUp
                                            end={
                                                (index === 0 &&
                                                    orderStore.reportRenevue
                                                        ?.currentRevenue) ||
                                                (index === 1 &&
                                                    orderStore.reportRenevue
                                                        ?.currentOrders) ||
                                                (index === 2 &&
                                                    orderStore.reportRenevue
                                                        ?.currentCustomers) ||
                                                (index === 3 &&
                                                    orderStore.reportRenevue
                                                        ?.currentDishes) ||
                                                0
                                            }
                                            duration={2}
                                            separator=","
                                        />
                                    </span>
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="text-base "
                                    />
                                </span>
                                <span className="text-gray-primary w-24 ">
                                    {item.name}
                                </span>
                            </div>
                        </div>

                        {/* trending */}
                        <div className="flex items-center gap-2 font-medium">
                            {(() => {
                                const trend = [
                                    orderStore.reportRenevue?.trendRevenue,
                                    orderStore.reportRenevue?.trendOrders,
                                    orderStore.reportRenevue?.trendCustomers,
                                    orderStore.reportRenevue?.trendDishes,
                                ][index];

                                if (trend === 'tăng')
                                    return <TrendingUpAnimation />;
                                if (trend === 'giảm')
                                    return <TrendingDownAnimation />;
                                return '';
                            })()}

                            {/* percent */}
                            <div className="flex gap-2 items-center">
                                <span
                                    className={` ${(() => {
                                        const trend = [
                                            orderStore.reportRenevue
                                                ?.trendRevenue,
                                            orderStore.reportRenevue
                                                ?.trendOrders,
                                            orderStore.reportRenevue
                                                ?.trendCustomers,
                                            orderStore.reportRenevue
                                                ?.trendDishes,
                                        ][index];

                                        if (trend === 'tăng')
                                            return 'text-[#00B69B]';
                                        if (trend === 'giảm')
                                            return 'text-[#f83f67]';
                                        return 'text-blue-500';
                                    })()}`}
                                >
                                    {(() => {
                                        const trend = [
                                            orderStore.reportRenevue
                                                ?.trendRevenue,
                                            orderStore.reportRenevue
                                                ?.trendOrders,
                                            orderStore.reportRenevue
                                                ?.trendCustomers,
                                            orderStore.reportRenevue
                                                ?.trendDishes,
                                        ][index];

                                        const percentChange = [
                                            orderStore.reportRenevue
                                                ?.percentChangeRevenue,
                                            orderStore.reportRenevue
                                                ?.percentChangeOrders,
                                            orderStore.reportRenevue
                                                ?.percentChangeCustomer,
                                            orderStore.reportRenevue
                                                ?.percentChangeDishes,
                                        ][index];

                                        return trend !== 'không đổi' ? (
                                            <CountUp
                                                end={Math.abs(percentChange)}
                                                duration={2}
                                                suffix="%"
                                            />
                                        ) : (
                                            CapitalizeFirstLetter(trend)
                                        );
                                    })()}
                                </span>
                                <span className="opacity-70">
                                    {(() => {
                                        const percentChange = [
                                            orderStore.reportRenevue
                                                ?.percentChangeRevenue,
                                            orderStore.reportRenevue
                                                ?.percentChangeOrders,
                                            orderStore.reportRenevue
                                                ?.percentChangeCustomer,
                                            orderStore.reportRenevue
                                                ?.percentChangeDishes,
                                        ][index];

                                        return percentChange !==
                                            'Không có dữ liệu'
                                            ? (isValueDate === 'day' &&
                                                  'So với ngày hôm qua') ||
                                                  (isValueDate === 'month' &&
                                                      'So với tháng trước') ||
                                                  (isValueDate === 'year' &&
                                                      'So với năm trước')
                                            : 'Không có dữ liệu...';
                                    })()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/*  */}
            <div
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="bg-bg-secondary px-7 rounded-md mb-5"
            >
                <div className="py-4 text-xl font-semibold opacity-75">
                    Báo cáo doanh thu & lợi nhuận
                </div>
                <ResponsiveContainer width="100%" height={450}>
                    <LineChart
                        data={orderStore.reportRenevueAndProfit?.filledData}
                        margin={{ top: 5, right: 30, left: 75, bottom: 5 }}
                    >
                        {/* Bước 1: Khai báo linear gradient */}
                        <defs>
                            <linearGradient
                                id="gradientRenvenue"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                            >
                                <stop offset="10%" stopColor="#fc00ff" />
                                <stop offset="90%" stopColor="#00dbde" />
                            </linearGradient>
                        </defs>

                        <defs>
                            <linearGradient
                                id="gradientProfit"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                            >
                                <stop offset="10%" stopColor="#aaffa9" />
                                <stop offset="90%" stopColor="#11ffbd" />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="1 0"
                            vertical={false}
                            stroke={
                                authRedux.theme === 'light'
                                    ? '#D9D9D9'
                                    : '#6b7280'
                            }
                        />
                        <XAxis
                            tickLine={false}
                            axisLine={false}
                            dataKey="name"
                            tick={{
                                fontSize: 14,
                                fill:
                                    authRedux.theme === 'light'
                                        ? '#9ca3af'
                                        : '#fff',
                                dy: 10,
                            }}
                            padding={{ left: 30, right: 30 }} // 👈 đây là phần thụt đầu/cuối
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{
                                fontSize: 14,
                                fill:
                                    authRedux.theme === 'light'
                                        ? '#9ca3af'
                                        : '#fff',
                                dx: -15,
                            }}
                            tickFormatter={formatCurrency}
                        />
                        <Tooltip
                            content={<CustomTooltipChart />}
                            coordinate={{ x: 10, y: 0 }}
                            offset={2}
                            dot={false}
                            cursor={false}
                            wrapperStyle={{ visibility: 'visible' }}
                            show={showTooltip}
                            // Tùy chỉnh chấm khi hover
                        />
                        <Legend content={CustomLegendLineChart} />

                        {/* Bước 2: Dùng gradient làm stroke */}
                        <Line
                            type="monotone"
                            dataKey="totalRevenue"
                            stroke="url(#gradientRenvenue)"
                            strokeWidth={4}
                            activeDot={<CustomDotActiveLine />}
                            dot={<CustomDotLine />}
                            strokeLinecap="round"
                        />
                        <Line
                            type="monotone"
                            dataKey="totalProfit"
                            stroke="url(#gradientProfit)"
                            strokeWidth={4}
                            activeDot={<CustomDotActiveLine />}
                            dot={<CustomDotLine />}
                            strokeLinecap="round"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* top mặt hàng bán chạy */}
            <div className=" gap-5 bg-bg-secondary rounded-md py-6 px-4">
                <h3 className="text-xl font-semibold opacity-80 py-2 px-5">
                    Top mặt hàng bán chạy
                </h3>

                <div className="grid grid-cols-10 p-5 font-semibold">
                    {arrCategory.map((item, index) => (
                        <div
                            key={index}
                            className={`opacity-70 ${
                                (index === 0 && 'col-span-1') ||
                                (index === 1 && 'col-span-3') ||
                                'col-span-2 text-center justify-center'
                            } flex items-center  gap-3`}
                        >
                            {item.name}
                            <img
                                src={
                                    authRedux.theme === 'light'
                                        ? arr_down_3
                                        : arr_down_3_white
                                }
                                alt=""
                                className="h-2 translate-y-0.5"
                            />
                        </div>
                    ))}
                </div>

                {/* top dishes */}
                <div className="overflow-scroll h-[450px] no-scrollbar">
                    {productStore?.productSold?.map((item, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-10 py-4 items-center ${
                                index % 2 == 0 ? 'bg-color-active-2' : ''
                            } px-5 rounded-md `}
                        >
                            <div className="col-span-1 flex items-center">
                                {index === 0 || index === 1 || index === 2 ? (
                                    <img
                                        src={decoration}
                                        alt=""
                                        className="h-6"
                                    />
                                ) : (
                                    <div className="opacity-70 font-semibold">
                                        {index + 1}
                                    </div>
                                )}
                            </div>

                            <div className="flex col-span-3 items-center gap-2">
                                <img
                                    src={item.images[0].url}
                                    alt=""
                                    className="h-14 w-12 rounded-md object-cover"
                                />
                                <span className="text-yellow-primary  font-oswald">
                                    {item.name}
                                </span>
                            </div>
                            <span
                                className=" col-span-2 text-center text-lg
                                             opacity-80 font-semibold"
                            >
                                {FormatVND(item.promotion || item.price)}
                            </span>
                            <span
                                className=" col-span-2 text-center text-lg 
                                            font-semibold text-green-500"
                            >
                                {item?.sold?.toLocaleString('en-US')}
                            </span>
                            <span
                                className=" col-span-2 text-center text-lg font-semibold
                                                opacity-80"
                            >
                                {FormatVND(item.promotion * item.sold || 0)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
