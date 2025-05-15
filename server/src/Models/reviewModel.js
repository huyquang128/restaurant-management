const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    lastEditedAt: { type: Date },
    editableUntil: { type: Date }, // tự tính khi tạo review
    response: {
        responder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        emoji: String,
        respondedAt: { type: Date },
    },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

reviewSchema.pre('save', function (next) {
    // Khi tạo review mới, đặt editableUntil = 24h sau createdAt
    if (this.isNew) {
        this.editableUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 giờ
    }
    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
