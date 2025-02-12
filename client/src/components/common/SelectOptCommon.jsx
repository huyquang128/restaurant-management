/* eslint-disable react/prop-types */
import circle_add_white from '@/assets/icon/circle_add_white.svg';
import circle_add_black from '@/assets/icon/circle_add_black.svg';
import arr_down_black from '@/assets/icon/arr_down_black.svg';
import arr_down_white from '@/assets/icon/arr_down_white.svg';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import CapitalizeFirstLetter from './CapitalizeFirstLetter';

function SelectOptCommon({ label, setisopenmodal, ...props }) {
    const { formik, id, list_opt, type } = props;
    const authStore = useSelector((state) => state?.auth);
    const isErr = formik.touched[id] && formik.errors[id];
    const errMsg = formik.errors[id];
    return (
        <div className="">
            <div className="mb-2 text-text-primary">{label}</div>
            <div className="flex items-center gap-2 relative">
                <select
                    {...props}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values[id]}
                    className={`py-3 px-4 bg-bg-tertiary w-full rounded-lg text-text-primary 
                            transition-all outline outline-1  border-none ease-linear duration-200 
                            appearance-none focus:outline-yellow-primary cursor-pointer
                            ${
                                isErr
                                    ? 'outline-red-500'
                                    : 'outline-transparent'
                            }`}
                >
                    <option value="">--{label}-- </option>
                    {list_opt?.map((item, index) => (
                        <option key={index} value={item._id}>
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
                {type === 'add' && (
                    <img
                        onClick={() => setisopenmodal(true)}
                        src={
                            authStore.theme === 'light'
                                ? circle_add_black
                                : circle_add_white
                        }
                        alt=""
                        className="h-5 cursor-pointer"
                    />
                )}
            </div>

            {/* valid msg */}
            {isErr ? (
                <motion.div
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={
                        isErr
                            ? { opacity: 1, y: '0' }
                            : { opacity: 0, y: '-100%' }
                    }
                    transition={{ duration: 0.3 }}
                    className="text-red-500 text-sm"
                >
                    {errMsg}
                </motion.div>
            ) : (
                <div className="mb-5"></div>
            )}
        </div>
    );
}

export default SelectOptCommon;
