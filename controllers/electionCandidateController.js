const ElectionCandidate = require('../models/electionCandidate');
// const ElectionAudit = require('../models/electionAudit');

const { getUser } = require('../utils/auth')

async function createElectionCandidate(req, res) {
    try {
        const { election,candidate } = req.body;
        const token = req.cookies.uid;

        const User = getUser(token);
        const userId = User._id; // Accessing the _id field

        const newElectionCandidate = new ElectionCandidate({
            ElectionId: election,
            CandidateId: candidate,
            CreatedBy: userId,
        });
        // Save the new user to the database
        await newElectionCandidate.save();
        // setTimeout(() => {
            res.redirect("/admin/electionCandidate");
        // }, 100);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getAllElectionCandidates = async () => {
    try {
        const allElectionCandidates = await ElectionCandidate.find({})
            .populate('ElectionId', 'Name ElectionType Province City Region Description StartDate EndDate CreatedBy') // Replace fields with actual fields in Election
            .populate('CandidateId', 'FirstName LastName')// Replace fields with actual fields in Candidate
            .populate('CreatedBy', 'UserName'); // Replace fields with actual fields in Candidate

        return allElectionCandidates; // Return array of objects with referenced data
    } catch (err) {
        throw new Error(err.message);
    }
};
async function deleteElectionCandidate(req,res){
    try{
        const { id }=req.params;
        const deleteCandidate = await ElectionCandidate.findByIdAndDelete(id,req.body,{new:true});
        res.json(deleteCandidate);
    }
    catch(err){
        res.status(500).json({  error:err.message});
    }
};


module.exports = {
    createElectionCandidate,getAllElectionCandidates,deleteElectionCandidate,
};
