const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const AreaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

AreaSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
});

const Area = mongoose.model('Area', AreaSchema);

module.exports = Area;
