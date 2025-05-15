const { default: mongoose } = require('mongoose');
const Table = require('../Models/tableModel');
const Area = require('../Models/areaModel');
const Order = require('../Models/orderModel');

const addTable = async (req, res) => {
    const { name, areaId, capacity } = req.body;

    try {
        const newTable = new Table({
            name,
            area: areaId,
            capacity,
        });

        await newTable.save();

        await Area.findByIdAndUpdate(
            { _id: areaId },
            { $push: { tables: newTable._id } }
        );

        return res.status(201).json({
            success: true,
            message: 'Table has been added successfully',
            data: newTable,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding the table',
        });
    }
};

const updateStatusTable = async (req, res) => {
    const { tableId } = req.params;
    const { status, orderId } = req.body;
    try {
        // tìm đơn hàng để lấy bàn cũ
        const orderFind = await Order.findById({ _id: orderId });
        const tableOldId = orderFind?.tableSeleted;

        //nếu có bàn cũ thì gỡ orderId khỏi danh sách đơn hàng của bàn cũ
        if (tableOldId && tableOldId !== 'empty') {
            await Table.findByIdAndUpdate(tableOldId, {
                $pull: { orders: orderId },
                status: 'empty',
            });
        }

        //  Xử lý cập nhật bàn mới
        const isBookingOrInUse = status === 'booking' || status === 'in_use';

        const updateTable = {
            status,
            ...(isBookingOrInUse ? { $push: { orders: orderId } } : {}),
        };

        await Table.findByIdAndUpdate(tableId, updateTable, { new: true });

        //  Cập nhật lại thông tin đơn hàng
        await Order.findByIdAndUpdate(orderId, {
            tableSeleted: isBookingOrInUse ? tableId : 'empty',
        });

        return res.json({
            success: true,
            message: 'Table status has been updated successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the table status',
        });
    }
};

const updateStatusTableWhenInUse = async (req, res) => {
    const { tableId } = req.params;
    try {
        const updateTable = await Table.findByIdAndUpdate(
            { _id: tableId },
            {
                status: 'in_use',
            }
        );
        return res.json({
            success: true,
            message: `Đã cập nhật: ${updateTable.name} đang sử dụng`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the table status',
        });
    }
};

const deleteSetTable = async (req, res) => {
    const { tableId } = req.params;
    const { orderId } = req.body;
    try {
        await Table.findByIdAndUpdate(
            { _id: tableId },
            { status: 'empty', $pull: { orders: orderId } }
        );
        await Order.findByIdAndUpdate({ _id: orderId }, { tableSeleted: null });

        return res.json({
            success: true,
            message: 'Đã hủy đặt bàn.',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the table',
        });
    }
};

module.exports = {
    addTable,
    updateStatusTable,
    updateStatusTableWhenInUse,
    deleteSetTable,
};
