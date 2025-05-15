/* eslint-disable react/prop-types */
import sort from '@/assets/icon/sort.svg';
import error from '@/assets/icon/error.svg';
import tea from '@/assets/icon/tea.svg';
import reload_yellow from '@/assets/icon/reload_yellow.svg';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSetTable, setStatusTable } from '@/redux/tableSlice';
import ToastMsg from '../common/ToastMsg';
import { getAllOrder } from '@/redux/orderSlice';

const arrActSetTable = [
    {
        name: 'Xếp bàn',
        icon: sort,
        link: '/admin/set-table/booking-schedule/select-table',
    },
    {
        name: 'Chọn món',
        icon: tea,
        link: '/admin/set-table/booking-schedule/select-product',
    },
    { name: 'Hủy đặt bàn', icon: error },
];

const arrActOrder = [
    {
        name: 'chuyển bàn',
        icon: reload_yellow,
        link: '/admin/set-table/booking-schedule/select-table',
    },
    {
        name: 'Thêm món',
        icon: tea,
        link: '/admin/set-table/booking-schedule/select-product',
    },
    { name: 'Hủy đơn', icon: error },
];

function MoreSetTableTooltip({ ...props }) {
    const {
        orderAct,
        isOpenModalConfirmRemoveOrder,
        setIsOpenModalConfirmRemoveOrder,
        type,
    } = props;

    const dispatch = useDispatch();

    const orderStore = useSelector((state) => state.order);
    const tableStore = useSelector((state) => state.table);

    const handleSeletedCurdTable = (index, item) => {
        if (!orderAct)
            item.name === 'Hủy đặt bàn' &&
                dispatch(
                    deleteSetTable({
                        tableId: tableStore.tableIdSelected,
                        orderId: orderStore.orderIdSeleted,
                    })
                ).then((data) => {
                    if (data.payload.success) {
                        ToastMsg({ msg: `${data.payload.message}` });
                        dispatch(getAllOrder());
                    }
                });

        if (type === 'order_current') {
            dispatch(setStatusTable('in_use'));
        }

        if (type === 'booking_table') {
            dispatch(setStatusTable('booking'));
        }

        if (orderAct && index === 2) {
            setIsOpenModalConfirmRemoveOrder(true);
        }
    };

    const renderArrAct = (arr) => {
        return arr.map((item, index) => (
            <div key={index}>
                <Link
                    to={
                        (index === 0 &&
                            `${item.link}/${orderStore.orderIdSeleted}`) ||
                        (index === 1 &&
                            `${item.link}/${orderStore.orderIdSeleted}`)
                    }
                >
                    <div
                        onClick={() => handleSeletedCurdTable(index, item)}
                        className="flex items-center gap-2 py-2 px-2 text-sm hover:bg-color-active
                                cursor-pointer rounded-lg"
                    >
                        <img
                            src={item.icon}
                            alt=""
                            className="h-5 translate-y-[1px]"
                        />
                        <span className={`${index === 2 && 'text-red-500'}`}>
                            {item.name}
                        </span>
                    </div>
                </Link>
            </div>
        ));
    };

    return <div>{renderArrAct(orderAct ? arrActOrder : arrActSetTable)}</div>;
}

export default MoreSetTableTooltip;
