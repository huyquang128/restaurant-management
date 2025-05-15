const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    name_no_accents: { type: String, required: true },
    cost: { type: Number },
    promotion: { type: Number },
    selling: { type: Number },
    description: { type: String },
    note: { type: String },
    quantity: { type: Number },
    sold: { type: Number },
    images: [{ imageId: { type: String }, url: { type: String } }],
    unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
    categoryDishes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryDishes',
    },
    combo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Combo' }],
    reviews: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Review', default: [] },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }, 
});

//create slug

// 🔹 Middleware cập nhật slug khi tạo mới hoặc cập nhật bằng .save()
ProductSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        // Chỉ cập nhật nếu name thay đổi
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

// 🔹 Middleware cập nhật slug khi cập nhật bằng findOneAndUpdate()
ProductSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();

    if (update.name) {
        // Nếu name thay đổi, cập nhật slug
        update.slug = slugify(update.name, { lower: true, strict: true });
    }

    next();
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
