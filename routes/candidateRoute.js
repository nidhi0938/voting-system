const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
router.post('/register',candidateController.createCandidate);
router.get('/get',candidateController.getAllCandidate);
router.put('/edit/:id', candidateController.updateCandidate);
router.delete('/delete/:id', candidateController.deleteCandidate);

module.exports = router;