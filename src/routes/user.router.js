const router = require('express').Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { validateUser, validateUserUpdate, validateUserEmail, validateUserId } = require('../middlewares/user.middleware');

router.get('/', getUsers);
router.post('/', validateUser, validateUserEmail, createUser);

router.get('/:userId', validateUserId, getUserById);
router.put('/:userId', validateUserUpdate, validateUserId, updateUser);
router.delete('/:userId', validateUserId, deleteUser);

module.exports = router;
