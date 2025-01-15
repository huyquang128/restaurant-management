/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import hide_pass from '@/assets/icon/hide_pass.svg';
import show_pass from '@/assets/icon/show_pass.svg';
import { useState } from 'react';

function InputCommon({ label, type, isRequired = false, ...props }) {
    const { formik, id } = props;
    const [showPass, setShowPass] = useState(false);
    const isErr = formik.touched[id] && formik.errors[id];
    const errMsg = formik.errors[id];

    return (
        <div>
            <div className="">{label}</div>
            <div
                className={`transition-all ease-linear duration-300 border  py-3 rounded-sm px-4 relative ${
                    isErr ? 'border-red-500' : 'border-gray-100'
                } bg-gray-100 rounded-md`}
            >
                <input
                    type={
                        type === 'password'
                            ? showPass
                                ? 'text'
                                : 'password'
                            : type
                    }
                    className={`outline-none bg-gray-100`}
                    {...props}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values[id]}
                />
                {/* show and hide pass */}
                {id === 'password' && (
                    <div
                        onClick={() => setShowPass(!showPass)}
                        className="absolute top-3 right-3 
                            cursor-pointer"
                    >
                        <img src={showPass ? show_pass : hide_pass} alt="" />
                    </div>
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

export default InputCommon;
