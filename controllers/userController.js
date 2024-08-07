// Controller function for handling user registration
const User = require('../models/user');
const UserAudit = require('../models/userAudit');

const UserDetail = require('../models/userDetails');
const jwt = require('jsonwebtoken');
const { setUser } = require('../utils/auth');
const { response } = require('express');




async function createUser(req, res) {
    try {
        const { firstName, lastName, userName, email, password, confirmPassword } = req.body;
        console.log(firstName, lastName, userName, email, password, confirmPassword)
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Create a new user instance based on the User schema
        const newUser = new User({
            UserName: userName,
            Email: email,
            Password: password
        });

        // Save the new user to the database
        await newUser.save();
        // const userId = newUser._id;

        const newDetails = new UserDetail({
            UserId: newUser._id,
            FirstName: firstName,
            LastName: lastName
        });
        await newDetails.save();

        setTimeout(() => {
            res.redirect("/");
        }, 5000);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
async function login(req, res) {
    const { UserName, Password } = req.body;
    console.log(UserName,Password)

    try {
        // Search for the user by username or email
        const user = await User.findOne({
            $or: [{ UserName }, { Email: UserName }]
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the passwords match
        if (user.Password !== Password) {
            // return res.status(404).json({ error: 'User not found' });
            return res.render('LandingNavbar', { page: 'login', navbarButtonText: 'Sign In' });

        }

        // If passwords match, generate a token
        //const token = GenerateToken(user);

        // Prepare response data with token and user info
        let responseData = {
            message: 'Logged in successfully',
        };
        if (user.RoleId === 1) {
            // Redirect to admin dashboard
            user.Role = 'User';
            responseData.isAdmin = false;
            responseData.Role = 'User';

        }
        else if (user.RoleId === 2) {
            // Redirect to admin dashboard
            user.Role = 'Admin';
            responseData.isAdmin = true;
            responseData.Role = 'Admin';
        }
        const token = setUser(user);
        responseData.token = token;

        res.cookie("uid", token)
        if (user.RoleId === 1) {
            return res.status(200).json(responseData);
        }
        else if (user.RoleId === 2) {
            console.log('Ali')
            return res.status(200).json(responseData);
        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



async function adminDashboard(req, res) {
    return res.render('AdminNavbar', { page: 'AdminDashboard' })
}
async function updateUser(req, res) {
    try {
        const {
            userName,
            email,
            password
        } = req.body;

        const { id } = req.params;

        const existingUser = await User.findById(id);
        const oldData = {
            UserName: existingUser.UserName,
            Email: existingUser.Email,
            Password: existingUser.Password
        };

        const updatedUser = {
            UserName: userName,
            Email: email,
            Password: password
        };
        const auditTrail = new UserAudit({
            userId: id,
            oldData: oldData,
            newData: updatedUser
        });
        await auditTrail.save();
        const updated = await User.findByIdAndUpdate(id, updatedUser, { new: true });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const getTotalNumberOfUser = async () => {
    try {
        const totalUser = await User.countDocuments({}); // Counting the number of documents in the Election collection
        return totalUser; // Return the count
    } catch (err) {
        throw new Error(err.message);
    }
};
const getUserDataWithDetails = async () => {
    try {
        const allUnverifiedUsers = await UserDetail.find({ isVerified: false })
          .populate({
            path: 'UserId',
            match: { RoleId: 1 } // Filter based on the RoleId field
          })
          .exec();
    
        return allUnverifiedUsers; // Return array of objects with referenced data
      } catch (err) {
        throw new Error(err.message);
      }
  };
  const getCountOfUnverifiedUsersWithRoleIdOne = async () => {
    try {
      const count = await UserDetail.countDocuments({ isVerified: false })
        .populate({
          path: 'UserId',
          match: { RoleId: 1 } // Filter based on the RoleId field
        })
        .exec();
  
      return count; // Return the count
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
module.exports = {
    createUser, login, adminDashboard, updateUser,getTotalNumberOfUser,getUserDataWithDetails,getCountOfUnverifiedUsersWithRoleIdOne,
};
