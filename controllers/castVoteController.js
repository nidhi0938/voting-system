const CastVote = require('../models/castVote');
// const ElectionAudit = require('../models/electionAudit');

const { getUser } = require('../utils/auth')


async function createCastVote(req, res) {
    try {
        const { election,candidate } = req.body;
        const token = req.cookies.uid;

        const User = getUser(token);
        const userId = User._id; // Accessing the _id field

        const newElectionCandidate = new CastVote({
            ElectionId: election,
            CandidateId: candidate,
            UserId: userId,
        });
        // Save the new user to the database
        await newElectionCandidate.save();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
async function getMyCastVote(req, res) {
    try {
        const token = req.cookies.uid;
        const User = getUser(token);
        const userId = User._id; // Accessing the _id field

        const allElectionCandidates = await CastVote.find({ UserId: userId })
            .populate('ElectionId')
            .populate('CandidateId')
            .populate('UserId');

        return allElectionCandidates;
    } catch (err) {
        throw new Error(err.message);
    }
};
async function getAllCastVote(req, res) {
    try {
        const token = req.cookies.uid;
        const User = getUser(token);
        const userId = User._id; // Accessing the _id field

        const allElectionCandidates = await CastVote.find({})
            .populate('ElectionId')
            .populate('CandidateId')
            .populate('UserId');

        return allElectionCandidates;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    createCastVote,getMyCastVote,getAllCastVote,
};
