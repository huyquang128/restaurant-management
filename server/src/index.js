const express = require('express');
const connectDB = require('./Config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { initSocket } = require('./sockets/socket');

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const categoryDishesRouter = require('./routes/categoryDishesRoute');
const unitRouter = require('./routes/unitRoute');
const areaRouter = require('./routes/areaRoute');
const tableRouter = require('./routes/tableRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
const paymentRouter = require('./routes/paymentRoute');
const comboRouter = require('./routes/comboRoute');
const roleRouter = require('./routes/roleRoute');
const slideRouter = require('./routes/slideRoute');
const notificationRouter = require('./routes/notificationRoute');
const reviewRouter = require('./routes/reviewRoute');
const postRouter = require('./routes/postRoute');

const app = express();

connectDB();

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: 'restaurant-management-pvzf.vercel.app',
        // origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/category-dishes', categoryDishesRouter);
app.use('/api/v1/unit', unitRouter);
app.use('/api/v1/area', areaRouter);
app.use('/api/v1/table', tableRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/combo', comboRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/slide', slideRouter);
app.use('/api/v1/notification', notificationRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/post', postRouter);

initSocket(server);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
