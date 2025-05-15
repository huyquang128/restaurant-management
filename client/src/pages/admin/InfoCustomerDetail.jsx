import { useDispatch, useSelector } from 'react-redux';
import phone_2 from '@/assets/icon/phone_2.svg';
import email_2 from '@/assets/icon/email_2.svg';
import edit_blue from '@/assets/icon/edit_blue.svg';
import user_blue from '@/assets/icon/user_blue.svg';
import key from '@/assets/icon/key.svg';
import location from '@/assets/icon/location.svg';
import AvatarDefault from '@/components/common/AvatarDefault';

function InfoCustomerDetail() {
    const authStore = useSelector((state) => state.auth);

    return (
        <div className="font-cabin text-text-primary">
            <div className="flex gap-6 ">
                {/* user */}
                <div className="flex flex-1 gap-4 bg-bg-secondary p-5 rounded-lg">
                    {/* <div
                        className=" w-40 bg-blue-500 rounded-lg flex 
                                justify-center items-center"
                    >
                        H
                    </div> */}
                    <div className="flex-1">
                        <div className="flex  justify-between mb-3">
                            <div className="flex gap-2 items-center mb-3">
                                <div>{AvatarDefault('huy')}</div>
                                <div className="text-2xl font-semibold">
                                    user7
                                </div>
                            </div>
                            <div
                                className="bg-bg-blue h-7 w-7 rounded-lg flex 
                                      justify-center items-center "
                            >
                                <img src={edit_blue} alt="" className="h-5" />
                            </div>
                        </div>
                        <div className="opacity-70 mb-5 text-sm flex gap-2 items-center">
                            <img src={location} alt="" />
                            <span>Hà nội</span>
                        </div>
                        <div className="grid grid-cols-2 gap-5 items-center font-medium ">
                            <div className="flex gap-2 items-center">
                                <div
                                    className="bg-bg-blue h-7 w-7 rounded-lg flex 
                                            justify-center items-center"
                                >
                                    <img src={email_2} alt="" className="h-5" />
                                </div>
                                <span className="opacity-80">@gmail.combo</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div
                                    className="bg-bg-green h-7 w-7 rounded-lg flex 
                                            justify-center items-center"
                                >
                                    <img src={phone_2} alt="" className="h-5" />
                                </div>
                                <span className="opacity-80">9190238</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div
                                    className="bg-bg-blue h-7 w-7 rounded-lg flex 
                                            justify-center items-center"
                                >
                                    <img
                                        src={user_blue}
                                        alt=""
                                        className="h-5"
                                    />
                                </div>
                                <span className="opacity-80">username</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div
                                    className="bg-bg-red h-7 w-7 rounded-lg flex 
                                            justify-center items-center"
                                >
                                    <img src={key} alt="" className="h-5" />
                                </div>
                                <span className="opacity-80">mật khẩu</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* card bank */}
                <div className="w-[380px]  rounded-2xl text-white relative overflow-hidden bg-[#1c2b28]">
                    {/* <!-- Dải chéo 1 --> */}
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,_#00000033_25%,_transparent_25%)]"></div>
                    {/* <!-- Dải chéo 2 --> */}
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,_#00000022_50%,_transparent_50%)]"></div>
                    {/* <!-- Nội dung --> */}
                    <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <div className="text-3xl font-semibold">
                                $34 000.00
                            </div>
                            <div className="text-2xl font-bold">VISA</div>
                        </div>
                        <div className="text-xl tracking-widest mt-6">
                            **** **** **** 7223
                        </div>
                        <div className="flex justify-between text-sm mt-4 text-gray-300">
                            <div>
                                <div>Card Holder</div>
                                <div className="text-white text-lg">
                                    Akbarali Khasanov
                                </div>
                            </div>
                            <div className="text-right">
                                <div>Expires</div>
                                <div className="text-white text-lg">03/26</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoCustomerDetail;
