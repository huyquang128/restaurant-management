const { default: mongoose } = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.KEY_DB);
        console.log('MongoDB connected...');
    } catch (error) {
        console.log('MongoDB false...');
    }
};

module.exports = connectDB;
