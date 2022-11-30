const express = require('express');
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const categoryMiddleware = require('../middlewares/categoryName.middleware');

const router = express.Router();

router.post('/', categoryMiddleware, authMiddleware, categoryController.addCategory);
router.get('/', authMiddleware, categoryController.getAll);

module.exports = router;