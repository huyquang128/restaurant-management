const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    feedback_customer: { type: String },
    feedback_restaurant: { type: String },
    rating: { type: Number },
    status: { type: String, default: 'pending' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
