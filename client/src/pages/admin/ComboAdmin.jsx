import add_white from '@/assets/icon/add_white.svg';
import Button from '@/components/common/Button/Button';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import BlockListItemCommon from '@/components/admin/BlockListItemCommon';

import {
    deleteCombo,
    getAllComboDishes,
    getComboPage,
} from '@/redux/comboSlice';

const categories = [{ name: 'name' }, { name: 'Số món' }, { name: 'Ngày tạo' }];

function ComboAdmin() {
    const comboStore = useSelector((state) => state.combo);

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="font-cabin ">
            <div className="flex justify-between mb-5 flex-wrap">
                <div className="text-xl font-medium mb-5 text-text-primary">
                    Danh sách Combo
                </div>

                <div className="items-center">
                    <Link to="/admin/combo/add-combo">
                        <Button
                            icon={add_white}
                            title="Thêm Combo"
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
                arr={comboStore.combo?.data}
                arrCategory={categories}
                isLoading={comboStore.isLoading}
                totalProducts={comboStore.comboStore?.totalCombo}
                pageSize={comboStore.comboStore?.pageSize}
                getPageFunc={getComboPage}
                dataUpload={currentPage}
                intro="Quản lý các combo các món ăn, điều chỉnh combo phù hợp cho nhà hàng"
                type="menus-admin"
                linkToDetailItem="/admin/combo"
                title="Menu"
                funcCallApiDelete={deleteCombo}
                funcCallApiGet={getAllComboDishes}
            />
        </div>
    );
}

export default ComboAdmin;
