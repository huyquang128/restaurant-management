import check_red from '@/assets/icon/check_red.svg';
import { setValueSortDishes } from '@/redux/productSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const valueSort = [
    { title: 'Giá: Tăng dần', value: 'asc' },
    { title: 'Giá: Giảm dần', value: 'desc' },
    { title: 'Tên: A-Z', value: 'az' },
    { title: 'Tên: Z-A', value: 'za' },
    { title: 'Bán chạy nhất', value: 'bestSelling' },
];

function SortDishesTooltip() {
    const [valueSortSeleted, setValueSortSeleted] = useState(null);
    const dispatch = useDispatch();

    return (
        <div>
            {valueSort.map((item, index) => (
                <div
                    key={index}
                    onMouseEnter={() => setValueSortSeleted(index)}
                    onClick={() => dispatch(setValueSortDishes(item.value))}
                    className="font-medium text-gray-primary py-2 flex justify-between items-center"
                >
                    {item.title}
                    <div
                        className={`${
                            index === valueSortSeleted
                                ? 'opacity-100 scale-100 animate-bounceScale'
                                : 'opacity-0 scale-75'
                        } transition-all duration-300 ease-in-out`}
                    >
                        {index === valueSortSeleted && (
                            <img src={check_red} alt="check_red" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SortDishesTooltip;
