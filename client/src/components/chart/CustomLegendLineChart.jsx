import { useSelector } from 'react-redux';

/* eslint-disable react/prop-types */
function CustomLegendLineChart(props) {
    const { payload } = props;
    const authStore = useSelector((state) => state.auth);

    return (
        <ul className="flex justify-center gap-10 font-cabin">
            {payload.map((entry, index) => {
                const isRevenue = entry.dataKey === 'totalRevenue';
                const gradient = isRevenue
                    ? 'linear-gradient(to right, #fc00ff, #00dbde)'
                    : 'linear-gradient(to right, #aaffa9, #11ffbd)'; // ví dụ cho profit
                return (
                    <li
                        key={`item-${index}`}
                        className="flex gap-2 items-center py-4 "
                    >
                        <div
                            className={`h-2.5 w-2.5 rounded-full `}
                            style={{ backgroundImage: gradient }}
                        ></div>
                        <span
                            className={`${
                                authStore.theme === 'light'
                                    ? 'text-[#8e99ab]'
                                    : 'text-[#fff]'
                            }`}
                        >
                            {entry.value === 'totalRevenue'
                                ? 'Doanh thu'
                                : 'Lợi nhuận'}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}

export default CustomLegendLineChart;
