const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        phoneCustomer: { type: String },
        nameCustomer: String,
        dishes: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: Number,
                price: Number,
            },
        ],
        tableSeleted: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
        addressRestaurant: { type: String },
        quantityCustomer: { type: String },
        diningTime: { type: String },
        mealDuration: String,
        totalPrice: { type: Number, required: true },
        paymentMethod: { type: String, enum: ['banking', 'cash'] },
        paymentStatus: {
            type: String,
            default: 'pending',
            enum: ['pending', 'partial', 'paid', 'canceled'],
        },
        deposit: { type: Number, default: 0 },
        note: { type: String },
        dateSetTable: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
        cancelReason: String,
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
