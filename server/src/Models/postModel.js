const mongoose = require('mongoose');
const slugify = require('slugify');
const removeVietnameseTonesCommon = require('../common/removeVietnameseTonesCommon');

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    type: { type: String, enum: ['specialOffer', 'event'] },
});
PostSchema.pre('save', function (next) {
    const cleaned = removeVietnameseTonesCommon(this.title);
    this.slug = slugify(cleaned, { lower: true, strict: true });
    next();
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
