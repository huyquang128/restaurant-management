const Order = require('../Models/orderModel');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');
const Table = require('../Models/tableModel');
const Notification = require('../Models/notificationModel');
const moment = require('moment');

const { getIO } = require('../sockets/socket');
const { default: mongoose } = require('mongoose');

const addOrder = async (req, res) => {
    const {
        customer,
        nameCustomer,
        phoneCustomer,
        dishes,
        addressRestaurant,
        quantityCustomer,
        diningTime,
        totalPrice,
        paymentMethod,
        paymentStatus,
        note,
        dateSetTable,
    } = req.body;

    try {
        const convertObjId = JSON.parse(dishes);
        const newOrder = new Order({
            customer,
            nameCustomer,
            phoneCustomer,
            dishes: convertObjId,
            addressRestaurant,
            quantityCustomer,
            diningTime,
            totalPrice,
            paymentMethod,
            paymentStatus,
            note,
            dateSetTable,
        });

        await newOrder.save();

        const createNotification = new Notification({
            userIdReceiver: '67f9325fc89ae9b38e5c8d02',
            customerIdSend: customer,
            nameCustomer,
            type: 'order',
            relatedId: newOrder._id,
        });

        await createNotification.save();

        // 📣 Gửi thông báo đến admin (sau khi đơn đã được lưu thành công)
        getIO().emit('new_order', newOrder);

        for (const item of convertObjId) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { quantity: -item.quantity, sold: item.quantity } }, // trừ số lượng
                { new: true }
            );
        }

        await User.findByIdAndUpdate(
            customer,
            {
                $set: { phone: phoneCustomer, name: nameCustomer },
                $push: { order: newOrder._id },
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Order added successfully',
            data: newOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding order',
        });
    }
};

const getOrderByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.findOne({ customer: userId })
            .populate('customer', 'username')
            .populate('dishes');
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            data: orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting order',
        });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer', 'username')
            .populate({ path: 'tableSeleted', populate: { path: 'area' } })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            data: orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting all orders',
        });
    }
};

const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId)
            .populate('customer')
            .populate({ path: 'dishes', populate: 'product' })
            .populate({ path: 'tableSeleted', populate: 'area' });

        return res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while getting order by id',
        });
    }
};

const addMethodPayment = async (req, res) => {
    const { orderId } = req.params;
    const { paymentMethod, paymentStatus } = req.body;
    try {
        await Order.findByIdAndUpdate(
            { _id: orderId },
            { paymentMethod, paymentStatus },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: 'Thêm phương thức thanh toán thành công',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating status method payment',
        });
    }
};

const updateQuantityProductOrder = async (req, res) => {
    const { orderId } = req.params;
    const { productId, quantity } = req.body;
    try {
        let updateProductOrder;

        updateProductOrder = await Order.findByIdAndUpdate(
            { _id: orderId },
            { $set: { 'dishes.$[elem].quantity': quantity } },
            { arrayFilters: [{ 'elem.product': productId }], new: true }
        );

        updateProductOrder.totalPrice = updateProductOrder.dishes.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
        );
        await updateProductOrder.save();

        return res.json({
            success: true,
            message: 'Cập nhật số lượng món ăn thành công',
            data: updateProductOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:
                'An error occurred while updating quantity of product in order',
        });
    }
};

const deleteProductOrder = async (req, res) => {
    const { orderId } = req.params;
    const { productId } = req.body;
    try {
        let updateOrder;
        updateOrder = await Order.findOneAndUpdate(
            { _id: orderId },
            { $pull: { dishes: { product: productId } } },
            { new: true }
        );
        updateOrder.totalPrice = updateOrder.dishes.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
        );

        await updateOrder.save();

        return res.json({
            success: true,
            message: 'Xóa món ăn thành công',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while delete product in order',
        });
    }
};

