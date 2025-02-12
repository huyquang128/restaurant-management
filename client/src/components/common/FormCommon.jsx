export const productForm = [
    {
        id: 'nameProduct',
        type: 'text',
        label: 'Tên sản phẩm',
        type_component: 'input',
    },
    {
        id: 'typeProduct',
        type: 'add',
        label: 'Loại mặt hàng',
        type_component: 'select',
        list_opt: [
            { name: 'đồ uống', type: 'drink' },
            { name: 'đồ ăn', type: 'food' },
        ],
    },
    {
        id: 'unit',
        type: 'add',
        label: 'Đơn vị tính',
        type_component: 'select',
        list_opt: [
            { name: 'đĩa', type: 'plate' },
            { name: 'lon', type: 'can' },
        ],
    },
    {
        id: 'quantity',
        type: 'text',
        label: 'Số lượng',
        type_component: 'input',
    },
    {
        id: 'note',
        type: 'text',
        label: 'Ghi chú',
        type_component: 'input',
    },
    {
        id: 'promotion',
        type: 'text',
        label: 'Giá khuyến mãi',
        type_component: 'input',
    },
    {
        id: 'selling',
        type: 'text',
        label: 'Giá bán',
        type_component: 'input',
    },
    {
        id: 'cost',
        type: 'text',
        label: 'Giá vốn',
        type_component: 'input',
    },
];
