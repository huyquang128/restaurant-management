const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
});

unitSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
});

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
