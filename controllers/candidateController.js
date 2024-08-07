const Candidate = require('../models/candidate');
const CandidateAudit = require('../models/candidateAudit'); // Import CandidateAudit model

const { getUser } = require('../utils/auth')

async function createCandidate(req, res) {
    try {
        const { firstName, lastName, dob, cnic,phoneNumber,province, city, region, address,party } = req.body;
        console.log(party)
        const token = req.cookies.uid;
        const User  = getUser(token);
        const userId = User._id; // Accessing the _id field

        const newCandidate = new Candidate({
            FirstName:firstName,
            LastName:lastName,
            DOB:dob,
            CNIC:cnic,
            PhoneNumber:phoneNumber,
            Province:province,
            City:city,
            Region:region,
            Address:address,
            CreatedBy:userId,
            PartyId:party      
        });
        // Save the new user to the database
        await newCandidate.save();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getAllCandidate = async () => {
    try {
        // Fetch data from MongoDB (using Mongoose or other methods)
        const candidates = await Candidate.find({}).populate('CreatedBy', 'UserName')
        .populate('PartyId', 'Name Sign')// Replace fields with actual fields in Candidate
        // Example query, adjust as needed
        return candidates; // Return the fetched data
    } catch (err) {
        throw new Error(err.message); // Handle any errors and throw them for handling in the route handler
    }
};
async function getAllCandidatesJSON(req,res)
{
    try{
        const Candidates = await Candidate.find();
        res.json(Candidates);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
async function updateCandidate(req, res) {
    try {
        const {
            firstName,
            lastName,
            dob,
            cnic,
            phoneNumber,
            province,
            city,
            region,
            address,

            party,
        } = req.body;

        const { id } = req.params;

        const existingCandidate = await Candidate.findById(id);

        const oldData = {
            FirstName: existingCandidate.FirstName,
            LastName: existingCandidate.LastName,
            DOB: existingCandidate.DOB,
            CNIC: existingCandidate.CNIC,
            PhoneNumber: existingCandidate.PhoneNumber,
            Province: existingCandidate.Province,
            City: existingCandidate.City,
            Region: existingCandidate.Region,
            Address: existingCandidate.Address,
            Party: existingCandidate.Party,

        };

        const updatedCandidate = {
            FirstName: firstName,
            LastName: lastName,
            DOB: dob,
            CNIC: cnic,
            PhoneNumber: phoneNumber,
            Province: province,
            City: city,
            Region: region,
            Address: address,
            Party: party,

        };

        const auditTrail = new CandidateAudit({
            candidateId: id,
            oldData: oldData,
            newData: updatedCandidate
        });

        await auditTrail.save();

        const updated = await Candidate.findByIdAndUpdate(id, updatedCandidate, { new: true });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
} 
async function deleteCandidate(req,res){
    try{
        const { id }=req.params;
        const deleteCandidate = await Candidate.findByIdAndDelete(id,req.body,{new:true});
        res.json(deleteCandidate);
    }
    catch(err){
        res.status(500).json({  error:err.message});
    }
};
const getAllCandidateName = async () => {
    try {
        const candidates = await Candidate.find({}); // Retrieve candidates from the database

        // Mapping the candidates to create an array of objects
        const formattedCandidates = candidates.map(candidate => ({
            id: candidate._id, // Assuming _id is the ID field of the Candidate model
            formattedName: `${candidate.FirstName} ${candidate.LastName}`
        }));

        return formattedCandidates; // Return the array of objects
    } catch (err) {
        throw new Error(err.message);
    }
};

const getTotalNumberOfCandidate = async () => {
    try {
        const totalCandidate = await Candidate.countDocuments({}); // Counting the number of documents in the Election collection
        return totalCandidate; // Return the count
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    createCandidate,getAllCandidate,deleteCandidate,updateCandidate,getAllCandidatesJSON,getAllCandidateName,getTotalNumberOfCandidate,
};
