const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD endpoints
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.softDeleteUser);

// Enable/Disable endpoints
router.post('/enable', userController.enableUser);
router.post('/disable', userController.disableUser);

module.exports = router;
