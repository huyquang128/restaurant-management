import SearchCommon from '@/components/common/SearchCommon';
import add_white from '@/assets/icon/add_white.svg';
import Button from '@/components/common/Button/Button';
import import_white from '@/assets/icon/import_white.svg';
import export_white from '@/assets/icon/export_white.svg';

const category = [
    { name: 'Mặt hàng' },
    { name: 'Danh mục' },
    { name: 'Giá thành' },
    { name: 'Đơn vị tính' },
    { name: 'Ghi chú' },
];

const listItems = [
    {
        name: 'rau quả',
        category: 'Đồ ăn',
        price: '15000',
        capital_price: '7000',
        img: '',
    },
];

function ProductsAdmin() {
    return (
        <div className="font-cabin">
            <div className="text-xl font-medium">MẶT HÀNG</div>
            <div className="flex justify-between">
                <Button icon={add_white} title="Thêm mặt hàng" bg="black" />
                <div className="flex gap-2">
                    <Button icon={import_white} title="Import" bg="green-700" />
                    <Button icon={export_white} title="Export" bg="green-700" />
                </div>
            </div>

            <div className="">
                <div>Hiển thị</div>
                <SearchCommon />
            </div>

            {/* category */}
            <div></div>

            {/* list items */}
            <div></div>
        </div>
    );
}

export default ProductsAdmin;
