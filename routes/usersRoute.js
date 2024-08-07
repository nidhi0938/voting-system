const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const electionController = require('../controllers/electionController');
const castVoteController = require('../controllers/castVoteController');

const partyController = require('../controllers/partyController');
const candidateController = require('../controllers/candidateController');
const electionCandidateController = require('../controllers/electionCandidateController');

const userDetailsController = require('../controllers/userDetailsController');


router.get('/dashboard', async (req, res) => {
    try {
      // Pass the req object to the function that uses it
      const votes = await castVoteController.getMyCastVote(req);
      res.render('userNavbar', { page: 'userDashboard', votes });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
router.get('/castVote', async (req, res) => {
    try {
        const elections = await electionController.getAllElectionName();
        const candidates = await candidateController.getAllCandidateName();
        // const electionCandidates = await electionCandidateController.getAllElectionCandidates();
        res.render('userNavbar', {
          page: 'userCastVote',
          elections,
          candidates,
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  });
router.get('/account', (req, res) => {
    try {
      userDetailsController.getUserDetails(req, res) // Pass req and res here
        .then(details => {
          res.render('userNavbar', { page: 'userAccount', details });
        })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/electionDetails', async (req, res) => {
    try {
      const elections = await electionController.getAllElection();
      res.render('adminElection', { elections }); 
    } catch(err) {
      res.status(400).json({error: err.message})
    }
  })
module.exports = router;