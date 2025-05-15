const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: String,
        permissions: [String],
        user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
