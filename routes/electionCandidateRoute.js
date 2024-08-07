const express = require('express');
const router = express.Router();
const electionCandidateController = require('../controllers/electionCandidateController');

// router.get('/get', electionController.getAllElec);
router.post('/register', electionCandidateController.createElectionCandidate);
// router.put('/edit/:id', userDetailsController.updateUserDetails);
router.delete('/delete/:id', electionCandidateController.deleteElectionCandidate);

module.exports = router;