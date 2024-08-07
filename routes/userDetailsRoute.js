const express = require('express');
const router = express.Router();
const userDetailController = require('../controllers/userDetailsController');

router.put('/edit/:id', userDetailController.updateUserDetails);
router.put('/verify/:id', userDetailController.updateUserDetailsToVerified);

module.exports = router;