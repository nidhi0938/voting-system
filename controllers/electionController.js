const Election = require('../models/election');
const ElectionAudit = require('../models/electionAudit');

const cookieParser = require('cookie-parser');
const { getUser } = require('../utils/auth')

async function createElection(req, res) {
    try {
        const { electionName, startDate, endDate, province, city, region, electionType, description } = req.body;
        console.log(electionName, startDate, endDate, province, city, region, electionType, description)
        const token = req.cookies.uid;

        const User = getUser(token);
        const userId = User._id; // Accessing the _id field

        const newElection = new Election({
            Name: electionName,
            StartDate: startDate,
            EndDate: endDate,
            Province: province,
            City: city,
            Region: region,
            CreatedBy: userId,
            ElectionType: electionType,
            Description: description
        });

        // Save the new user to the database
        await newElection.save();
        setTimeout(() => {
            res.redirect("/admin/election");
        }, 100);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const getAllElection = async () => {
    try {
        // Fetch data from MongoDB (using Mongoose or other methods)
        const elections = await Election.find({}).populate('CreatedBy', 'UserName');  // Example query, adjust as needed
        return elections; // Return the fetched data
    } catch (err) {
        throw new Error(err.message); // Handle any errors and throw them for handling in the route handler
    }
};
const getAllElectionName = async () => {
    try {
        const elections = await Election.find({}).populate('CreatedBy', 'UserName');

        // Mapping the elections to create an array of objects
        const formattedElections = elections.map(election => ({
            id: election._id, // Assuming _id is the ID field of the Election model
            formattedValue: `${election.Name},${election.ElectionType}`
        }));

        return formattedElections; // Return the array of objects
    } catch (err) {
        throw new Error(err.message);
    }
};

const getTotalNumberOfElections = async () => {
    try {
        const totalElections = await Election.countDocuments({}); // Counting the number of documents in the Election collection
        return totalElections; // Return the count
    } catch (err) {
        throw new Error(err.message);
    }
};



async function getAllElec(req, res) {
    try {
        const user = await Election.find();
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
async function updateElection(req, res) {
    try {
        const {
            electionName,
            startDate,
            endDate,
            province,
            city,
            region,
            electionType,
            description
        } = req.body;

        const { id } = req.params;

        const existingElection = await Election.findById(id);

        const oldData = {
            Name: existingElection.Name,
            StartDate: existingElection.StartDate,
            EndDate: existingElection.EndDate,
            Province: existingElection.Province,
            City: existingElection.City,
            Region: existingElection.Region,
            ElectionType: existingElection.ElectionType,
            Description: existingElection.Description
        };

        const updatedElection = {
            Name: electionName,
            StartDate: startDate,
            EndDate: endDate,
            Province: province,
            City: city,
            Region: region,
            ElectionType: electionType,
            Description: description
        };

        const auditTrail = new ElectionAudit({
            electionId: id,
            oldData: oldData,
            newData: updatedElection
        });

        await auditTrail.save();

        const updated = await Election.findByIdAndUpdate(id, updatedElection, { new: true });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteElection(req, res) {
    try {
        const { id } = req.params;
        const deleteElection = await Election.findByIdAndDelete(id, req.body, { new: true });
        res.json(deleteElection);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = {
    createElection, getAllElection, updateElection, deleteElection, getAllElec,getAllElectionName,getTotalNumberOfElections,
};
