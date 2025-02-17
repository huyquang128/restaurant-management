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
import { deleteProduct, getAllProductPages, getAllProducts } from '@/redux/productSlice';

import TooltipCommon from '@/components/common/TooltipCommon';
import ActImportExportTooltip from '@/components/tooltipsContent/ActImportExportTooltip';
import SearchModal from '@/components/modals/SearchModal';
import BlockListItemCommon from '@/components/admin/BlockListItemCommon';

const categories = [
    { name: 'Tên mặt hàng' },
    { name: 'Giá thành' },
    { name: 'Đơn vị tính' },
    { name: 'Số lượng' },
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
        <div className="font-cabin ">
            <div className="text-xl font-medium mb-5 text-text-primary">
                Danh sách mặt hàng
            </div>
            <div className="flex justify-between mb-5 flex-wrap items-center">
                <Link to="/admin/product-items/add-product">
                    <Button
                        icon={add_white}
                        title="Thêm mặt hàng"
                        bg="add"
                        text_color="white"
                        bg_border="black"
                    />
                </Link>
                <div className="flex gap-2 max-sm:hidden">
                    <Button
                        icon={import_white}
                        title="Import"
                        bg="import"
                        text_color="white"
                        bg_border="green"
                    />
                    <Button
                        icon={export_white}
                        title="Export"
                        bg="export"
                        text_color="white"
                        bg_border="green"
                    />
                </div>
                <div className="relative sm:hidden">
                    <img
                        onClick={() => setIsOpenTooltipActImportExport(true)}
                        src={
                            authStore.theme === 'light'
                                ? more_black
                                : more_white
                        }
                        alt=""
                        className="cursor-pointer"
                    />
                    {isOpenTooltipActImportExport && (
                        <TooltipCommon
                            content={<ActImportExportTooltip />}
                            isOpenTooltip={isOpenTooltipActImportExport}
                            isCloseTooltipAnimation={
                                isCloseTooltipActImportExport
                            }
                            handleOutSide={closeTooltipActImportExport}
                            type="imp-exp"
                        />
                    )}
                </div>
            </div>

            {/* search product */}
            <div
                className="mb-5 flex justify-between text-text-primary items-center
                            max-sm:flex-col-reverse max-sm:items-end"
            >
                <div className="max-sm:mt-5">
                    <span className="">Hiển thị </span>(
                    {productStore.products
                        ? productStore.products?.data?.length +
                          ' / ' +
                          productStore.products?.totalProducts
                        : 0}
                    ) <span className="">mặt hàng</span>
                </div>
                <div
                    onClick={() => setIsOpenSearchModal(true)}
                    className="max-xs:w-full"
                >
                    <SearchCommon />
                </div>
            </div>

            {/* block list item */}
            <BlockListItemCommon
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                arr={productStore.products?.data}
                arrCategory={categories}
                isLoading={productStore.isLoading}
                totalProducts={productStore.products?.totalProducts}
                pageSize={productStore.products?.pageSize}
                getPageFunc={getAllProductPages}
                dataUpload={currentPage}
                intro="Quản lý các mặt hàng, món ăn tại nhà hàng"
                linkToDetailItem="/admin/product-items"
                title="mặt hàng"
                funcCallApiDelete={deleteProduct}
                funcCallApiGet={getAllProducts}
            />

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
