import tintuc1 from '@/assets/image/tintuc1.webp';
import arr_right_3_yellow from '@/assets/icon/arr_right_3_yellow.svg';
import Button from '@/components/common/Button/Button';
import { Link } from 'react-router';
import add_white from '@/assets/icon/add_white.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deletePost, getPostPage, getPostSlug } from '@/redux/postSlice';
import SlateViewer from '@/components/editor/SlateHtmlViewer';
import PaginationCommon from '@/components/common/Pagination/PaginationCommon';
import edit_blue from '@/assets/icon/edit_blue.svg';
import show_green from '@/assets/icon/show_green.svg';
import trash_red from '@/assets/icon/trash_red.svg';

function ManagementSpecialOffer() {
    const dispatch = useDispatch();
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
        <div>
            {/* CATEGORY */}
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-xl font-medium mb-2">
                        Bài viết ưu đãi
                    </div>
                    <div className="opacity-80 ">
                        Quản lý các bài viết ưu đãi của nhà hàng.
                    </div>
                </div>
                <Link to="/admin/management-news/special-offer/add-special-offer">
                    <Button
                        icon={add_white}
                        title="Thêm bài viết"
                        bg="add"
                        text_color="white"
                        bg_border="black"
                    />
                </Link>
            </div>

            {/* post news */}
            <div className="mt-5 grid grid-cols-3 gap-5 max-lg:grid-cols-2">
                {postStore.posts?.data?.map((item, index) => {
                    const url = urlImg[index];

                    return (
                        <div
                            key={index}
                            className="rounded-lg border overflow-hidden"
                        >
                            <img src={url} alt="" className=" object-cover " />
                            <div className="px-5 mt-4 pb-3 font-medium mb-4">
                                <div className="">{item.title}</div>
                            </div>

                            <div className="flex gap-8 pb-5 justify-center">
                                <Link
                                    to={`/admin/management-news/special-offer/${item.slug}`}
                                >
                                    <div
                                        className="h-9 w-9 bg-bg-green flex justify-center 
                                                    items-center rounded-lg cursor-pointer"
                                    >
                                        <img src={show_green} />
                                    </div>
                                </Link>

                                <Link
                                    to={`/admin/management-news/special-offer/${item.slug}`}
                                >
                                    <div
                                        className="h-9 w-9 bg-bg-blue flex justify-center
                                                items-center rounded-lg cursor-pointer"
                                    >
                                        <img src={edit_blue} className="h-4" />
                                    </div>
                                </Link>
                                <div
                                    onClick={() =>
                                        dispatch(deletePost(item._id)).then(
                                            (data) => {
                                                if (data.payload.success) {
                                                    getPostPage({
                                                        type: 'specialOffer',
                                                        pageNumber: currentPage,
                                                    });
                                                }
                                            }
                                        )
                                    }
                                    className="h-9 w-9 bg-bg-red flex justify-center 
                                                                        items-center rounded-lg cursor-pointer"
                                >
                                    <img src={trash_red} className="h-4" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/*  */}
            {/* <SlateViewer
                content={postStore.post && JSON.parse(postStore.post?.content)}
            /> */}

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
                />
            </div>
        </div>
    );
}

export default ManagementSpecialOffer;
