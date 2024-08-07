const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.get('/admin',userController.adminDashboard);
router.put('/edit/:id', userController.updateUser);


module.exports = router;