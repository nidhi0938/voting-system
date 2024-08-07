const express = require('express');
const router = express.Router();
const partyController = require('../controllers/partyController');
const authorization = require('../utils/authorizationMiddleware');

router.post('/register',partyController.createParty);
router.get('/get',partyController.getAllParty);
router.put('/edit/:id', partyController.updateParty);
router.delete('/delete/:id', partyController.deleteParty);

module.exports = router;