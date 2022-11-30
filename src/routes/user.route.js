const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', authMiddleware, userController.getAll);

module.exports = router;