import AvatarCommon from '../common/AvatarCommon';
import bell_black from '@/assets/icon/bell_black.svg';
import search_black from '@/assets/icon/search_black.svg';
function HeaderAdmin() {
    return (
        <div
            className="flex items-center bg-bg-secondary justify-between
                        mx-4 p-5 font-cabin rounded-lg"
        >
            <div className="bg-bg-tertiary">
                <div className="border flex items-center rounded-lg overflow-hidden p-1">
                    <img src={search_black} alt="" className="h-7 " />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="px-2 outline-none border-none"
                    />
                </div>
            </div>
            <div className="flex gap-3">
                <img src={bell_black} alt="" />
                <AvatarCommon />
            </div>
        </div>
    );
}

export default HeaderAdmin;
