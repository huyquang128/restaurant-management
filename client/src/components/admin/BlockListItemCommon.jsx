/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import CapitalizeFirstLetter from '@/components/common/CapitalizeFirstLetter';
import PaginationCommon from '@/components/common/Pagination/PaginationCommon.jsx';
import BlockRemoveCommon from '@/components/common/BlockRemoveCommon';
import avatar_default_dishes from '@/assets/icon/avatar_default_dishes.svg';
import RotatingLinesCommon from '@/components/common/spinnerAnimation/RotatingLinesCommon';
import useCheckboxDelete from '../hooks/useCheckboxDelete.jsx.jsx';
import formatDate from '../common/formatDate.jsx';
import email from '@/assets/icon/email.svg';
import calendar_2 from '@/assets/icon/calendar_2.svg';
import phone from '@/assets/icon/phone.svg';
import { useDispatch, useSelector } from 'react-redux';
import FormatVND from '../common/FormatVND.jsx';

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
    const dispatch = useDispatch();

    const authStore = useSelector((state) => state.auth);

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
                <div
                    className={`grid grid-cols-12 items-center 
                            ${
                                (type === 'menus-admin' &&
                                    'bg-yellow-primary') ||
                                (type === 'customer-admin' && 'bg-blue-primary')
                            } py-3 rounded-lg`}
                >
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
                            className={`text-white ${
                                (type === 'menus-admin' &&
                                    index === 0 &&
                                    'col-span-3 text-start') ||
                                (type === 'customer-admin' &&
                                    index === 0 &&
                                    'col-span-2 text-start') ||
                                (index === 0 && 'col-span-3 text-start') ||
                                (type === 'menus-admin' &&
                                    index === 1 &&
                                    'col-span-4 text-center') ||
                                (type === 'customer-admin' &&
                                    index === 1 &&
                                    'col-span-3 ') ||
                                (index === 1 && 'col-span-3 text-center') ||
                                (type === 'menus-admin' &&
                                    index === 2 &&
                                    'col-span-4 text-center') ||
                                (type === 'customer-admin' &&
                                    index === 2 &&
                                    'col-span-2') ||
                                (index === 2 && 'col-span-3 text-center') ||
                                (type === 'customer-admin' &&
                                    index === 3 &&
                                    'col-span-2 ') ||
                                (index === 3 && 'col-span-2  text-center') ||
                                (type === 'customer-admin' &&
                                    index === 4 &&
                                    'col-span-2 text-center') ||
                                (index === 4 && 'col-span-2 text-center') ||
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
                    <div
                        className={`${
                            arr?.length < 8 ? 'mb-40' : ''
                        } bg-bg-secondary rounded-lg`}
                    >
                        {arr?.map((item, index) => (
                            <div
                                onClick={() => handleActiveItem(item._id)}
                                key={index}
                                className={`grid grid-cols-12  text-text-primary my-3 py-5
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

                                <div
                                    className={`${
                                        type === 'customer-admin'
                                            ? 'col-span-2'
                                            : 'col-span-3'
                                    } hover:text-yellow-primary`}
                                >
                                    <div className="flex items-center gap-2">
                                        {type === 'menus-admin' ||
                                        type === 'customer-admin' ? (
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
                                            to={`${linkToDetailItem}/${
                                                type === 'customer-admin'
                                                    ? item.username
                                                    : item.slug
                                            }`}
                                        >
                                            <span className="">
                                                {CapitalizeFirstLetter(
                                                    type === 'customer-admin'
                                                        ? item.username
                                                        : item.name
                                                )}
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                {(type === 'menus-admin' && (
                                    <>
                                        {item.products ? (
                                            <div className="col-span-4 text-center">
                                                {item.products.length}{' '}
                                            </div>
                                        ) : (
                                            <div>
                                                <img
                                                    src={item.urlImg.url}
                                                    alt=""
                                                />
                                            </div>
                                        )}

                                        <div className="col-span-4 text-center">
                                            {item.created_at
                                                ? formatDate(item.created_at)
                                                : item.order}
                                        </div>
                                    </>
                                )) ||
                                    (type === 'customer-admin' && (
                                        <>
                                            <div
                                                className="col-span-3 text-center flex items-center 
                                                            justify-start gap-2"
                                            >
                                                <img src={email} alt="" />
                                                <span> {item.email}</span>
                                            </div>
                                            <div className="col-span-2">
                                                {item.name || '---'}
                                            </div>
                                            <div
                                                className="col-span-2 text-center flex items-center 
                                                            justify-start gap-2"
                                            >
                                                <div className="">
                                                    <img
                                                        src={calendar_2}
                                                        alt=""
                                                    />
                                                </div>
                                                <span> {'dd/mm/yy'}</span>
                                            </div>{' '}
                                            <div
                                                className="col-span-2 text-center flex items-center 
                                                            justify-center "
                                            >
                                                <img
                                                    src={phone}
                                                    alt=""
                                                    className="h-5"
                                                />
                                                <span className="w-24">
                                                    {item.phone || '---------'}
                                                </span>
                                            </div>
                                        </>
                                    )) || (
                                        <>
                                            <div className="col-span-3 text-center">
                                                {FormatVND(item.selling)}
                                            </div>
                                            <div className="col-span-3 text-center">
                                                {CapitalizeFirstLetter(
                                                    item.unit?.name
                                                )}
                                            </div>
                                        </>
                                    )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* pagination */}
            <div className="mt-10 flex justify-end">
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
