/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import hide_pass from '@/assets/icon/hide_pass.svg';
import show_pass from '@/assets/icon/show_pass.svg';
import { useState } from 'react';

function InputCommon({ label, type, no_label, isRequired = false, ...props }) {
    const { formik, id } = props;
    const [showPass, setShowPass] = useState(false);
    const isErr = formik.touched[id] && formik.errors[id];
    const errMsg = formik.errors[id];

    return (
        <div className="">
            {!no_label && <div className="mb-2 text-text-primary">{label}</div>}
            <div className={`transition-all`}>
                <input
                    type={
                        type === 'password'
                            ? showPass
                                ? 'text'
                                : 'password'
                            : type
                    }
                    className={`w-full px-4 py-3 bg-bg-secondary outline-1 outline focus:outline-yellow-primary
                        text-text-primary rounded-lg ease-linear duration-200 
                     relative
                        ${isErr ? 'outline-red-500' : 'outline-transparent'}`}
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
