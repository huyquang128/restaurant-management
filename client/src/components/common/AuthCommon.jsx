/* eslint-disable react/prop-types */
import auth from '@/assets/image/auth.jpg';
import auth_1 from '@/assets/image/auth_1.png';
import google from '@/assets/icon/google.svg';
import fb from '@/assets/icon/fb.svg';
import InputCommon from '@/components/common/InputCommon';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';

function AuthCommon({ type, formik }) {
    const authStore = useSelector((state) => state.auth);
    return (
        <div className="flex font-cabin max-sm:flex-wrap-reverse">
            <div
                className={`w-1/2  items-center py-5 min-h-screen flex justify-center
                             max-md:w-2/3 max-sm:w-full max-sm:min-h-full`}
            >
                <motion.img
                    initial={{ opacity: 0, y: '-90%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    transition={{ duration: 0.7 }}
                    src={auth_1}
                    alt=""
                    className="h-52 absolute -top-20 -left-20 max-sm:hidden"
                />
                <div className="w-2/3 max-md:w-3/4 max-sm:w-full max-sm:px-5">
                    <Link to="/">
                        <motion.h1
                            initial={{ opacity: 0, y: '-100%' }}
                            animate={{ opacity: 1, y: '0%' }}
                            transition={{ duration: 1.3 }}
                            className="font-oswald text-center text-4xl mb-5 max-sm:hidden
                        "
                        >
                            SAVOR.
                        </motion.h1>
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: '0%' }}
                        transition={{ duration: 1.5 }}
                        className="font-oswald font-semibold text-3xl text-center mb-4 max-sm:hidden"
                    >
                        {type === 'register' ? 'Đăng ký' : 'Đăng nhập'}
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: '0%' }}
                        transition={{ duration: 1.7 }}
                        className="text-center mb-5 text-lg text-gray-primary"
                    >
                        Chào mừng bạn đến với ngôi nhà của ẩm thực.
                    </motion.p>

                    <motion.form
                        initial={{ opacity: 0, y: '20%' }}
                        animate={{ opacity: 1, y: '0%' }}
                        transition={{ duration: 1.9 }}
                        onSubmit={formik.handleSubmit}
                        className="mb-5"
                    >
                        {type === 'register' && (
                            <InputCommon
                                id="username"
                                label="Tài khoản"
                                type="text"
                                placeholder="Nhập tài khoản"
                                formik={formik}
                            />
                        )}

                        <InputCommon
                            id="email"
                            autoComplete="email"
                            label="Email"
                            type="text"
                            placeholder="Nhập Email"
                            formik={formik}
                        />
                        <InputCommon
                            id="password"
                            autoComplete="password"
                            label="Mật khẩu"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            formik={formik}
                        />
                        <div
                            className="text-end hover:text-yellow-primary transition-colors ease-linear duration-300
                                         -translate-y-3 cursor-pointer text-gray-primary"
                        >
                            Quên mật khẩu?
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg"
                        >
                            {authStore.isLoading ? (
                                <div className="flex justify-center">
                                    <ColorRing
                                        height="25"
                                        width="80"
                                        colors={[
                                            '#e15b64',
                                            '#f47e60',
                                            '#f8b26a',
                                            '#abbd81',
                                            '#849b87',
                                        ]}
                                    />
                                </div>
                            ) : type === 'register' ? (
                                'ĐĂNG KÝ'
                            ) : (
                                ' ĐĂNG NHẬP'
                            )}
                        </button>
                    </motion.form>
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: '0%' }}
                        transition={{ duration: 1.9 }}
                        className="flex gap-2 items-center text-gray-primary justify-center mb-5"
                    >
                        <span>hoặc đăng nhập với nền tảng mạng xã hội</span>
                    </motion.div>
                    <div className="flex justify-center gap-3">
                        <motion.div
                            initial={{ opacity: 0, x: '-100%' }}
                            animate={{ opacity: 1, x: '0%' }}
                            transition={{ duration: 1.9 }}
                            className="border p-3 w-1/2 rounded-lg flex items-center justify-center
                                        gap-3 hover:bg-gray-200 cursor-pointer transition-colors ease-in-out
                                        duration-500"
                        >
                            <img src={google} alt="" className="h-6" />
                            <div>Google</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: '0%' }}
                            transition={{ duration: 1.9 }}
                            className="border p-3 w-1/2 rounded-lg flex items-center justify-center
                                        gap-3 hover:bg-gray-200 cursor-pointer transition-colors ease-in-out
                                        duration-500"
                        >
                            <img src={fb} alt="" className="h-6" />
                            <div>Facebook</div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: '0%' }}
                        transition={{ duration: 1.9 }}
                        className="text-center mt-2"
                    >
                        {type === 'register'
                            ? 'Bạn đã có tài khoản?'
                            : 'Bạn chưa có tài khoản?'}
                        <Link to={type === 'register' ? '/login' : '/register'}>
                            <span className="text-yellow-primary">
                                {type === 'register' ? 'Đăng nhập' : 'Đăng ký'}
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </div>
            <div
                className={`w-1/2 p-2 max-md:p-5 max-sm:h-64 max-sm:w-full  
                        h-screen relative`}
            >
                <motion.img
                    initial={{ opacity: 0, x: '50%' }}
                    animate={{ opacity: 1, x: '0%' }}
                    transition={{ duration: 2 }}
                    src={auth}
                    alt=""
                    className="h-full w-full object-cover rounded-lg max-sm:brightness-75"
                />
                <Link to="/">
                    <h1
                        className="font-oswald text-center text-4xl mb-5
                         sm:hidden absolute top-1/2 -translate-y-1/2 text-white
                         right-1/2 translate-x-1/2"
                    >
                        SAVOR.
                    </h1>
                </Link>
            </div>
        </div>
    );
}

//isTranslateX

export default AuthCommon;
