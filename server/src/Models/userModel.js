const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
        },
        avatar: { type: String },
        dateOfBirth: { type: String },
        address: [
            {
                city: { type: String },
                district: { type: String },
                ward: { type: String },
                detailed: { type: String },
            },
        ],
        name: { type: String },
        phone: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
        order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
