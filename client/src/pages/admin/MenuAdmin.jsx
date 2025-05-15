import add_white from '@/assets/icon/add_white.svg';
import Button from '@/components/common/Button/Button';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import BlockListItemCommon from '@/components/admin/BlockListItemCommon';
import {
    deleteCategoryDishes,
    getAllCategoriesDishes,
    getAllCategoriesDishesPages,
} from '@/redux/categoryDishesSlice';

const categories = [{ name: 'name' }, { name: 'Số món' }, { name: 'Ngày tạo' }];

function MenuAdmin() {
    const categoryDishesStore = useSelector((state) => state.categoryDishes);

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="font-cabin ">
            <div className="flex justify-between mb-5 flex-wrap">
                <div className="text-xl font-medium mb-5 text-text-primary">
                    Danh sách thực đơn
                </div>

                <div className="items-center">
                    <Link to="/admin/menus/add-menus">
                        <Button
                            icon={add_white}
                            title="Thêm thực đơn"
                            bg="add"
                            text_color="white"
                            bg_border="black"
                        />
                    </Link>
                </div>
            </div>

            <BlockListItemCommon
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                arr={categoryDishesStore.category_dishes?.data}
                arrCategory={categories}
                isLoading={categoryDishesStore.isLoading}
                totalProducts={
                    categoryDishesStore.categoryDishesStore?.totalProducts
                }
                pageSize={categoryDishesStore.categoryDishesStore?.pageSize}
                getPageFunc={getAllCategoriesDishesPages}
                dataUpload={currentPage}
                intro="Quản lý các thực đơn, thêm món ăn cho các thực đơn tại nhà hàng"
                type="menus-admin"
                linkToDetailItem="/admin/menus"
                title="Menu"
                funcCallApiDelete={deleteCategoryDishes}
                funcCallApiGet={getAllCategoriesDishes}
            />
        </div>
    );
}

export default MenuAdmin;
