import arr_right_3_yellow from '@/assets/icon/arr_right_3_yellow.svg';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PaginationCommon from '@/components/common/Pagination/PaginationCommon';
import { getPostPage } from '@/redux/postSlice';
import { Link } from 'react-router';

const arrCategory = [
    { name: 'Tất cả' },
    { name: 'Ưu đãi' },
    { name: 'Sự kiện' },
];

function SpecialOffer() {
    const postStore = useSelector((state) => state.post);
    const [currentPage, setCurrentPage] = useState(1);

    const [urlImg, setUrlImg] = useState({});

    useEffect(() => {
        if (postStore.posts?.data) {
            try {
                const arr = postStore.posts.data.map((item) =>
                    JSON.parse(item.content).find(
                        (image) => image.type === 'image'
                    )
                );
                arr.map((item, index) =>
                    setUrlImg((prev) => {
                        return {
                            ...prev,
                            [index]: item && item.url,
                        };
                    })
                );
            } catch (error) {
                console.error('Lỗi khi parse JSON:', error);
            }
        }
    }, [postStore.posts?.data]);

    return (
        <div className=" mt-28 font-cabin ">
            {/* content primary */}
            <div className="bg-white pb-10 pt-5">
                <div
                    className="w-xl max-lg:w-lg max-md:w-md max-sm:w-sm max-xs:w-xs mx-auto
                               "
                >
                    {/* CATEGORY */}
                    <div className="flex ">
                        {arrCategory.map((item, index) => (
                            <div
                                key={index}
                                className="px-2 py-1 cursor-pointer font-medium"
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>

                    {/* post news */}
                    <div className="mt-5 grid grid-cols-3 gap-5 max-lg:grid-cols-2">
                        {postStore.posts?.data?.map((item, index) => {
                            const url = urlImg[index];

                            return (
                                <Link
                                    key={index}
                                    to={`/special-offer/${item.slug}`}
                                >
                                    <div
                                        key={index}
                                        className="rounded-lg border overflow-hidden cursor-pointer"
                                    >
                                        <img
                                            src={url}
                                            alt=""
                                            className=" object-cover "
                                        />
                                        <div className="px-5 mt-2 pb-3 font-medium">
                                            <div className="">{item.title}</div>
                                        </div>
                                        <div className="px-5 flex items-center mb-3 gap-2">
                                            <img
                                                src={arr_right_3_yellow}
                                                alt=""
                                                className="w-7"
                                            />
                                            <div className="text-sm font-medium">
                                                XEM NGAY
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-10 flex justify-end text-text-primary font-semibold items-start ">
                        <PaginationCommon
                            totalProducts={postStore?.posts?.data?.totalPosts}
                            getPageFunc={getPostPage}
                            pageSize={postStore.posts?.data?.pageSize}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataUpload={{
                                type: 'specialOffer',
                                pageNumber: currentPage,
                            }}
                            type="product"
                            client={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecialOffer;
