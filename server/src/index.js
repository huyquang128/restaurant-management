const express = require('express');
const connectDB = require('./Config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const categoryDishesRouter = require('./routes/categoryDishesRoute');
const unitRouter = require('./routes/unitRoute');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/category-dishes', categoryDishesRouter);
app.use('/api/v1/unit', unitRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
