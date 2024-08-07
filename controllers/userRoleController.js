// Controller function for handling user registration
const UserRole = require('../models/userRole');

async function createUserRole(req, res) {
    try {
        const { role} = req.body;
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Create a new user instance based on the User schema
        const newUser = new UserRole({
            UserRoleId: 1,
            Role: role
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User Role Added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createUserRole,
};
