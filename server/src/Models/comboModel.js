const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
const removeVietnameseTonesCommon = require('../common/removeVietnameseTonesCommon');

const comboSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, unique: true },
        originalPrice: { type: Number },
        comboPrice: { type: Number },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
    },
    {
        timestamps: true,
    }
);

comboSchema.pre('save', function (next) {
    const cleaned = removeVietnameseTonesCommon(this.name);
    this.slug = slugify(cleaned, { lower: true, strict: true });
    next();
});

const Combo = mongoose.model('Combo', comboSchema);
module.exports = Combo;
