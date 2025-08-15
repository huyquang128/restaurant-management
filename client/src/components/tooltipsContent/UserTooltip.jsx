import banner_1 from '@/assets/image/banner_1.jpg';
import { logout } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import ToastMsg from '../common/ToastMsg';

function UserTooltip() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userStore = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout()).then((data) => {
            if (data.payload.success) {
                ToastMsg({
                    status: 'success',
                    msg: data.payload?.message,
                });
                navigate('/login');
            }
        });
    };

    return (
        <div className="px-4">
            <div className="flex flex-col justify-center items-center mt-5 ">
                <div
                    className="h-12 w-12 rounded-full bg-black
                    overflow-hidden border flex-col "
                >
                    <img
                        src={banner_1}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="line-clamp-1">{userStore.user?.username}</div>
            </div>
            <div className="border-b ">
                <Link to={`/user-detail/${userStore.user?.username}`}>
                    <div className="py-2 hover:text-yellow-primary transition-colors ease-linear duration-300">
                        Thông tin cá nhân
                    </div>
                </Link>

                <div className="pb-2 hover:text-yellow-primary transition-colors ease-linear duration-300">
                    Đơn hàng
                </div>
            </div>
            <div
                onClick={handleLogout}
                className="py-2 hover:text-yellow-primary transition-colors ease-linear duration-300"
            >
                logout
            </div>
        </div>
    );
}

export default UserTooltip;
