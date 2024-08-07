const mongoose = require('mongoose');


const castVoteSchema = new mongoose.Schema({

    ElectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election' // Reference to the 'users' collection
    },
    CandidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate' // Reference to the 'users' collection
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the 'users' collection
    },
    isActive: { type: Boolean,default:true}
}, { timestamps: true });

module.exports = mongoose.model('CastVote', castVoteSchema);
