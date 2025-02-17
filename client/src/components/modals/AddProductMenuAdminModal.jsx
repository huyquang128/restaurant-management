/* eslint-disable react/prop-types */
import Button from '@/components/common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { motion } from 'framer-motion';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import SearchCommon from '../common/SearchCommon';
import avatar_default_dishes from '@/assets/icon/avatar_default_dishes.svg';
import RotatingLinesCommon from '../common/spinnerAnimation/RotatingLinesCommon';
import { useDispatch, useSelector } from 'react-redux';
import FormatVND from '../common/FormatVND';
import CapitalizeFirstLetter from '../common/CapitalizeFirstLetter';
import ToastMsg from '../common/ToastMsg';
import { debounce } from 'lodash';
import {
    searchProductNameNoPage,
    setProductSelectedInCategory,
} from '@/redux/productSlice';
import { setProductSelectedCategory } from '@/redux/categoryDishesSlice';

function AddProductMenuAdminModal({ ...props }) {
    const {
        isOpenModal,
        setIsOpenModal,
        arrProductIdSelected,
        setArrProductIdSelected,
    } = props;
    const dispatch = useDispatch();
    const productStore = useSelector((state) => state.product);

    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);
    const [charSearch, setCharSearch] = useState('');

    //debounce giảm tải số lần call api
    const debouncedSearch = debounce((textSearch) => {
        if (textSearch.length > 0) {
            dispatch(searchProductNameNoPage(textSearch));
        }
    }, 500);

    useEffect(() => {
        debouncedSearch(charSearch);
        return () => debouncedSearch.cancel(); // cleanup effect
    }, [charSearch]);

    const closeModal = () => {
        setIsCloseModalAnimation(true);
        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsOpenModal(false);
        }, 300);
    };

    const handleSelectedArr = (product) => {
        setArrProductIdSelected((prevProduct) =>
            arrProductIdSelected.some((item) => item._id === product._id)
                ? arrProductIdSelected.filter(
                      (prod) => prod._id !== product._id
                  )
                : [product, ...prevProduct]
        );
    };

    const handleSaveProductSelected = () => {
        arrProductIdSelected.length <= 0
            ? ToastMsg({ msg: 'Bạn chưa chọn món ăn nào.', status: 'error' })
            : (closeModal(),
              dispatch(
                  setProductSelectedInCategory(arrProductIdSelected),
                  dispatch(setProductSelectedCategory(arrProductIdSelected))
              ));
    };

    const formListProduct = (arr) => {
        return arr?.map((item, index) => (
            <div
                onClick={() => handleSelectedArr(item)}
                key={index}
                className={`grid grid-cols-12 bg-bg-tertiary text-text-primary my-3 py-2
                        rounded-lg items-center cursor-pointer hover:bg-color-active 
                        ${
                            arrProductIdSelected.some((a) => a._id === item._id)
                                ? 'bg-color-active'
                                : ''
                        }`}
            >
                <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={arrProductIdSelected.some(
                        (a) => a._id === item._id
                    )}
                    className="h-4 cursor-pointer max-xs:col-span-2"
                    readOnly
                />
                <div className="col-span-4 max-xs:col-span-6 hover:text-yellow-primary">
                    <div className="flex items-center gap-2">
                        <img
                            src={
                                item.images.length > 0
                                    ? item.images[0]?.url
                                    : avatar_default_dishes
                            }
                            alt=""
                            className={`h-14 w-12 rounded-lg ${
                                item.images.length > 0
                                    ? 'object-cover'
                                    : 'p-1 -translate-y-1.5'
                            }`}
                        />

                        <span className="">
                            {CapitalizeFirstLetter(item.name)}
                        </span>
                    </div>
                </div>
                <div className="col-span-4 text-center">
                    {FormatVND(item.selling)}
                </div>
                <div className="col-span-3 text-center max-xs:hidden">
                    {CapitalizeFirstLetter(item.unit?.name)}
                </div>
            </div>
        ));
    };

    const handleExitModal = () => {
        closeModal();
    };

    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-black bg-opacity-15 ">
            <motion.div
                initial={{ opacity: 0 }}
                animate={
                    isOpenModal && !isCloseModalAnimation
                        ? { opacity: 1 }
                        : { opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="bg-bg-secondary w-[800px] p-3 max-md:w-[600px] max-sm:w-[480px]
                         rounded-lg shadow-lg max-xs:w-[390px]"
            >
                <div className="max-sm:mb-5 flex justify-end">
                    <FontAwesomeIcon
                        onClick={closeModal}
                        icon={faXmark}
                        className="h-30 w-30 px-3 py-2.5 bg-gray-200 text-black mt-2 shadow-2xl 
                                    rounded-full cursor-pointer hover:bg-gray-300"
                    />
                </div>
                <h1 className="mb-5 text-center text-xl text-text-primary">
                    Thêm mặt hàng
                </h1>

                <div>
                    <SearchCommon
                        charSearch={charSearch}
                        setCharSearch={setCharSearch}
                        isLoading={productStore.isLoadingSearch}
                    />
                </div>

                {/* list product item */}
                {productStore.isLoading ? (
                    <div className="flex justify-center py-10 ">
                        <RotatingLinesCommon />
                    </div>
                ) : productStore.products?.data?.length > 0 ? (
                    <div className={`h-96 overflow-y-scroll`}>
                        {formListProduct(
                            charSearch.length > 0
                                ? productStore.productsSearch?.data
                                : productStore.products?.data
                        )}
                    </div>
                ) : (
                    <div className="flex items-center flex-col py-10">
                        <img
                            src={avatar_default_dishes}
                            alt=""
                            className="h-20"
                        />
                        <div className="text-text-primary">
                            Chưa có mặt hàng nào
                        </div>
                    </div>
                )}

                <div className="flex gap-2 mt-5 justify-end ">
                    <div className="w-28">
                        <Button
                            bg="exit"
                            title="Thoát"
                            handleClick={handleExitModal}
                            type="button"
                        />
                    </div>
                    <div onClick={handleSaveProductSelected} className="w-28">
                        <Button bg="save" title="Thêm" type="button" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default AddProductMenuAdminModal;
