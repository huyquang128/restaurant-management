import SearchCommon from '@/components/common/SearchCommon';
import add_white from '@/assets/icon/add_white.svg';
import Button from '@/components/common/Button/Button';
import import_white from '@/assets/icon/import_white.svg';
import export_white from '@/assets/icon/export_white.svg';
import more_white from '@/assets/icon/more_white.svg';
import more_black from '@/assets/icon/more_black.svg';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
    deleteProduct,
    getAllProductPages,
    getAllProducts,
} from '@/redux/productSlice';

import TooltipCommon from '@/components/common/TooltipCommon';
import ActImportExportTooltip from '@/components/tooltipsContent/ActImportExportTooltip';
import SearchModal from '@/components/modals/SearchModal';
import BlockListItemCommon from '@/components/admin/BlockListItemCommon';
import PaginationCommon from '@/components/common/Pagination/PaginationCommon';
import edit_blue from '@/assets/icon/edit_blue.svg';
import show_green from '@/assets/icon/show_green.svg';
import trash_red from '@/assets/icon/trash_red.svg';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';

const categories = [
    { name: 'Tên mặt hàng' },
    { name: 'Giá thành' },
    { name: 'Đơn vị tính' },
    // { name: 'Số lượng' },
    { name: 'Ghi chú' },
];

function ProductsAdmin() {
    const productStore = useSelector((state) => state.product);
    const authStore = useSelector((state) => state.auth);

    const [isOpenTooltipActImportExport, setIsOpenTooltipActImportExport] =
        useState(false);
    const [isCloseTooltipActImportExport, setIsCloseTooltipActImportExport] =
        useState(false);
    const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
    const [isCloseSearchModalAnimation, setIsCloseSearchModalAnimation] =
        useState(false);
    const [charSearch, setCharSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    //handle Events
    const closeTooltipActImportExport = () => {
        setIsCloseTooltipActImportExport(true);

        setTimeout(() => {
            setIsCloseTooltipActImportExport(false);
            setIsOpenTooltipActImportExport(false);
        }, 300);
    };

    const closeModalSearch = () => {
        setIsCloseSearchModalAnimation(true);
        setTimeout(() => {
            setIsCloseSearchModalAnimation(false);
            setIsOpenSearchModal(false);
        }, 300);
    };

    return (
        <div className="font-cabin  text-text-primary">
            <div className="flex justify-between mb-32 items-center">
                <div>
                    <div className="text-xl font-medium mb-2">
                        Danh sách mặt hàng
                    </div>
                    <div className="opacity-80 ">
                        Quản lý mặt hàng của nhà hàng.
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-5">
                    <div
                        className=" flex justify-between text-text-primary items-center
                                max-sm:flex-col-reverse max-sm:items-end"
                    >
                        <div
                            onClick={() => setIsOpenSearchModal(true)}
                            className="max-xs:w-full"
                        >
                            <SearchCommon />
                        </div>
                    </div>

                    <Link to="/admin/product-items/add-product">
                        <Button
                            icon={add_white}
                            title="Thêm mặt hàng"
                            bg="add"
                            text_color="white"
                            bg_border="black"
                        />
                    </Link>
                    {/* search product */}
                </div>
            </div>

            {/* list product */}
            <div className="grid grid-cols-5 max-lg:grid-cols-3 max-xl:grid-cols-4 gap-x-5  gap-y-20 text-text-primary ">
                {productStore.products?.data?.map((item, index) => (
                    <div
                        key={index}
                        className="bg-bg-secondary flex flex-col items-center
                                    rounded-lg relative"
                    >
                        <img
                            src={item.images[0].url}
                            alt=""
                            className="h-36 w-36 rounded-full absolute -top-14 
                            shadow-header-shadow object-cover"
                        />
                        <div className="mt-28 font-oswald mb-2">
                            {item.name}
                        </div>
                        <div className="mb-5 text-sm flex gap-2 font-semibold">
                            <span className="text-yellow-primary">
                                {CapitalizeFirstLetter(
                                    item.categoryDishes?.name || ''
                                )}
                            </span>{' '}
                            <span className="text-gray-primary">/</span>
                            <span className="opacity-85">
                                {CapitalizeFirstLetter(item.unit.name)}
                            </span>
                        </div>
                        {/* act */}
                        <div className="flex gap-4 pb-5">
                            <Link to={`/admin/product-items/${item.slug}`}>
                                <div
                                    className="h-9 w-9 bg-bg-green flex justify-center 
                                            items-center rounded-lg cursor-pointer"
                                >
                                    <img src={show_green} />
                                </div>
                            </Link>

                            <Link to={`/admin/product-items/${item.slug}`}>
                                <div
                                    className="h-9 w-9 bg-bg-blue flex justify-center
                                                items-center rounded-lg cursor-pointer"
                                >
                                    <img src={edit_blue} className="h-4" />
                                </div>
                            </Link>
                            <div
                                className="h-9 w-9 bg-bg-red flex justify-center 
                                            items-center rounded-lg cursor-pointer"
                            >
                                <img src={trash_red} className="h-4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex justify-between text-text-primary font-semibold items-start ">
                <div className="opacity-80">
                    <span className="">Hiển thị </span>
                    {productStore.products
                        ? productStore.products?.data?.length +
                          ' trên ' +
                          productStore.products?.totalProducts
                        : 0}
                    <span className=""> mặt hàng</span>
                </div>
                <PaginationCommon
                    totalProducts={productStore.products?.totalProducts}
                    getPageFunc={getAllProductPages}
                    pageSize={productStore.products?.pageSize}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    dataUpload={currentPage}
                    type="product"
                />
            </div>

            {/* modal */}
            {isOpenSearchModal && (
                <SearchModal
                    isOpenModal={isOpenSearchModal}
                    closeModal={closeModalSearch}
                    isCloseModalAnimation={isCloseSearchModalAnimation}
                    arr={productStore.productsSearch?.data}
                    isLoading={productStore.isLoadingSearch}
                    charSearch={charSearch}
                    setCharSearch={setCharSearch}
                    currentPage={currentPage}
                />
            )}
        </div>
    );
}

export default ProductsAdmin;