const addProductToOrder = async (req, res) => {
    const { orderId } = req.params;
    const { productId, price } = req.body;
    try {
        const order = await Order.findOne({ _id: orderId });

        const existingDish = order.dishes.find(
            (d) => d.product.toString() === productId
        );

        if (existingDish) {
            //  Sản phẩm đã có → tăng quantity lên 1
            await Order.findOneAndUpdate(
                {
                    _id: orderId,
                    'dishes.product': productId,
                },
                {
                    $inc: { 'dishes.$[elem].quantity': 1 },
                },
                {
                    arrayFilters: [{ 'elem.product': productId }],
                    new: true,
                }
            );
            return res
                .status(200)
                .json({ success: true, message: 'Đã tăng số lượng sản phẩm.' });
        } else {
            //  Sản phẩm chưa có → thêm mới vào mảng
            await Order.findOneAndUpdate(
                { _id: orderId },
                {
                    $push: {
                        dishes: {
                            product: productId,
                            price,
                            quantity: 1,
                        },
                    },
                },
                { new: true }
            );
            return res.status(200).json({
                success: true,
                message: 'Đã thêm món ăn mới vào đơn hàng.',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while add product in order',
        });
    }
};

const updateStatusPayment = async (req, res) => {
    const { orderId } = req.params;
    const { statusPayment, type, cancelReason, mealDuration } = req.body;

    try {
        const findOrder = await Order.findOneAndUpdate(
            { _id: orderId },
            {
                $set: {
                    paymentStatus: statusPayment,
                    cancelReason,
                    mealDuration,
                },
            },
            { new: true }
        );

        if (type === 'delete_table_selected') {
            await Table.updateOne(
                { _id: findOrder.tableSeleted },
                {
                    $pull: { orders: orderId },
                    $set: { status: 'empty' },
                }
            );
        }
        return res.json({
            success: true,
            message: 'Đã cập nhật trạng thái đơn hàng',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while add product in order',
        });
    }
};

const getAllOrderPage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    try {
        const allOrders = await Order.find()
            .populate('customer')
            .populate({ path: 'dishes', populate: 'product' })
            .populate({ path: 'tableSeleted', populate: { path: 'area' } })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ _id: -1 });

        //sum product
        const totalOrders = await Order.countDocuments();

        //sum page
        const totalPages = Math.ceil(totalOrders / pageSize);

        return res.json({
            success: true,
            data: allOrders,
            totalOrders,
            totalPages,
            currentPage: page,
            pageSize,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An occurried while get all order page',
        });
    }
};

const getAllOrderPageStatusPending = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    try {
        const allOrders = await Order.find({ paymentStatus: 'pending' })
            .populate('customer')
            .populate({ path: 'dishes', populate: 'product' })
            .populate({ path: 'tableSeleted', populate: { path: 'area' } })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ _id: -1 });

        //sum product
        const totalOrders = await Order.countDocuments({
            paymentStatus: 'pending',
        });

        //sum page
        const totalPages = Math.ceil(totalOrders / pageSize);

        return res.json({
            success: true,
            data: allOrders,
            totalOrders,
            totalPages,
            currentPage: page,
            pageSize,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An occurried while get all order page',
        });
    }
};

const getAllOrderPageStatusPaid = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    try {
        const allOrders = await Order.find({ paymentStatus: 'paid' })
            .populate('customer')
            .populate({ path: 'dishes', populate: 'product' })
            .populate({ path: 'tableSeleted', populate: { path: 'area' } })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ _id: -1 });

        //sum product
        const totalOrders = await Order.countDocuments({
            paymentStatus: 'paid',
        });

        //sum page
        const totalPages = Math.ceil(totalOrders / pageSize);

        return res.json({
            success: true,
            data: allOrders,
            totalOrders,
            totalPages,
            currentPage: page,
            pageSize,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An occurried while get all order page',
        });
    }
};

const getAllOrderPageStatusCanceled = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;
    try {
        const allOrders = await Order.find({ paymentStatus: 'canceled' })
            .populate('customer')
            .populate({ path: 'dishes', populate: 'product' })
            .populate({ path: 'tableSeleted', populate: { path: 'area' } })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ _id: -1 });

        //sum product
        const totalOrders = await Order.countDocuments({
            paymentStatus: 'canceled',
        });

        //sum page
        const totalPages = Math.ceil(totalOrders / pageSize);

        return res.json({
            success: true,
            data: allOrders,
            totalOrders,
            totalPages,
            currentPage: page,
            pageSize,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'An occurried while get all order page',
        });
    }
};

