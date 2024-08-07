const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    UserRoleId: { type: Number, required: true },
    Role: { type: String, required: true },
    
}, { timestamps: true });

module.exports = mongoose.model('UserRole', userRoleSchema);
