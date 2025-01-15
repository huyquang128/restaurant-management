import banner_1 from '@/assets/image/banner_1.jpg';
import {
    faChevronRight,
    faMinus,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router';

function ProductDetail() {
    const [isCategoryActive, setIsCategoryActive] = useState(false);

    return (
        <div className="bg-white">
            <div
                className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-full max-xs:px-3 max-xs:mx-0 mx-auto
                           font-cabin mt-28 pt-5 pb-10" 
            >
                {/* link */}
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <Link to="/">
                        <span>Trang chủ</span>
                    </Link>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-xs"
                    />
                    <Link to="/product">
                        <span>Sản phẩm</span>
                    </Link>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-xs"
                    />
                    <span>Peach and Bell Pepper Chutney</span>
                </div>

                {/* product introduction */}
                <div className="flex gap-10 mb-10 max-md:flex-wrap">
                    <img
                        src={banner_1}
                        alt=""
                        className="w-[555px] h-[555px] max-lg:w-[450px] max-lg:h-[450px] 
                                    object-cover max-md:w-full max-md:h-[690px] max-sm:h-[420px]"
                    />
                    <div className="">
                        <h2 className="font-oswald text-4xl font-bold mb-3">
                            Peach and Bell Pepper Chutney
                        </h2>
                        <div className="font-oswald font-bold text-2xl mb-4">
                            <span className="mr-4 text-gray-secondary line-through decoration-1">
                                $9.00
                            </span>
                            <span className="text-yellow-primary">$9.00</span>
                        </div>
                        <div className="dots-menu"></div>
                        <div className="mt-4 text-gray-primary mb-10">
                            This colourful, sweet and spicy chutney makes a
                            delicious addition to burgers, cheese boards, ham
                            sandwiches or curries. Heat the oil in a preserving
                            pan or large wide saucepan. Add the onions and fry
                            for a few mins until starting to soften. Add the
                            ginger and cook until soft.
                        </div>
                        <div className="mb-10 flex gap-3">
                            <div
                                className="border px-3 py-4 w-1/3 flex justify-between 
                                        items-center cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faMinus} />
                                <input
                                    type="text"
                                    className="w-2/3 outline-none text-center"
                                />
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            <button
                                className="bg-gray-primary text-white w-2/3 hover:bg-yellow-primary
                                                transition-color ease-in-out duration-300"
                            >
                                THÊM VÀO GIỎ HÀNG
                            </button>
                        </div>
                        <div className="mb-4">
                            Categories:{' '}
                            <span className="text-gray-primary">
                                Modern Fusion, Starters
                            </span>
                        </div>
                        <div>
                            Tag:{' '}
                            <span className="text-gray-primary">Delicious</span>
                        </div>
                    </div>
                </div>

                {/* category description && reviews */}
                <div className="flex gap-5 mb-5">
                    <div
                        onClick={() => setIsCategoryActive(false)}
                        className={` relative ${
                            isCategoryActive ? '' : 'text-yellow-primary '
                        }`}
                    >
                        <div>Mô tả</div>
                        <div
                            className={`bg-yellow-primary absolute bottom-0 h-[2px] ${
                                isCategoryActive ? 'w-0' : 'w-full '
                            } transition-all ease-in-out duration-300`}
                        ></div>
                    </div>
                    <div
                        onClick={() => setIsCategoryActive(true)}
                        className={`relative ${
                            isCategoryActive ? 'text-yellow-primary' : ' '
                        }`}
                    >
                        <div> Đánh giá(2)</div>
                        <div
                            className={`bg-yellow-primary absolute bottom-0 h-[2px] ${
                                isCategoryActive ? 'w-full ' : 'w-0'
                            } transition-all ease-in-out duration-300 `}
                        ></div>
                    </div>
                </div>

                <div className="border py-5 px-10 max-sm:px-3">
                    {isCategoryActive ? (
                        <div>
                            <div className="mb-5 font-semibold">
                                2 ĐÁNH GIÁ VỀ CHUTNEY ĐÀO VÀ TIÊU CHUÔNG
                            </div>

                            <div className="flex justify-between ">
                                <div className="flex gap-5">
                                    <img
                                        src={banner_1}
                                        alt=""
                                        className="h-20 w-20 rounded-full"
                                    />

                                    <div>
                                        <div>James Koster</div>
                                        <div className="text-gray-primary">
                                            – 7 Jun 2013{' '}
                                        </div>
                                        <q className="text-gray-primary">
                                            The most attractive and delicious
                                            food i ever tasted… This just might
                                            be it.
                                        </q>
                                    </div>
                                </div>

                                {/* stars */}
                                <div>stars</div>
                            </div>

                            {/* act add reviews */}
                            <div className="mt-5">
                                <div className="font-semibold">
                                    THÊM BÌNH LUẬN
                                </div>
                                <p className="text-gray-primary">
                                    Địa chỉ email của bạn sẽ không được công bố.
                                    Các trường bắt buộc được đánh dấu
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="">
                            <div className="mb-5 text-xl">MÔ TẢ</div>
                            <div className="text-gray-primary">
                                Description Stir in the spices for 1-2 mins to
                                release their aroma, then add the peppers,
                                vinegar and sugar. Simmer for 10 mins until the
                                sugar has dissolved and the peppers are starting
                                to soften. Add the chopped onions, minced
                                ginger, bell peppers and the peach along with a
                                big pinch of orange zest.
                            </div>
                        </div>
                    )}
                </div>

                {/* Related products */}
            </div>
        </div>
    );
}

export default ProductDetail;
