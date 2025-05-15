const mongoose = require('mongoose');

const slideShowSchema = new mongoose.Schema(
    {
        titlePrimary: String,
        titleSecondary: String,
        order: Number,
        urlImg: { imageId: { type: String }, url: { type: String } },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

const SlideShow = mongoose.model('SlideShow', slideShowSchema);

module.exports = SlideShow;
