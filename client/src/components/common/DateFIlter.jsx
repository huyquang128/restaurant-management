/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import arr_down_black from '@/assets/icon/arr_down_black.svg';
import arr_down_white from '@/assets/icon/arr_down_white.svg';
import { useSelector } from 'react-redux';
import { vi } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
const DateFilter = ({ onFilter }) => {
    const [filterType, setFilterType] = useState('day');
    const [selectedDate, setSelectedDate] = useState(new Date());

    const authStore = useSelector((state) => state.auth);

    // Gửi dữ liệu lọc mỗi khi filterType hoặc selectedDate thay đổi
    useEffect(() => {
        onFilter({ filterType, selectedDate });
    }, [filterType, selectedDate]);

    return (
        <div className="flex  items-center gap-4">
            <div className="cursor-pointer relative  flex">
                <select
                    className="border border-border-primary rounded-lg pl-5 pr-10 py-2
                                 focus:outline focus:outline-yellow-primary
                                  bg-bg-tertiary appearance-none"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="day">Theo ngày</option>
                    <option value="month">Theo tháng</option>
                    <option value="year">Theo năm</option>
                </select>

                <img
                    src={
                        authStore.theme === 'light'
                            ? arr_down_black
                            : arr_down_white
                    }
                    alt=""
                    className="absolute top-1/2 -translate-y-1/2 right-3"
                />
            </div>

            <div className="">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    popperPlacement="bottom-start"
                    dateFormat={
                        filterType === 'day'
                            ? 'dd/MM/yyyy'
                            : filterType === 'month'
                            ? 'MM/yyyy'
                            : 'yyyy'
                    }
                    showMonthYearPicker={filterType === 'month'}
                    showYearPicker={filterType === 'year'}
                    className="border border-border-primary rounded-lg px-3 py-2 
                        w-36 text-center focus:outline focus:outline-yellow-primary bg-bg-tertiary"
                    locale={vi} // <- dùng object chứ không phải string
                    placeholderText="Chọn ngày"
                />
            </div>
        </div>
    );
};

export default DateFilter;
