const router = require('express').Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
