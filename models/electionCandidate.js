const mongoose = require('mongoose');


const candidateElectionSchema = new mongoose.Schema({

    ElectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election' // Reference to the 'users' collection
    },
    CandidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate' // Reference to the 'users' collection
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the 'users' collection
    },
    isActive: { type: Boolean,default:true}
}, { timestamps: true });

module.exports = mongoose.model('ElectionCandidate', candidateElectionSchema);
