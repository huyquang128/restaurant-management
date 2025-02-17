const mongoose = require('mongoose');
const slugify = require('slugify');

const categoryDishesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
});

//create slug

categoryDishesSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true, strict: true });

    next();
});

const CategoryDishes = mongoose.model('CategoryDishes', categoryDishesSchema);
module.exports = CategoryDishes;
