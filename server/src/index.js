const express = require('express');
const connectDB = require('./Config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000');
});
