import { useSelector } from 'react-redux';
import CapitalizeFirstLetter from './CapitalizeFirstLetter';
import arr_down_black from '@/assets/icon/arr_down_black.svg';
import arr_down_white from '@/assets/icon/arr_down_white.svg';

/* eslint-disable react/prop-types */
function SelectOptCity({ ...props }) {
    const { arr, label, handleChange } = props;
    const authStore = useSelector((state) => state.auth);

    return (
        <div className="">
            <div className="mb-2 text-text-primary">{label}</div>
            <div className="flex items-center gap-2 relative">
                <select
                    className="py-3  px-4 bg-bg-tertiary w-full rounded-lg text-text-primary 
                    transition-all outline outline-1 outline-bg-tertiary  border-none ease-linear duration-200 
                    appearance-none focus:outline-yellow-primary cursor-pointer"
                    onChange={handleChange}
                >
                    <option value="">{label}</option>
                    {arr?.map((item, index) => (
                        <option
                            key={index}
                            value={item.code}
                            data-name={item.name}
                            className="flex justify-between"
                        >
                            {CapitalizeFirstLetter(item.name)}
                        </option>
                    ))}
                </select>
                <img
                    src={
                        authStore.theme === 'light'
                            ? arr_down_black
                            : arr_down_white
                    }
                    alt=""
                    className="absolute right-10"
                />
            </div>
        </div>
    );
}

export default SelectOptCity;
