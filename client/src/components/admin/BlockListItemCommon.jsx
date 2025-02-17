/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import FormatVND from '@/components/common/FormatVnd';
import PaginationCommon from '@/components/common/PaginationCommon';
import BlockRemoveCommon from '@/components/common/BlockRemoveCommon';
import avatar_default_dishes from '@/assets/icon/avatar_default_dishes.svg';
import RotatingLinesCommon from '@/components/common/spinnerAnimation/RotatingLinesCommon';
import useCheckboxDelete from '../hooks/useCheckboxDelete.jsx.jsx';
import formatDate from '../common/formatDate.jsx';

function BlockListItemCommon({ ...props }) {
    const {
        currentPage,
        setCurrentPage,
        arr,
        isLoading,
        totalProducts,
        getPageFunc,
        pageSize,
        dataUpload,
        intro,
        arrCategory,
        type,
        linkToDetailItem,
        title,
        funcCallApiDelete,
        funcCallApiGet,
    } = props;

    const {
        arrActive,
        setArrActive,
        isShowBlockRemove,
        isAnimationCloseBlockRemove,
        isCheckedAll,
        setIsCheckedAll,
        hiddenBlockRemove,
        handleCheckedAll,
        handleActiveItem,
    } = useCheckboxDelete(arr);

    return (
        <div>
            {/* act remove product selected */}
            {isShowBlockRemove ? (
                <BlockRemoveCommon
                    arr={arrActive}
                    isShowBlock={isShowBlockRemove}
                    isAnimationHide={isAnimationCloseBlockRemove}
                    handleHideBlock={hiddenBlockRemove}
                    funcCallApiDelete={funcCallApiDelete}
                    funcCallApiGet={funcCallApiGet}
                    setIsCheckedAll={setIsCheckedAll}
                    title={title}
                />
            ) : (
                <div className="h-12 w-full mb-5 text-text-primary">
                    {intro}
                </div>
            )}

            <div>
                {/* list category */}
                <div className="grid grid-cols-12 items-center">
                    <input
                        type="checkbox"
                        name=""
                        onChange={handleCheckedAll}
                        checked={isCheckedAll}
                        id=""
                        className="h-4 cursor-pointer"
                    />
                    {arrCategory.map((item, index) => (
                        <div
                            key={index}
                            className={`text-text-primary  ${
                                (type === 'menus-admin' &&
                                    index === 0 &&
                                    'col-span-3 text-start') ||
                                (index === 0 && 'col-span-3 text-start') ||
                                (type === 'menus-admin' &&
                                    index === 1 &&
                                    'col-span-3 text-center') ||
                                (index === 1 && 'col-span-2 text-center') ||
                                (type === 'menus-admin' &&
                                    index === 2 &&
                                    'col-span-3 text-center') ||
                                (index === 2 && 'col-span-2 text-center') ||
                                (index === 3 && 'col-span-2  text-center') ||
                                (index === 4 && 'col-span-2') ||
                                'col-span-2'
                            }`}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>

                {/* list product item */}
                {isLoading ? (
                    <div className="flex justify-center py-10 ">
                        <RotatingLinesCommon />
                    </div>
                ) : (
                    <div className={`${arr?.length < 8 ? 'mb-40' : ''}`}>
                        {arr?.map((item, index) => (
                            <div
                                onClick={() => handleActiveItem(item._id)}
                                key={index}
                                className={`grid grid-cols-12 bg-bg-tertiary text-text-primary my-3 py-2
                                        rounded-lg items-center cursor-pointer hover:bg-color-active 
                                        ${
                                            arrActive.includes(item._id)
                                                ? 'bg-color-active'
                                                : ''
                                        }`}
                            >
                                <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    checked={arrActive.includes(item._id)}
                                    className="h-4 cursor-pointer"
                                    readOnly
                                />

                                <div className="col-span-3 hover:text-yellow-primary">
                                    <div className="flex items-center gap-2">
                                        {type === 'menus-admin' ? (
                                            ''
                                        ) : (
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
                                        )}
                                        <Link
                                            to={`${linkToDetailItem}/${item.slug}`}
                                        >
                                            <span className="">
                                                {CapitalizeFirstLetter(
                                                    item.name
                                                )}
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                {type === 'menus-admin' ? (
                                    <>
                                        <div className="col-span-3 text-center">
                                            {item.products.length}
                                        </div>
                                        <div className="col-span-3 text-center">
                                            {formatDate(item.created_at)}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="col-span-2 text-center">
                                            {FormatVND(item.selling)}
                                        </div>
                                        <div className="col-span-2 text-center">
                                            {CapitalizeFirstLetter(
                                                item.unit?.name
                                            )}
                                        </div>
                                        <div className="col-span-2 text-center">
                                            {item.quantity}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* pagination */}
            <div className="mt-10">
                <PaginationCommon
                    totalProducts={totalProducts}
                    getPageFunc={getPageFunc}
                    pageSize={pageSize}
                    setIsCheckedAll={setIsCheckedAll}
                    setArrActive={setArrActive}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    dataUpload={dataUpload}
                />
            </div>
        </div>
    );
}

export default BlockListItemCommon;
