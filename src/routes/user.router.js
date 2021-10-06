const router = require('express').Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controller');

router.get('/', getUsers);
router.post('/', createUser);

router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
