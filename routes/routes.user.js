const express = require('express');
const router = express.Router();
const { createUser, deleteUser, getUserById, getUsers} = require('../controllers/controller.user');
const { loginUser, logoutUser } = require('../controllers/controller.auth');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');


router.post('/', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/', authenticateToken, authorizeRole('admin'), getUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, authorizeRole('admin'));
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteUser);

module.exports = router;
