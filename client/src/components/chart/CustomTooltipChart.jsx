/* eslint-disable react/prop-types */
import arr_down_2 from '@/assets/icon/arr_down_2.svg';
import FormatVND from '../common/FormatVND';
function CustomTooltipChart({ active, payload, label, coordinate, show }) {
    if (!active || !show || !payload?.length) return null;
    const gradient = 'linear-gradient(to right, #ff7e5f, #feb47b';
    const { x, y } = coordinate;
    return (
        <div
            className="absolute z-50 -translate-x-1/2 w-80"
            style={{
                left: `${x}px`,
                top: `${y - 150}px`,
            }}
        >
            <div
                className=" flex flex-col relative 
                        items-center text-white px-5 rounded-xl py-3
                        font-cabin "
                style={{
                    background: gradient,
                }}
            >
                <div
                    className=" font-medium flex flex-col 
                        justify-center  gap-2 text-base relative z-50"
                >
                    <div className="flex justify-center">
                        <span className="font-bold text-xl ">
                            {payload.length > 0 && payload[0].payload.name}
                        </span>
                    </div>
                    {payload.map((item, index) => (
                        <div key={index} className="flex  items-center gap-2">
                            <span className="w-20">
                                {index === 0 ? 'Doanh thu' : 'Lợi nhuận'}
                            </span>
                            <span>:</span>
                            <span className="font-bold text-lg">
                                {FormatVND(
                                    index === 0
                                        ? item.payload.totalRevenue
                                        : item.payload.totalProfit
                                )}
                            </span>
                        </div>
                    ))}
                </div>
                <img
                    src={arr_down_2}
                    alt=""
                    className="absolute h-12 bottom-0 translate-y-7 z-10"
                />
            </div>
        </div>
    );
}

export default CustomTooltipChart;
