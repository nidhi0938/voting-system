const express = require('express');
const router = express.Router();
const electionController = require('../controllers/electionController');
const authorization = require('../utils/authorizationMiddleware');

router.get('/get', electionController.getAllElec);
router.post('/register', electionController.createElection);
router.put('/edit/:id', electionController.updateElection);
router.delete('/delete/:id', electionController.deleteElection);

module.exports = router;