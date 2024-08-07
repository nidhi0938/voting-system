const mongoose = require('mongoose');
const User = require('../models/user'); // Import the User model


const candidateSchema = new mongoose.Schema({
    FirstName: { type: String, maxlength: 255,required: true},
    LastName: { type: String, maxlength: 255,required: true},
    DOB: { type: Date,required: true },
    CNIC: { type: String ,required: true},
    PhoneNumber: { type: String ,required: true},
    Province: { type: String, maxlength: 255 ,required: true},
    City: { type: String, maxlength: 255 ,required: true},
    Region: { type: String, maxlength: 255,required: true },
    Address: { type: String ,required: true},
    PartyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Party' 
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the 'users' collection
    },
    PreferredLanguage: { type: Number,default:1},
    isActive: { type: Boolean,default:true}
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
