/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import TooltipCommon from './TooltipCommon';
import banner_1 from '@/assets/image/banner_1.jpg';
import UserTooltip from '../tooltipsContent/UserTooltip';
import CapitalizeFirstLetter from './CapitalizeFirstLetter';

function AvatarCommon({
    isOpenTooltipUser,
    setIsOpenTooltipUser,
    handleCloseTooltip,
    userStore,
    isCloseTooltipAnimation,
    type = 'user',
}) {
    const handleOutSide = () => {
        setIsOpenTooltipUser(true);
    };

    return (
        <>
            <Link>
                <div
                    onMouseEnter={() => setIsOpenTooltipUser(true)}
                    onMouseLeave={handleCloseTooltip}
                    className={`relative cursor-pointer flex items-center gap-2 ${
                        type === 'admin' ? '' : 'max-md:hidden'
                    }`}
                >
                    {type === 'admin' && (
                        <div className="flex gap-2 items-center ">
                            <span className="opacity-70">Xin chào, </span>
                            <div className="max-md:hidden line-clamp-1 font-semibold">
                                {CapitalizeFirstLetter(
                                    userStore?.user?.username || ''
                                )}
                            </div>
                        </div>
                    )}
                    <div
                        className="h-10 w-10 rounded-full bg-black flex justify-center items-center
                            overflow-hidden border"
                    >
                        <img
                            src={banner_1}
                            alt=""
                            className="object-cover w-full h-full"
                        />
                    </div>
                    {type !== 'admin' && (
                        <div className="max-md:hidden line-clamp-1">
                            {userStore?.user?.username}
                        </div>
                    )}

                    {isOpenTooltipUser && (
                        <TooltipCommon
                            isOpenTooltip={isOpenTooltipUser}
                            setIsOpenTooltip={setIsOpenTooltipUser}
                            isCloseTooltipAnimation={isCloseTooltipAnimation}
                            type="avatar"
                            handleOutSide={handleOutSide}
                            content={<UserTooltip />}
                        />
                    )}
                    <div className="absolute -bottom-3 bg-transparent h-5 w-24 max-md:w-[50px] -right-2"></div>
                </div>
            </Link>
        </>
    );
}

export default AvatarCommon;
