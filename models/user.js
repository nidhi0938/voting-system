const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        unique: true,
        trim: true // Removes whitespace from the beginning and end
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true // Removes whitespace from the beginning and end
    },
    Password: String,
    RoleId: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
