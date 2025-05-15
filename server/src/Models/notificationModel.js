const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userIdReceiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Liên kết với người dùng nhận thông báo
    },
    customerIdSend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Liên kết với người dùng nhận thông báo
    },
    nameCustomer: String,
    message: {
        type: String,
    },
    type: {
        type: String,
        enum: ['order', 'comment', 'system', 'promotion'], // Các loại thông báo
        required: true,
    },
    typeSystem: {
        type: String,
        default: 'admin',
        enum: ['admin', 'user'],
    },
    relatedId: {
        type: mongoose.Schema.Types.ObjectId, // ID liên quan đến sự kiện (ví dụ: ID đơn hàng, ID sản phẩm)
        required: true,
    },
    read: {
        type: Boolean,
        default: false, // Trạng thái đã đọc hay chưa
    },
    createdAt: {
        type: Date,
        default: Date.now, // Thời gian tạo thông báo
    },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
