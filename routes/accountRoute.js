const express = require('express');
const router = express.Router();
const userDetailsController = require('../controllers/userDetailsController');

// router.get('/get', electionController.getAllElec);
// router.post('/register', electionController.createElection);
router.put('/edit/:id', userDetailsController.updateUserDetails);
// router.delete('/delete/:id', electionController.deleteElection);

module.exports = router;