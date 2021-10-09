const router = require('express').Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { verifyEmail, verifyUserId } = require('../middlewares/user.middleware');

router.get('/', getUsers);
router.post('/', verifyEmail, createUser);

router.get('/:userId', verifyUserId, getUserById);
router.put('/:userId', verifyUserId, updateUser);
router.delete('/:userId', verifyUserId, deleteUser);

module.exports = router;
