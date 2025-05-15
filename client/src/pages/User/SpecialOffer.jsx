import tintuc1 from '@/assets/image/tintuc1.webp';
import arr_right_3_yellow from '@/assets/icon/arr_right_3_yellow.svg';

const arrCategory = [
    { name: 'Tất cả' },
    { name: 'Ưu đãi' },
    { name: 'Sự kiện' },
];

const arrNews = [
    {
        url: tintuc1,
        name: 'TỰ HÀO VIỆT NAM – MỘT DỰ ÁN ĐẶC BIỆT CỦA QUÁN NHẬU SAVOR',
    },
    {
        url: tintuc1,
        name: 'TỰ HÀO VIỆT NAM – MỘT DỰ ÁN ĐẶC BIỆT CỦA QUÁN NHẬU SAVOR',
    },
    {
        url: tintuc1,
        name: 'TỰ HÀO VIỆT NAM – MỘT DỰ ÁN ĐẶC BIỆT CỦA QUÁN NHẬU SAVOR TỰ HÀO VIỆT NAM – MỘT DỰ ÁN ĐẶC BIỆT CỦA QUÁN NHẬU SAVOR',
    },
];

function SpecialOffer() {
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
                            <div key={index} className="px-2 py-1 cursor-pointer font-medium">
                                {item.name}
                            </div>
                        ))}
                    </div>

                    {/* post news */}
                    <div className="mt-5 grid grid-cols-3 gap-5">
                        {arrNews.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-lg border overflow-hidden"
                            >
                                <img
                                    src={item.url}
                                    alt=""
                                    className=" object-cover "
                                />
                                <div className="px-5 mt-4 pb-3 font-medium">
                                    <div className="">{item.name}</div>
                                    <div className="flex gap-2 mt-3 items-center">
                                        <img src={arr_right_3_yellow} alt="" className="h-8" />
                                        <div className="text-sm">XEM NGAY</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecialOffer;
