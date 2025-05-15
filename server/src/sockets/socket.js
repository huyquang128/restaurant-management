let io;

const initSocket = (server) => {
    const { Server } = require('socket.io');
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173', // hoặc domain chính xác của client
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('socket connected: ', socket.id);

        // Bạn có thể thêm các sự kiện khác tại đây
        socket.on('new_order', (data) => {
            console.log('Nhận đơn hàng mới: ', data);
            // Gửi thông báo tới tất cả các client khác (hoặc một client cụ thể)
            io.emit('order_received', { message: 'Có đơn đặt bàn mới!' });
        });

        socket.on('new_review', (data) => {
            console.log('Nhận đánh giá mới: ', data);
            // Gửi thông báo tới tất cả các client khác (hoặc một client cụ thể)
            io.emit('order_received', { message: 'Có đánh giá mới!' });
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};

const getIO = () => {
    if (!io) throw new Error('Socket.IO not initialzed');
    return io;
};

module.exports = { initSocket, getIO };
