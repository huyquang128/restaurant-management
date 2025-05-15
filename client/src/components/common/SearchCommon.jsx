/* eslint-disable react/prop-types */
import search_black from '@/assets/icon/search_black.svg';
import search_white from '@/assets/icon/search_white.svg';
import { useSelector } from 'react-redux';
import RotatingLinesCommon from './spinnerAnimation/RotatingLinesCommon';

function SearchCommon({ ...props }) {
    const { charSearch, setCharSearch, handleChange, isLoading } = props;
    const authStore = useSelector((state) => state.auth);
    return (
        <div className="relative">
            <img
                src={authStore.theme === 'light' ? search_black : search_white}
                alt=""
                className="h-8 absolute top-1.5 left-2 "
            />
            <input
                type="text"
                placeholder="Tìm mặt hàng..."
                className="border-none pl-14 pr-3 py-2 outline-bg-tertiary outline
                             bg-bg-secondary focus:outline-yellow-primary w-full rounded-md
                             text-text-primary"
                value={charSearch}
                onChange={(e) => setCharSearch(e.target.value)}
            />
            {isLoading && (
                <div className="absolute right-5 top-0 translate-y-2.5">
                    <RotatingLinesCommon height="25" width="25" />
                </div>
            )}
        </div>
    );
}

export default SearchCommon;