const updateDepositOrder = async (req, res) => {
    const { orderId } = req.params;
    const { deposit } = req.body;
    try {
        await Order.findByIdAndUpdate(
            orderId,
            {
                $set: { deposit },
            },
            { new: true }
        );

        return res
            .status(200)
            .json({ success: true, message: 'Đặt cọc thành công !!!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: true, message: 'error server' });
    }
};

const getRevenue = async (req, res) => {
    const { day, month, year, type } = req.query;

    try {
        let currentStart, currentEnd, previousStart, previousEnd;

        const y = Number(year);
        const m = Number(month);
        const d = Number(day);

        //lấy thời gian trươc , sau
        if (type === 'day') {
            currentStart = new Date(y, m - 1, d);
            currentEnd = new Date(y, m - 1, d + 1);
            previousStart = new Date(y, m - 1, d - 1);
            previousEnd = new Date(y, m - 1, d);
        } else if (type === 'month') {
            currentStart = new Date(y, m - 1, 1);
            currentEnd = new Date(y, m, 1);
            previousStart = new Date(y, m - 2, 1);
            previousEnd = new Date(y, m - 1, 1);
        } else if (type === 'year') {
            currentStart = new Date(y, 0, 1);
            currentEnd = new Date(y + 1, 0, 1);
            previousStart = new Date(y - 1, 0, 1);
            previousEnd = new Date(y, 0, 1);
        } else {
            return res
                .status(400)
                .json({ message: 'type phải là day, month hoặc year' });
        }

        // Hàm phụ dùng aggregate
        const getTotalRevenue = async (start, end) => {
            const result = await Order.aggregate([
                {
                    $match: {
                        updatedAt: { $gte: start, $lt: end },
                        paymentStatus: 'paid',
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$totalPrice' },
                    },
                },
            ]);
            return result[0]?.total || 0;
        };

        const getTotalOrders = async (start, end) => {
            const result = await Order.aggregate([
                {
                    $match: {
                        updatedAt: { $gte: start, $lt: end },
                    },
                },
                {
                    $count: 'orderCount', // đếm số lượng đơn hàng
                },
            ]);
            return result[0]?.orderCount || 0;
        };

        // Hàm tính số lượng khách hàng (mỗi khách hàng chỉ tính 1 lần)
        const getTotalCustomers = async (start, end) => {
            const result = await User.aggregate([
                {
                    $match: {
                        createdAt: { $gte: start, $lt: end },
                        role: new mongoose.Types.ObjectId(
                            '67f92ecde3ab28670d2d15b1'
                        ),
                    },
                },
                {
                    $count: 'customerCount', // đếm số khách hàng
                },
            ]);

            return result[0]?.customerCount || 0;
        };

        // Hàm tính số lượng món ăn
        const getTotalDishes = async (start, end) => {
            const result = await Product.aggregate([
                {
                    $match: {
                        createdAt: { $gte: start, $lt: end },
                    },
                },
                {
                    $count: 'dishesCount',
                },
            ]);
            return result[0]?.dishesCount || 0;
        };

        //  Tính doanh thu, số lượng đơn hàng, số lượng khách hàng, số lượng món ăn cho hiện tại và trước đó
        const currentRevenue = await getTotalRevenue(currentStart, currentEnd);
        const previousRevenue = await getTotalRevenue(
            previousStart,
            previousEnd
        );

        const currentOrders = await getTotalOrders(currentStart, currentEnd);
        const previousOrders = await getTotalOrders(previousStart, previousEnd);

        const currentCustomers = await getTotalCustomers(
            currentStart,
            currentEnd
        );
        const previousCustomers = await getTotalCustomers(
            previousStart,
            previousEnd
        );

        const currentDishes = await getTotalDishes(currentStart, currentEnd);
        const previousDishes = await getTotalDishes(previousStart, previousEnd);

        const diffRevenue = currentRevenue - previousRevenue;
        const diffOrders = currentOrders - previousOrders;
        const diffCustomers = currentCustomers - previousCustomers;
        const diffDishes = currentDishes - previousDishes;

        // tính %
        const percentChangeRevenue =
            (previousRevenue === 0 && 100) ||
            (previousRevenue &&
                ((diffRevenue / previousRevenue) * 100).toFixed(1)) ||
            'N/A';

        const percentChangeOrders =
            (previousOrders === 0 && 100) ||
            (previousOrders &&
                ((diffOrders / previousOrders) * 100).toFixed(1)) ||
            'N/A';

        const percentChangeCustomer =
            (previousCustomers === 0 && 100) ||
            (previousCustomers &&
                ((diffCustomers / previousCustomers) * 100).toFixed(1)) ||
            'N/A';

        const percentChangeDishes =
            (previousDishes === 0 && 100) ||
            (previousDishes &&
                ((diffDishes / previousDishes) * 100).toFixed(1)) ||
            'N/A';

        //kiểm tra tăng giảm
        const trendRevenue =
            currentRevenue > previousRevenue
                ? 'tăng'
                : currentRevenue < previousRevenue
                ? 'giảm'
                : 'không đổi';

        const trendOrders =
            currentOrders > previousOrders
                ? 'tăng'
                : currentOrders < previousOrders
                ? 'giảm'
                : 'không đổi';

        const trendCustomers =
            currentCustomers > previousCustomers
                ? 'tăng'
                : currentCustomers < previousCustomers
                ? 'giảm'
                : 'không đổi';

        const trendDishes =
            currentDishes > previousDishes
                ? 'tăng'
                : currentDishes < previousDishes
                ? 'giảm'
                : 'không đổi';

        res.status(200).json({
            success: true,
            data: {
                type,
                currentRevenue,
                previousRevenue,
                currentOrders,
                previousOrders,
                currentCustomers,
                previousCustomers,
                currentDishes,
                previousDishes,
                differenceRevenue: diffRevenue,
                differenceOrders: diffOrders,
                differenceCustomers: diffCustomers,
                differenceDishes: diffDishes,
                percentChangeRevenue:
                    percentChangeRevenue === 'N/A'
                        ? 'Không có dữ liệu'
                        : `${percentChangeRevenue}`,
                percentChangeOrders:
                    percentChangeOrders === 'N/A'
                        ? 'Không có dữ liệu'
                        : `${percentChangeOrders}`,
                percentChangeCustomer:
                    percentChangeCustomer === 'N/A'
                        ? 'Không có dữ liệu'
                        : `${percentChangeCustomer}`,
                percentChangeDishes:
                    percentChangeDishes === 'N/A'
                        ? 'Không có dữ liệu'
                        : `${percentChangeDishes}`,
                trendRevenue,
                trendOrders,
                trendCustomers,
                trendDishes,
            },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Error server' });
    }
};

// const getRevenue = async (req, res) => {
//     const { day, month, year, type } = req.query;

//     const y = Number(year);
//     const m = Number(month);
//     const d = Number(day);

//     if (
//         (type === 'day' && (!day || !month || !year)) ||
//         (type === 'month' && (!month || !year)) ||
//         (type === 'year' && !year)
//     ) {
//         return res.status(400).json({
//             success: false,
//             message: 'Thiếu tham số ngày / tháng / năm phù hợp với type',
//         });
//     }

//     try {
//         let currentStart, currentEnd, previousStart, previousEnd;

//         if (type === 'day') {
//             currentStart = new Date(y, m - 1, d);
//             currentEnd = new Date(currentStart);
//             currentEnd.setDate(currentEnd.getDate() + 1);

//             previousStart = new Date(currentStart);
//             previousStart.setDate(previousStart.getDate() - 1);
//             previousEnd = new Date(currentStart);
//         } else if (type === 'month') {
//             currentStart = new Date(y, m - 1, 1);
//             currentEnd = new Date(y, m, 1);

//             previousStart = new Date(y, m - 2, 1);
//             previousEnd = new Date(y, m - 1, 1);
//         } else if (type === 'year') {
//             currentStart = new Date(y, 0, 1);
//             currentEnd = new Date(y + 1, 0, 1);

//             previousStart = new Date(y - 1, 0, 1);
//             previousEnd = new Date(y, 0, 1);
//         } else {
//             return res.status(400).json({
//                 success: false,
//                 message: 'type phải là "day", "month" hoặc "year"',
//             });
//         }

//         const getTotalRevenue = async (start, end) => {
//             const result = await Order.aggregate([
//                 {
//                     $match: {
//                         updatedAt: { $gte: start, $lt: end },
//                         paymentStatus: 'paid',
//                     },
//                 },
//                 {
//                     $group: {
//                         _id: null,
//                         total: { $sum: '$totalPrice' },
//                     },
//                 },
//             ]);
//             return result[0]?.total || 0;
//         };

//         const getTotalOrders = async (start, end) => {
//             const result = await Order.aggregate([
//                 {
//                     $match: {
//                         updatedAt: { $gte: start, $lt: end },
//                     },
//                 },
//                 { $count: 'orderCount' },
//             ]);
//             return result[0]?.orderCount || 0;
//         };

//         const getTotalCustomers = async (start, end) => {
//             const result = await User.aggregate([
//                 {
//                     $match: {
//                         createdAt: { $gte: start, $lt: end },
//                         role: 'customer', // nếu là ObjectId thì dùng: new mongoose.Types.ObjectId(...)
//                     },
//                 },
//                 { $count: 'customerCount' },
//             ]);
//             return result[0]?.customerCount || 0;
//         };

//         const getTotalDishes = async (start, end) => {
//             const result = await Product.aggregate([
//                 {
//                     $match: {
//                         createdAt: { $gte: start, $lt: end },
//                     },
//                 },
//                 { $count: 'dishesCount' },
//             ]);
//             return result[0]?.dishesCount || 0;
//         };

//         const [currentRevenue, previousRevenue] = await Promise.all([
//             getTotalRevenue(currentStart, currentEnd),
//             getTotalRevenue(previousStart, previousEnd),
//         ]);

//         const [currentOrders, previousOrders] = await Promise.all([
//             getTotalOrders(currentStart, currentEnd),
//             getTotalOrders(previousStart, previousEnd),
//         ]);

//         const [currentCustomers, previousCustomers] = await Promise.all([
//             getTotalCustomers(currentStart, currentEnd),
//             getTotalCustomers(previousStart, previousEnd),
//         ]);

//         const [currentDishes, previousDishes] = await Promise.all([
//             getTotalDishes(currentStart, currentEnd),
//             getTotalDishes(previousStart, previousEnd),
//         ]);

//         const calculateChange = (current, previous) => {
//             const diff = current - previous;
//             const percent =
//                 previous === 0 ? 100 : ((diff / previous) * 100).toFixed(1);
//             const trend = diff > 0 ? 'tăng' : diff < 0 ? 'giảm' : 'không đổi';
//             return { current, previous, diff, percent, trend };
//         };

//         const revenue = calculateChange(currentRevenue, previousRevenue);
//         const orders = calculateChange(currentOrders, previousOrders);
//         const customers = calculateChange(currentCustomers, previousCustomers);
//         const dishes = calculateChange(currentDishes, previousDishes);

//         return res.status(200).json({
//             success: true,
//             data: {
//                 type,
//                 revenue,
//                 orders,
//                 customers,
//                 dishes,
//             },
//         });
//     } catch (error) {
//         console.error('Lỗi getRevenue:', error);
//         return res.status(500).json({ success: false, message: 'Lỗi server' });
//     }
// };

function fillMissingData(type, rawData, { day, month, year }) {
    const filledData = [];

    // Chuyển rawData thành một object dạng key-value cho tra cứu nhanh
    const dataMap = rawData.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
    }, {});

    if (type === 'day') {
        for (let hour = 0; hour < 24; hour++) {
            // Kiểm tra nếu có dữ liệu cho giờ này trong rawData
            const existingData = dataMap[hour];

            filledData.push({
                _id: hour,
                name: `${hour + 7 >= 24 ? hour + 7 - 24 : hour + 7}h`,
                totalRevenue: existingData ? existingData.totalRevenue : 0,
                totalProfit: existingData ? existingData.totalProfit : 0,
            });
        }
    } else if (type === 'month') {
        const startOfMonth = moment(`${year}-${month}-01`);
        const endOfMonth = startOfMonth.clone().endOf('month');
        const totalDaysInMonth = endOfMonth.date();
        const startWeek = startOfMonth.isoWeek();
        const totalWeeks = Math.ceil(totalDaysInMonth / 7);

        for (let week = startWeek; week < startWeek + totalWeeks; week++) {
            const weekId = `${week}-${year}`;
            const existingData = dataMap[weekId];

            filledData.push({
                _id: weekId,
                name: `Tuần ${week - startWeek + 1}`,
                totalRevenue: existingData ? existingData.totalRevenue : 0,
                totalProfit: existingData ? existingData.totalProfit : 0,
            });
        }
    } else if (type === 'year') {
        for (let m = 1; m <= 12; m++) {
            const monthStr = `${year}-${m.toString().padStart(2, '0')}`;
            const existingData = dataMap[monthStr];

            filledData.push({
                _id: monthStr,
                name: `Tháng ${m}`,
                totalRevenue: existingData ? existingData.totalRevenue : 0,
                totalProfit: existingData ? existingData.totalProfit : 0,
            });
        }
    }

    return filledData;
}

async function getRevenueProfitReport(req, res) {
    const { day, month, year, type } = req.query;
    const pipeline = [];

    try {
        if (type === 'day') {
            const startOfDay = moment({ year, month: month - 1, day })
                .startOf('day')
                .toDate();
            const endOfDay = moment({ year, month: month - 1, day })
                .endOf('day')
                .toDate();

            pipeline.push({
                $match: {
                    updatedAt: { $gte: startOfDay, $lte: endOfDay },
                    paymentStatus: 'paid',
                },
            });

            pipeline.push({ $unwind: '$dishes' });

            pipeline.push({
                $lookup: {
                    from: 'products',
                    localField: 'dishes.product',
                    foreignField: '_id',
                    as: 'productInfo',
                },
            });

            pipeline.push({ $unwind: '$productInfo' });

            pipeline.push({
                $project: {
                    hour: { $hour: '$updatedAt' },
                    salePrice: '$dishes.price',
                    costPrice: '$productInfo.cost',
                    quantity: '$dishes.quantity',
                },
            });

            pipeline.push({
                $project: {
                    hour: 1,

                    revenue: { $multiply: ['$salePrice', '$quantity'] },
                    profit: {
                        $multiply: [
                            { $subtract: ['$salePrice', '$costPrice'] },
                            '$quantity',
                        ],
                    },
                },
            });

            pipeline.push({
                $group: {
                    _id: '$hour',
                    totalRevenue: { $sum: '$revenue' },
                    totalProfit: { $sum: '$profit' },
                },
            });
        } else if (type === 'month') {
            const startOfMonth = moment({ year, month: month - 1 })
                .startOf('month')
                .toDate();
            const endOfMonth = moment({ year, month: month - 1 })
                .endOf('month')
                .toDate();

            pipeline.push({
                $match: {
                    updatedAt: { $gte: startOfMonth, $lte: endOfMonth },
                    paymentStatus: 'paid',
                },
            });

            pipeline.push({ $unwind: '$dishes' });

            pipeline.push({
                $lookup: {
                    from: 'products',
                    localField: 'dishes.product',
                    foreignField: '_id',
                    as: 'productInfo',
                },
            });

            pipeline.push({ $unwind: '$productInfo' });

            pipeline.push({
                $project: {
                    week: { $isoWeek: '$updatedAt' },
                    year: { $year: '$updatedAt' },
                    salePrice: '$dishes.price',
                    costPrice: '$productInfo.cost',
                    quantity: '$dishes.quantity',
                },
            });

            pipeline.push({
                $project: {
                    weekId: {
                        $concat: [
                            { $toString: '$week' },
                            '-',
                            { $toString: '$year' },
                        ],
                    },
                    revenue: { $multiply: ['$salePrice', '$quantity'] },
                    profit: {
                        $multiply: [
                            { $subtract: ['$salePrice', '$costPrice'] },
                            '$quantity',
                        ],
                    },
                },
            });

            pipeline.push({
                $group: {
                    _id: '$weekId',
                    totalRevenue: { $sum: '$revenue' },
                    totalProfit: { $sum: '$profit' },
                },
            });
        } else if (type === 'year') {
            const startOfYear = moment({ year }).startOf('year').toDate();
            const endOfYear = moment({ year }).endOf('year').toDate();

            pipeline.push({
                $match: {
                    updatedAt: { $gte: startOfYear, $lte: endOfYear },
                    paymentStatus: 'paid',
                },
            });

            pipeline.push({ $unwind: '$dishes' });

            pipeline.push({
                $lookup: {
                    from: 'products',
                    localField: 'dishes.product',
                    foreignField: '_id',
                    as: 'productInfo',
                },
            });

            pipeline.push({ $unwind: '$productInfo' });

            pipeline.push({
                $project: {
                    month: { $month: '$updatedAt' },
                    year: { $year: '$updatedAt' },
                    salePrice: '$dishes.price',
                    costPrice: '$productInfo.cost',
                    quantity: '$dishes.quantity',
                },
            });

            pipeline.push({
                $project: {
                    monthId: {
                        $concat: [
                            { $toString: '$year' },
                            '-',
                            {
                                $cond: [
                                    { $lt: ['$month', 10] },
                                    { $concat: ['0', { $toString: '$month' }] },
                                    { $toString: '$month' },
                                ],
                            },
                        ],
                    },
                    revenue: { $multiply: ['$salePrice', '$quantity'] },
                    profit: {
                        $multiply: [
                            { $subtract: ['$salePrice', '$costPrice'] },
                            '$quantity',
                        ],
                    },
                },
            });

            pipeline.push({
                $group: {
                    _id: '$monthId',
                    totalRevenue: { $sum: '$revenue' },
                    totalProfit: { $sum: '$profit' },
                },
            });
        }

        pipeline.push({ $sort: { _id: 1 } });

        const rawData = await Order.aggregate(pipeline);

        const filledData = fillMissingData(type, rawData, { day, month, year });

        const totalRevenue = filledData.reduce(
            (acc, item) => acc + item.totalRevenue,
            0
        );
        const totalProfit = filledData.reduce(
            (acc, item) => acc + item.totalProfit,
            0
        );

        return res.status(200).json({
            success: true,
            data: { totalRevenue, totalProfit, filledData },
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: 'Server error' });
    }
}

// function fillMissingData(type, rawData, { day, month, year }) {
//     const filledData = [];
//     const dataMap = rawData.reduce((acc, item) => {
//         acc[item._id] = item;
//         return acc;
//     }, {});

//     if (type === 'day') {
//         for (let hour = 0; hour < 24; hour++) {
//             const existingData = dataMap[hour] || {};
//             const adjustedHour = (hour + 7) % 24;

//             filledData.push({
//                 _id: hour,
//                 name: `${adjustedHour}h`,
//                 totalRevenue: existingData.totalRevenue || 0,
//                 totalProfit: existingData.totalProfit || 0,
//             });
//         }
//     } else if (type === 'month') {
//         const startOfMonth = moment(`${year}-${month}-01`);
//         const totalDaysInMonth = startOfMonth.daysInMonth();

//         const startWeek = startOfMonth.isoWeek();
//         const totalWeeks = Math.ceil(totalDaysInMonth / 7);

//         for (let i = 0; i < totalWeeks; i++) {
//             const week = startWeek + i;
//             const weekId = `${week}-${year}`;
//             const existingData = dataMap[weekId] || {};
//             console.log('🚀 ~ fillMissingData ~ weekId:', weekId);

//             filledData.push({
//                 _id: weekId,
//                 name: `Tuần ${i + 1}`,
//                 totalRevenue: existingData.totalRevenue || 0,
//                 totalProfit: existingData.totalProfit || 0,
//             });
//         }
//     } else if (type === 'year') {
//         for (let m = 1; m <= 12; m++) {
//             const monthStr = `${year}-${m.toString().padStart(2, '0')}`;
//             const existingData = dataMap[monthStr] || {};

//             filledData.push({
//                 _id: monthStr,
//                 name: `Tháng ${m}`,
//                 totalRevenue: existingData.totalRevenue || 0,
//                 totalProfit: existingData.totalProfit || 0,
//             });
//         }
//     }

//     return filledData;
// }

// async function getRevenueProfitReport(req, res) {
//     const { day, month, year, type } = req.query;
//     const pipeline = [];

//     try {
//         // Các mốc thời gian theo type
//         if (type === 'day') {
//             const start = moment({ year, month: month - 1, day })
//                 .startOf('day')
//                 .toDate();
//             console.log('🚀 ~ getRevenueProfitReport ~ start:', start);

//             const end = moment({ year, month: month - 1, day })
//                 .endOf('day')
//                 .toDate();
//             console.log('🚀 ~ getRevenueProfitReport ~ end:', end);

//             pipeline.push({
//                 $match: {
//                     updatedAt: { $gte: start, $lte: end },
//                     paymentStatus: 'paid',
//                 },
//             });
//             pipeline.push({ $unwind: '$dishes' });

//             pipeline.push({
//                 $lookup: {
//                     from: 'products',
//                     localField: 'dishes.product',
//                     foreignField: '_id',
//                     as: 'productInfo',
//                 },
//             });
//             pipeline.push({ $unwind: '$productInfo' });

//             pipeline.push({
//                 $project: {
//                     hour: { $hour: '$updatedAt' },
//                     revenue: {
//                         $multiply: ['$dishes.price', '$dishes.quantity'],
//                     },
//                     profit: {
//                         $multiply: [
//                             {
//                                 $subtract: [
//                                     '$dishes.price',
//                                     '$productInfo.cost',
//                                 ],
//                             },
//                             '$dishes.quantity',
//                         ],
//                     },
//                 },
//             });

//             pipeline.push({
//                 $group: {
//                     _id: '$hour',
//                     totalRevenue: { $sum: '$revenue' },
//                     totalProfit: { $sum: '$profit' },
//                 },
//             });
//             console.log("🚀 ~ getRevenueProfitReport ~ pipeline:", pipeline)
//         } else if (type === 'month') {
//             const start = moment({ year, month: month - 1 })
//                 .startOf('month')
//                 .toDate();
//             const end = moment({ year, month: month - 1 })
//                 .endOf('month')
//                 .toDate();

//             pipeline.push({
//                 $match: {
//                     updatedAt: { $gte: start, $lte: end },
//                     paymentStatus: 'paid',
//                 },
//             });
//             pipeline.push({ $unwind: '$dishes' });

//             pipeline.push({
//                 $lookup: {
//                     from: 'products',
//                     localField: 'dishes.product',
//                     foreignField: '_id',
//                     as: 'productInfo',
//                 },
//             });
//             pipeline.push({ $unwind: '$productInfo' });

//             pipeline.push({
//                 $project: {
//                     week: { $isoWeek: '$updatedAt' },
//                     year: { $year: '$updatedAt' },
//                     revenue: {
//                         $multiply: ['$dishes.price', '$dishes.quantity'],
//                     },
//                     profit: {
//                         $multiply: [
//                             {
//                                 $subtract: [
//                                     '$dishes.price',
//                                     '$productInfo.cost',
//                                 ],
//                             },
//                             '$dishes.quantity',
//                         ],
//                     },
//                 },
//             });

//             pipeline.push({
//                 $project: {
//                     weekId: {
//                         $concat: [
//                             { $toString: '$week' },
//                             '-',
//                             { $toString: '$year' },
//                         ],
//                     },
//                     revenue: 1,
//                     profit: 1,
//                 },
//             });

//             pipeline.push({
//                 $group: {
//                     _id: '$weekId',
//                     totalRevenue: { $sum: '$revenue' },
//                     totalProfit: { $sum: '$profit' },
//                 },
//             });
//         } else if (type === 'year') {
//             const start = moment({ year }).startOf('year').toDate();
//             const end = moment({ year }).endOf('year').toDate();

//             pipeline.push({
//                 $match: {
//                     updatedAt: { $gte: start, $lte: end },
//                     paymentStatus: 'paid',
//                 },
//             });
//             pipeline.push({ $unwind: '$dishes' });

//             pipeline.push({
//                 $lookup: {
//                     from: 'products',
//                     localField: 'dishes.product',
//                     foreignField: '_id',
//                     as: 'productInfo',
//                 },
//             });
//             pipeline.push({ $unwind: '$productInfo' });

//             pipeline.push({
//                 $project: {
//                     month: { $month: '$updatedAt' },
//                     year: { $year: '$updatedAt' },
//                     revenue: {
//                         $multiply: ['$dishes.price', '$dishes.quantity'],
//                     },
//                     profit: {
//                         $multiply: [
//                             {
//                                 $subtract: [
//                                     '$dishes.price',
//                                     '$productInfo.cost',
//                                 ],
//                             },
//                             '$dishes.quantity',
//                         ],
//                     },
//                 },
//             });

//             pipeline.push({
//                 $project: {
//                     monthId: {
//                         $concat: [
//                             { $toString: '$year' },
//                             '-',
//                             {
//                                 $cond: [
//                                     { $lt: ['$month', 10] },
//                                     { $concat: ['0', { $toString: '$month' }] },
//                                     { $toString: '$month' },
//                                 ],
//                             },
//                         ],
//                     },
//                     revenue: 1,
//                     profit: 1,
//                 },
//             });

//             pipeline.push({
//                 $group: {
//                     _id: '$monthId',
//                     totalRevenue: { $sum: '$revenue' },
//                     totalProfit: { $sum: '$profit' },
//                 },
//             });
//         }

//         pipeline.push({ $sort: { _id: 1 } });

//         const rawData = await Order.aggregate(pipeline);
//         const filledData = fillMissingData(type, rawData, { day, month, year });

//         console.log("🚀 ~ getRevenueProfitReport ~ filledData:", filledData)
//         const totalRevenue = filledData.reduce(
//             (acc, item) => acc + item.totalRevenue,
//             0
//         );
//         const totalProfit = filledData.reduce(
//             (acc, item) => acc + item.totalProfit,
//             0
//         );

//         return res.status(200).json({
//             success: true,
//             data: { totalRevenue, totalProfit, filledData },
//         });
//     } catch (error) {
//         console.error('Lỗi truy vấn báo cáo doanh thu/lợi nhuận:', error);
//         return res.status(500).json({ success: false, message: 'Lỗi server' });
//     }
// }

module.exports = {
    addOrder,
    getOrderByUser,
    addMethodPayment,
    getAllOrder,
    getOrderById,
    updateQuantityProductOrder,
    deleteProductOrder,
    addProductToOrder,
    updateStatusPayment,
    getAllOrderPage,
    updateDepositOrder,
    getAllOrderPageStatusPending,
    getAllOrderPageStatusPaid,
    getAllOrderPageStatusCanceled,
    getRevenue,
    getRevenueProfitReport,
};
