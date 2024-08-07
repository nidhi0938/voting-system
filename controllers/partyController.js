const Party = require('../models/party');
const PartyAudit = require('../models/partyAudit'); // Import PartyAudit model

const { getUser } = require('../utils/auth')

async function createParty(req, res) {
    try {
        const { partyName, partySign } = req.body;
        const token = req.cookies.uid;
        const User  = getUser(token);
        const userId = User._id; // Accessing the _id field
        const newParty = new Party({
            Name: partyName,
            Sign: partySign,
            CreatedBy: userId
        });

        // Save the new user to the database
        await newParty.save();
             setTimeout(() => {
            res.redirect("/admin/party");
        }, 100);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getAllParties = async () => {
    try {
        // Fetch data from MongoDB (using Mongoose or other methods)
        const parties = await Party.find({}).populate('CreatedBy', 'UserName'); // Example query, adjust as needed
        return parties; // Return the fetched data
    } catch (err) {
        throw new Error(err.message); // Handle any errors and throw them for handling in the route handler
    }
};
async function deleteParty(req,res){
    try{
        const { id }=req.params;
        const deleteParty = await Party.findByIdAndDelete(id,req.body,{new:true});
        res.json(deleteParty);
    }
    catch(err){
        res.status(500).json({  error:err.message});
    }
}

async function updateParty(req, res) {
    try {
        const {
            partyName,
            partySign
        } = req.body;

        const { id } = req.params;

        const existingParty = await Party.findById(id);

        const oldData = {
            Name: existingParty.Name,
            Sign: existingParty.Sign
        };

        const updatedParty = {
            Name: partyName,
            Sign: partySign
        };

        const auditTrail = new PartyAudit({
            partyId: id,
            oldData: oldData,
            newData: updatedParty
        });

        await auditTrail.save();

        const updated = await Party.findByIdAndUpdate(id, updatedParty, { new: true });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
  async function getAllParty(req,res)
{
    try{
        const user = await Party.find();
        res.json(user);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};
const getAllPartiesName = async () => {
    try {
        const party = await Party.find({}); // Retrieve candidates from the database

        // Mapping the candidates to create an array of objects
        const formattedParty = party.map(candidate => ({
            id: candidate._id, // Assuming _id is the ID field of the Candidate model
            formattedName: `${candidate.Name} - ${candidate.Sign}`
        }));

        return formattedParty; // Return the array of objects
    } catch (err) {
        throw new Error(err.message);
    }
};
module.exports = {
    createParty,getAllParties,deleteParty,updateParty,getAllParty,getAllPartiesName,
};
