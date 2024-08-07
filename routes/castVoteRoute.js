const express = require('express');
const router = express.Router();
const castVoteController = require('../controllers/castVoteController');

// router.get('/get', electionController.getAllElec);
router.post('/register', castVoteController.createCastVote);
// router.put('/edit/:id', electionController.updateElection);
// router.delete('/delete/:id', electionController.deleteElection);

module.exports = router;