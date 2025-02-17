import { useSelector } from 'react-redux';
import { useState } from 'react';

import BlockListUserCommon from '@/components/admin/BlockListItemCommon';
import { searchProductName } from '@/redux/productSlice';
import { useSearchParams } from 'react-router';

function ResultSearchProducts() {
    const productStore = useSelector((state) => state.product);
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="font-cabin">
            <div className="text-center text-text-primary mb-4">
                <div className="text-3xl font-semibold mb-4">Tìm kiếm</div>
                <div>
                    Có
                    <span className="px-2 font-medium text-yellow-primary">
                        {productStore.productsSearch?.data.length} sản phẩm
                    </span>{' '}
                    cho tìm kiếm
                </div>
            </div>

            <BlockListUserCommon
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                arr={productStore.productsSearch?.data}
                isLoading={productStore.isLoadingSearch}
                totalProducts={productStore.productsSearch?.totalProducts}
                pageSize={productStore.productsSearch?.pageSize}
                getPageFunc={searchProductName}
                dataUpload={{ page: currentPage, q }}
            />
        </div>
    );
}

export default ResultSearchProducts;
