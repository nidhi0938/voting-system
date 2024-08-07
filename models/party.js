const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
    Name: { type: String, maxlength: 255,required: true},
    Sign: { type: String,required: true },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the 'users' collection
    },
    isActive: { type: Boolean,default:true}
}, { timestamps: true });

module.exports = mongoose.model('Party', partySchema);
