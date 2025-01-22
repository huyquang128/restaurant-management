/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import TooltipCommon from './TooltipCommon';
import banner_1 from '@/assets/image/banner_1.jpg';

function AvatarCommon({
    isOpenTooltipUser,
    setIsOpenTooltipUser,
    handleCloseTooltip,
    userStore,
    isCloseTooltipAnimation,
}) {
    return (
        <>
            <Link>
                <div
                    onMouseEnter={() => setIsOpenTooltipUser(true)}
                    onMouseLeave={handleCloseTooltip}
                    className="relative cursor-pointer flex items-center gap-2 max-md:hidden"
                >
                    <div
                        className="h-8 w-8 rounded-full bg-black flex justify-center items-center
                            overflow-hidden border"
                    >
                        <img
                            src={banner_1}
                            alt=""
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div>{userStore?.user?.username}</div>
                    {isOpenTooltipUser && (
                        <TooltipCommon
                            isOpenTooltip={isOpenTooltipUser}
                            setIsOpenTooltip={setIsOpenTooltipUser}
                            isCloseTooltipAnimation={isCloseTooltipAnimation}
                        />
                    )}
                    <div className="absolute -bottom-5 bg-transparent h-10 w-20 right-1/2 translate-x-1/2"></div>
                </div>
            </Link>
        </>
    );
}

export default AvatarCommon;
