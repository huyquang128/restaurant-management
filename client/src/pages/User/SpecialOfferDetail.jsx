import formatFullDate from '@/components/common/formatFullDate';
import { setUrlImgProduct } from '@/redux/productSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import Advertisement_1 from '@/assets/image/Advertisement_1.jpg';
import Advertisement_2 from '@/assets/image/Advertisement_2.jpg';
import Advertisement_3 from '@/assets/image/Advertisement_3.jpg';

function SpecialOfferDetail() {
    const postStore = useSelector((state) => state.post);
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
                              grid grid-cols-6 gap-x-10 gap-y-3"
                >
                    <div className="col-span-6">Tin tức > ưu đãi</div>
                    <div className="col-span-4">
                        <h1 className="font-medium mb-5 text-2xl">
                            {postStore.posts?.data[0].title}
                        </h1>
                        <div className="text-sm text-gray-500">
                            {formatFullDate(postStore.posts?.data[0].createdAt)}
                        </div>
                        {JSON.parse(postStore.posts?.data[0].content).map(
                            (block, index) => {
                                if (block.type === 'paragraph') {
                                    const text = block.children
                                        ?.map((child) => child.text)
                                        .join('');
                                    return <p key={index}>{text}</p>;
                                }
                                if (block.type === 'image') {
                                    return (
                                        <div key={index} className="my-4">
                                            <img
                                                src={block.url}
                                                alt=""
                                                className="w-full h-auto rounded-md shadow"
                                            />
                                        </div>
                                    );
                                }
                                return null;
                            }
                        )}
                    </div>
                    <div className="col-span-2">
                        {/*  */}
                        <div>
                            <h3 className="mb-3 text-xl font-semibold">
                                Tin mới lên
                            </h3>
                            <div className="">
                                {postStore.posts?.data?.map((item, index) => {
                                    const url = urlImg[index];

                                    return (
                                        <Link
                                            key={index}
                                            to={`/special-offer/${item.slug}`}
                                        >
                                            <div
                                                key={index}
                                                className="flex items-center verflow-hidden cursor-pointer
                                                            py-5 border-t border-b border-dashed border-gray-300
                                                            gap-3"
                                            >
                                                <div className="pb-3 text-sm">
                                                    <div className="">
                                                        {item.title}
                                                    </div>
                                                </div>
                                                <img
                                                    src={url}
                                                    alt=""
                                                    className="object-cover w-32 h-20 rounded-lg"
                                                />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className=" mt-5">
                                <img
                                    src={Advertisement_1}
                                    alt=""
                                    className="rounded-lg"
                                />
                            </div>
                            <div className=" mt-5">
                                <img
                                    src={Advertisement_2}
                                    alt=""
                                    className="rounded-lg"
                                />
                            </div>
                            <div className=" mt-5">
                                <img
                                    src={Advertisement_3}
                                    alt=""
                                    className="rounded-lg"
                                />
                            </div>
                        </div>

                        {/*  */}
                        <div></div>
                    </div>
                    <div className="col-span-6 mt-10 relative  overflow-hidden h-[219px]">
                        <video
                            className="h-full object-cover rounded-lg appearance-none"
                            autoPlay
                            loop
                            muted
                            playsinline
                        >
                            <source
                                src="https://storage.quannhautudo.com/Data/images/home/Bia-Web.mp4"
                                type="video/mp4"
                            ></source>
                        </video>
                        <div className="absolute flex inset-0 p-10 justify-between  items-center">
                            <div className="font-semibold">
                                <div className="text-5xl font-oswald  mb-2">
                                    SAVOR
                                </div>
                                <div className="text-3xl ">
                                    Đặt tiệc online, vô vàn ưu đãi
                                </div>
                            </div>
                            <button className="border-black border-2 px-5 py-2 rounded-lg font-semibold text-3xl">
                                Đặt ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecialOfferDetail;
