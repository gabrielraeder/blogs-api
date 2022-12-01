const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/:id', authMiddleware, userController.getById);
router.get('/', authMiddleware, userController.getAll);
router.delete('/me', authMiddleware, userController.remove);

module.exports = router;