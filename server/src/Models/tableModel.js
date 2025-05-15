const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    name: { type: String },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    capacity: { type: Number, required: true },
    status: {
        type: String,
        default: 'empty',
        enum: ['empty', 'booking', 'in_use', 'paid', 'canceled'],
    },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
